const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const connectDB = require('./config/db')
const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');
const registrationRoutes = require('./routes/registrationRoutes');

dotenv.config();

connectDB();

const app = express()

app.use(express.json());
app.use(cors());
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/registrations', registrationRoutes);

app.get('/',(req,res)=> {
    res.send("API is running...");
});

const PORT = process.env.PORT || 5000;

module.exports = app;

