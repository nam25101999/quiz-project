// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Kết nối MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch(err => {
  console.log('MongoDB connection error:', err);
});

// Định nghĩa route
app.get('/', (req, res) => {
  res.send('Quiz App API');
});

// Khởi động server
const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
