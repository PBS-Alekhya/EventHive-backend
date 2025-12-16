const mongoose = require('mongoose');

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGO_URI, {
      bufferCommands: false,
    }).then((mongoose) => mongoose);
  }

  try {
    cached.conn = await cached.promise;
    console.log('MongoDB connected');
  } catch (e) {
    cached.promise = null;
    console.error('MongoDB connection failed:', e.message);
    throw e;
  }

  return cached.conn;
};

module.exports = connectDB;
