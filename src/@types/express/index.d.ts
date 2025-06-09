import '@types/express';

declare global {
  namespace Express {
    interface Request {
      uuid?: string;
      envType?: string;
      userId: number;
    }
  }
}
