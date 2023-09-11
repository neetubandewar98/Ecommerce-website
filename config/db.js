import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`Connected to mongodb database ${await conn.connection.host}`);
  } catch (error) {
    console.log(`Error in MongoDb database ${error}`);
  }
};
export default connectDB;
