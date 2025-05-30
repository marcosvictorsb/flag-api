import uuid4 from 'uuid4';
import crypto from 'crypto';

export const Utils = {
  generateApiKey: () => {
    const uuid = uuid4();
    const hash = crypto.randomBytes(8).toString('hex');
    return `${uuid}-${hash}`;
  },
  hashUserToPercent(userId: string): number {
    const hash = crypto.createHash('sha256').update(userId).digest('hex');
    const intVal = parseInt(hash.substring(0, 8), 16); // usa primeiros 8 chars
    return (intVal % 100) / 100; // retorna 0.00 a 0.99
  }
};
