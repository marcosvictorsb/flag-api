export {};

declare global {
  namespace Express {
    interface Request {
      uuid?: string;
      envType?: string;
    }
  }
}
