const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Check if we already have a connection (Prevents crashing on Vercel)
    if (mongoose.connection.readyState >= 1) {
      return;
    }

    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;