const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const thoughtRoutes = require('./routes/thoughtRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Establishes Routes
app.use('/api/users', userRoutes);
app.use('/api/thoughts', thoughtRoutes);

// Connects to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/socialNetworkDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// fix?
mongoose.set('debug', true);

app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}!`);
});