import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  console.log('🍪 COOKIES:', req.cookies);

  const token = req.cookies.token;
  console.log(token)
  if (!token) {
    console.log('❌ No token found');
    return res.redirect('/login');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.redirect('/login');
  }
};

export default authMiddleware;
