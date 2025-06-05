import { IPresenter } from '@protocols/presenter';
import { HttpResponse } from '@protocols/http';
import {
  FindFeatureFlagInteractorDependencies,
  IFindFeatureFlagGateway,
  InputFindFeatureFlags
} from '@domains/api/feature_flags';
import { CacheHelper } from '@infra/database/connection/redis';

export class FindFeatureFlagInteractor {
  protected gateway: IFindFeatureFlagGateway;
  protected presenter: IPresenter;

  constructor(params: FindFeatureFlagInteractorDependencies) {
    this.gateway = params.gateway;
    this.presenter = params.presenter;
  }

  async execute(input: InputFindFeatureFlags): Promise<HttpResponse> {
    try {
      const { envType, key, featureName } = input;
      this.gateway.loggerInfo('Iniciando a busca pela flag cadastrada', {
        requestTxt: JSON.stringify({ envType, featureName })
      });

      const cacheKey = `flag:${envType}:${key}:${featureName}`;

      // 🔍 1. Verifica cache
      const cached = await CacheHelper.get<{ feature_effective: boolean }>(
        cacheKey
      );
      if (cached) {
        this.gateway.loggerInfo('✅ Cache HIT', { requestTxt: cacheKey });
        return this.presenter.OK(cached);
      }

      const environment = await this.gateway.findEnvironment({
        type: envType,
        key
      });

      const featureFlagConfig = await this.gateway.findFeatureFlag({
        id_project: environment?.id_project,
        name: featureName
      });

      this.gateway.loggerInfo('Feature flag buscada', {
        requestTxt: JSON.stringify(featureFlagConfig)
      });

      if (featureFlagConfig?.type === 'boolean') {
        const isActive = this.shouldEnableRollout(featureFlagConfig);
        await CacheHelper.set(cacheKey, { feature_effective: isActive });
        return this.presenter.OK({ feature_effective: isActive });
      }

      return this.presenter.OK('Não é feature booleana');
    } catch (error) {
      if (error?.errors[0].message) {
        this.gateway.loggerError('Error ao buscas a feature flag', {
          error: error?.errors[0].message
        });
        return this.presenter.serverError('Error ao buscas a feature flag');
      }
      this.gateway.loggerError('Error ao buscas a feature flag', { error });
      return this.presenter.serverError('Error ao buscas a feature flag');
    }
  }

  private shouldEnableRollout(featureFlag: any, userId?: string): boolean {
    if (featureFlag.status !== 'enable') {
      this.gateway.loggerInfo('Feature flag está desativado');
      return false;
    }

    if (featureFlag.rollout >= 100) {
      this.gateway.loggerInfo(
        'Feature flag está está com roolout igual a 100%'
      );
      return true;
    }

    if (featureFlag.rollout <= 0) {
      this.gateway.loggerInfo('Feature flag está está com roolout igual a 0%');
      return false;
    }

    if (featureFlag.targets?.length) {
      return featureFlag.targets.includes(userId?.toString());
    }

    const stableSeed = userId || Math.random().toString();
    const hash = this.stringToHash(stableSeed);
    const normalized = hash % 100;
    return normalized < featureFlag.rollout;
  }

  private stringToHash(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash);
  }
}
