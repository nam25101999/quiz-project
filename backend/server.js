const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const examRoutes = require('./routes/examRoutes');
const userRoutes = require('./routes/userRoutes'); 
const noteRoutes = require('./routes/noteRoutes');
const searchRoutes = require('./routes/searchRoutes');
const resultsRoutes = require('./routes/resultsRoutes')

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

app.use('/api/users', userRoutes);

app.use('/api/exam', examRoutes);

app.use('/api/results', resultsRoutes);

app.use('/api/note', noteRoutes);

app.use('/api/search', searchRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
