import { Request, Response } from 'express';
import { Session } from 'express-session';

interface AuthSession extends Session {
  userId?: string;
}

export interface GraphQLContext {
  req: Request & { session: AuthSession };
  res: Response;
}
