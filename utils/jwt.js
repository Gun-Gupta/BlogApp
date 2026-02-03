import jwt from 'jsonwebtoken';
const JWT_SECRET = 'secret_key';

const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );
};

export default generateToken;
