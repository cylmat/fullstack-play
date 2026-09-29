import type { Request, Response } from 'express';
import authService from '../services/auth.service.ts';

export const getToken = (req: Request, res: Response) => {
  let signature = authService.getToken()
  console.log(signature)
  return res.json({ jwt: signature });
}

export const testToken = (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('TEST', 'test-header');
  res.statusCode = 201;

  return res.json({ message: 'Test token endpoint [OK]' });
}
