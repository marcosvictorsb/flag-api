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
  },
  convertISOToDDMMYYYYHHMMSS(date: Date): string {
    const originalDate = new Date(date);
    const day = String(originalDate.getUTCDate()).padStart(2, '0');
    const month = String(originalDate.getUTCMonth() + 1).padStart(2, '0');
    const year = originalDate.getUTCFullYear();
    const hours = String(originalDate.getUTCHours()).padStart(2, '0');
    const minutes = String(originalDate.getUTCMinutes()).padStart(2, '0');
    const seconds = String(originalDate.getUTCSeconds()).padStart(2, '0');

    const formattedDate = `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
    return formattedDate;
  }
};
