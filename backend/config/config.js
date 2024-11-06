import mongoose from 'mongoose';

const connectToDatabase = async () => {
  const uri = 'mongodb+srv://abutochris2015:2bsQtwJ6QkYGLCaQ@cluster0.ilhc6.mongodb.net/blog_post'
  if (!uri) {
    throw new Error('MONGO_URI is not defined. Check your .env file.');
  }

  try {
    await mongoose.connect(uri); // Removed deprecated options
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    throw err;
  }
};

export default connectToDatabase;