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



/* -------------------- BODY PARSER -------------------- */

app.use(express.json());

/* -------------------- DB CONNECTION -------------------- */

// Connect once (serverless-safe)
app.use(async (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }
  try {
    await connectDB(); // Waits here until connected
    next(); // Only then moves to the routes
  } catch (error) {
    console.error("Database Connection Failed:", error);
    res.status(500).json({ error: "Service unavailable: Database error" });
  }
});

/* -------------------- ROUTES -------------------- */

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/events', require('./routes/eventRoutes'));
app.use('/api/registrations', require('./routes/registrationRoutes'));

app.get('/', (req, res) => {
  res.status(200).send('API running');
});

module.exports = app;
