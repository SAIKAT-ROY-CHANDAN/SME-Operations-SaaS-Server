import jwt, { SignOptions, Secret } from 'jsonwebtoken';

export const generateToken = <T extends Record<string, unknown>>(
  payload: T,
  secret: Secret,
  expiresIn: SignOptions['expiresIn'],
): string => {
  console.log('SECRET VALUE:', secret);
  console.log('SECRET TYPE:', typeof secret);
  console.log('EXPIRES IN:', expiresIn);

  return jwt.sign(payload, secret, {
    algorithm: 'HS256',
    expiresIn,
  });
};
