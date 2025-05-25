import { TokenService } from '../../adapters/services/token.service';
import { LoggerMixin } from '../../adapters/services/logger.service';
import { EncryptionService } from '../../adapters/services/encryption.service';

class BaseGateway {
  constructor(...args: any[]) {}
}
export const GetTokenMixed = TokenService(
  LoggerMixin(EncryptionService(BaseGateway))
);
