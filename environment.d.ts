declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: string;
      PORT: number;
      MONGO_URI: string;
      TOKEN_SECRET: string;
      FRONTEND_URL: string;
    }
  }
}
export {};
