import type { Request, Response } from 'express';
import authService from '#app/services/auth.service.ts';
import _ from 'lodash';
import { checkParameters } from '#app/utils/checkParameters.ts';

export const secureController = {
  getToken: (req: Request, res: Response) => {

    const whiteList = ['username']
    const diff = checkParameters(req.query, whiteList)
    if (diff.length > 0) {
      return res.status(400).json({ error: 'Wrong query parameters ' + diff.join(', ') + ', allowed are: ' + whiteList.join(', ') });
    }

    let username: string | '' = req.query.username as string ?? ''
    console.log('Get token for username: ', username)

    try {
      let signature = authService.getTokenForUsername(username)
      console.log('Generated token signature:', signature.substring(0, 10) + '...')

      res.status(200)
      return res.json({ jwt: signature });
    } catch (error: any) {
      console.error('Error generating token:', error.message);
    }

    return res.status(500).json({ error: 'Failed to generate token' });
  },

  getCurrentUser: (req: Request, res: Response) => {
    let token: string | null = req.header('Authorization')?.replace('Bearer ', '') ?? null
    console.log('Get user from token: ', token)

    if (!token) {
      return res.status(400).json({ error: 'Authorization token is missing' });
    }

    try {
      let user = authService.getUserFromJwt(token)
      if (!user) {
        return res.status(404).json({ error: 'User not found for the provided token' });
      }

      console.log('User retrieved from token:', user.username)
      return res.status(200).json({ user });
    } catch (error: any) {
      console.error('Error retrieving user from token:', error.message);
    }

    return res.status(500).json({ error: 'Failed to retrieve user from token' });
  },

  testToken: (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('TEST', 'test-header');
    res.statusCode = 201;

    return res.json({ message: 'Test token endpoint [OK]' });
  }
}
