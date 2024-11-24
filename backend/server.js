const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const examRoutes = require('./routes/examRoutes');
const userRoutes = require('./routes/userRoutes'); 

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Welcome to the server!');
});

// Kết nối MongoDB
mongoose
  .connect('mongodb://localhost:27017/userInfo')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));

// Định tuyến cho API người dùng
app.use('/api/users', userRoutes);

// Định tuyến cho API bài trắc nghiệm
app.use('/api/exams', examRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
