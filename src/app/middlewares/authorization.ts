import configs from '../configs';
import AppError from '../errors/AppError';
import catchAsync from '../utils/catchAsync';
import jwt, { JwtPayload } from 'jsonwebtoken';

const auth = (userType: string[]) => {
  return catchAsync(async (req, res, next) => {
    const bearerToken = req.headers.authorization;

    if (!bearerToken) {
      return res.status(401).json({
        statusCode: 401,
        success: false,
        message: 'You are not authorized to access this route',
      });
    }

    const token = bearerToken.split(' ')[1];

    const decoded = jwt.verify(
      token,
      configs.jwtAccessSecret as string,
    ) as JwtPayload;

    const { role } = decoded;
    const hasRequiredFeature = userType.includes(role);

    if (!hasRequiredFeature) {
      throw new AppError(403, 'You are not authorized to access this route');
    }

    req.user = decoded as JwtPayload;

    next();
  });
};

export default auth;
