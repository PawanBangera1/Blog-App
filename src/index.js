const express = require('express');
const path = require('path');
const connectDB = require('./config/connect');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, 'views'));

connectDB();

app.get('/', (req, res) => {
  res.render('Home', { title: 'Home Page', message: 'Welcome to the Home Page!' });
});

// Connect to MongoDB (optional - server will run even if connection fails)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});