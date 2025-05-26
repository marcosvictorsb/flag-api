import uuid4 from 'uuid4';
import crypto from 'crypto';

export const Utils = {
  generateApiKey: () => {
    const uuid = uuid4();
    const hash = crypto.randomBytes(8).toString('hex');
    return `${uuid}-${hash}`;
  }
};
