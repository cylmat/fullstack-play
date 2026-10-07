import type { Request, Response } from 'express';
import authService from '../services/auth.service.ts';

export const getToken = (req: Request, res: Response) => {
  let username = req.body.username ?? null
  console.log('get token username: ', username)

  try {
    let signature = authService.getTokenForUsername(username)
    console.log(signature)
    return res.json({ jwt: signature });
  } catch (error: any) {
    console.error('Error generating token:', error.message);
  }

  return res.status(500).json({ error: 'Failed to generate token' });
}

export const testToken = (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('TEST', 'test-header');
  res.statusCode = 201;

  return res.json({ message: 'Test token endpoint [OK]' });
}
