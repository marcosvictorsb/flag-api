import { LoggerMixin, EncryptionService, TokenService } from '../../services';

class BaseGateway {
  constructor(...args: any[]) {}
}
export const MixCreateUserService = LoggerMixin(
  TokenService(EncryptionService(BaseGateway))
);
