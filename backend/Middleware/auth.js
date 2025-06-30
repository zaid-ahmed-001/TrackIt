import jwt from 'jsonwebtoken';

export const auth = (req, res, next) => {
  const token = req.header('authorization');
  console.log('Token received:', token);

  if (!token) {
    console.error('No token provided');
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  const secretKey = process.env.JWT_SECRET_KEY;
  if (!secretKey) {
    console.error('Secret key is not set in environment variables');
    return res.status(500).json({ msg: 'Internal server error' });
  }
  console.log('Secret Key:', secretKey);

  try {
    console.log('Verifying token...');
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    console.log('Decoded Token:', decoded);
    next();
  } catch (err) {
    console.error('Token verification failed:', err.message);
    return res.status(401).json({ msg: 'Token is not valid' });
  }
};
