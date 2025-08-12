import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/brumario');
    console.log('MongoDB conectado');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

export default connectDB;
