const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

app.use(cors({
  origin: 'https://event-hive-front-end.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE','PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

app.options('/*', cors());

//  Connect DB 
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'DB connection failed' });
  }
});

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/events', require('./routes/eventRoutes'));
app.use('/api/registrations', require('./routes/registrationRoutes'));

app.get('/', (req, res) => {
  res.status(200).send('API running');
});


module.exports = app;
