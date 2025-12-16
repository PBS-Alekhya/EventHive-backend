const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

/* -------------------- CORS -------------------- */

const allowedOrigins = [
  'https://event-hive-front-end.vercel.app',
  'https://event-hive-front-her1t91rb-pbs-alekhyas-projects.vercel.app',
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Enable preflight for all routes
app.options('*', cors());

/* -------------------- BODY PARSER -------------------- */

app.use(express.json());

/* -------------------- DB CONNECTION -------------------- */

// Connect once (serverless-safe)
connectDB();

/* -------------------- ROUTES -------------------- */

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/events', require('./routes/eventRoutes'));
app.use('/api/registrations', require('./routes/registrationRoutes'));

app.get('/', (req, res) => {
  res.status(200).send('API running');
});

module.exports = app;
