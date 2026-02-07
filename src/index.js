const express = require('express');
const path = require('path');
const connectDB = require('./config/connect');
require('dotenv').config();
import userRoutes from './routes/user';
import authRoutes from './routes/auth';
import blogRoutes from './routes/blog';
import { verifyToken } from './middleware/auth';

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, 'views'));

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, 'public')));
app.use('/uploads', express.static(path.resolve(__dirname, '../uploads')));


app.use('/auth', authRoutes);
app.use('/users', verifyToken, userRoutes);
app.use('/blogs', verifyToken, blogRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});