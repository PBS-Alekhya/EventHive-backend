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
app.use((req, res, next) => {
  
  res.setHeader("Access-Control-Allow-Origin", "*");
  
  
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  
  // Allow all standard methods
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );

  next();
});


app.options("*", (req, res) => {
  res.sendStatus(200);
});
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