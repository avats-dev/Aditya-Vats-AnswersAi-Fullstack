import jwt from 'jsonwebtoken';
import { Responder } from '../lib';

const verifyToken =  (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) return Responder.operationFailed(res, { auth: false, error: 'Failed to authenticate token', status: 403 });
      req.userId = decoded.id;
      console.log(`User id decoded from token is ${decoded.id}`)
      return next();
    });
  }
  else {
    // if no token present serve catelogue as guest user
    return Responder.operationFailed(res, { auth: false, error: 'No token provided', status: 403 });
  }
};

export default verifyToken;
