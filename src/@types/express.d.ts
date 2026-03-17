declare global {
  namespace Express {
    interface Request {
      io: import("socket.io").Server;
      user?: {
        sub: string;
        name: string;
      };
    }
  }
}

export {};
