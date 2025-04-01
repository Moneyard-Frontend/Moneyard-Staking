import jwt from 'jsonwebtoken';

export const generateAuthToken = (user) => {
  return jwt.sign(
    { wallet: user.address, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return null;
  }
};
