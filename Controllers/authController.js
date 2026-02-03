import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User,Blog } from '../models/index.js';


export const showRegister = (req, res) => {
  res.render('registerblog');
};

//register
export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.render('registerblog', { error: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({ username, email, password:hashedPassword});

    res.redirect('/login');
  } catch (err) {
    console.error(err);
    res.render('registerblog', { error: 'Registration failed' });
  }
};

export const showLogin = (req, res) => {
  res.render('loginBlog');
};

//login
export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });
    console.log(user)
    console.log("babu i love you")

  if (!user) {
    return res.render('loginBlog', { error: 'Invalid credentials' });
  }
  console.log(password)
  const isMatch = await bcrypt.compare(password, user.password);
  console.log(isMatch)
  if (!isMatch) {
    return res.render('loginBlog', { error: 'Invalid credentials' });
  }
  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );

  res.cookie('token', token, {
  httpOnly: true,
  sameSite: 'lax',
  maxAge: 24 * 60 * 60 * 1000
});

console.log('COOKIE SET:', token);


 //if no blog
  const blogCount = await Blog.count({
    where: { userId: user.id }
  });

  if (blogCount === 0) {
    return res.redirect('/blog/create');
  }

  res.redirect('/blog');
};


export const logout = (req, res) => {
  res.clearCookie('token');
  res.redirect('/');
};
