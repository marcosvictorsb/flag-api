import { LoggerMixin } from '@adapters/services';

class BaseGateway {
  constructor(...args: any[]) {}
}
export const MixCreateFeatureFlagsService = LoggerMixin(BaseGateway);
