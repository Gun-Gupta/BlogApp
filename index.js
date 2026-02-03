// Load environment variables
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import exphbs from 'express-handlebars';
import cookieParser from 'cookie-parser';

import sequelize from './config/dbConnect.js';
import { User, Blog } from './models/index.js';

import blogRoutes from './routes/blog.routes.js';
import authRoutes from './routes/auth.routes.js';

const app = express();
const PORT = process.env.PORT || 8000;

// Fix __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Handlebars setup
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'static')));
app.use(cookieParser());

// Routes
app.use(blogRoutes);
app.use(authRoutes);

//  START SERVER ONLY AFTER DB IS READY
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected');

    // 🔥 CREATE TABLES FROM CODE (USE FORCE ONLY ONCE)
    await sequelize.sync();
    console.log('✅ Database synced');

    app.listen(PORT, () => {
      console.log(` Blog app running at http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error(' Database error:', error);
  }
};

startServer();
