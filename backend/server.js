const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
// backend/server.js
const questionRoutes = require('./routes/questions');
const answerRoutes = require('./routes/answers');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('Database connection error:', err));

// Placeholder route
app.get('/', (req, res) => {
  res.send('Quiz Backend is running');
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

// Sử dụng route
app.use('/api/questions', questionRoutes);
app.use('/api/answers', answerRoutes);
