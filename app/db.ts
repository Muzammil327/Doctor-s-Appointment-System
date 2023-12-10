import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb+srv://muzammilsafdar528982:JIJcPeOoyiyLh0Wg@cluster0.xvm14he.mongodb.net/doctor';

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

export default connectDB;
