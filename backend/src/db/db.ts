import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || "mongodb+srv://ncarreno_db_user:Kj0CEGNVXNyFT8Zi@brumario.exqorlm.mongodb.net/?appName=brumario";
    await mongoose.connect(mongoURI);
    console.log('MongoDB conectado');
  } catch (err) {
    console.error('Error conectando a MongoDB:', err);
    process.exit(1);
  }
};

export default connectDB;