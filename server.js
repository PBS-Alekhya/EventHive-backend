const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const connectDB = require('./config/db')
const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');
const registrationRoutes = require('./routes/registrationRoutes');

dotenv.config();

// Connect to Database
connectDB();

const app = express()

// Middleware
app.use(cors({
    origin: "*", 
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    credentials: true
}));
app.options('*', cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/registrations', registrationRoutes);

// Test Route
app.get('/',(req,res)=> {
    res.send("API is running...");
});

const PORT = process.env.PORT || 5000;

if (require.main === module) {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;