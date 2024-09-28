import chalk from "chalk"; // Import chalk
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(
      chalk.cyan.bold.underline(`MongoDB connected: ${conn.connection.host}`)
    );
  } catch (err) {
    console.error(chalk.red.bold.underline(`Error: ${err.message}`));
    process.exit(1);
  }
};

export default connectDB;
