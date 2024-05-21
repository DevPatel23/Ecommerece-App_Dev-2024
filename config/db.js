import mongoose from "mongoose";
import colors from "colors";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MOGO_URL);
    console.log(
      `Connected to Mongodb database ${conn.connection.host}`.bgWhite.black //host == cluster-name
    );
  } catch (error) {
    console.log(`Error in Mongodb is ${error}`.bgRed.white);
  }
};

export default connectDB;
