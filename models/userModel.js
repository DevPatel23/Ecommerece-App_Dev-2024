import mongoose, { Schema } from "mongoose";

// mongoDB databse ma "users, orders" jeva collection banave te kaya format ma hase te SCHEMA thi banavay
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: {}, //type ne {}object rakhva pade becoz multile line hoy, te string ma save nai thay
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
    role: {
      type: Number,
      default: 0, //true:1  false:0
    },
  },
  { timestamps: true } //       // schema no 2nd object
);

export default mongoose.model("users", userSchema); //////             users --> collection/model name              ////////
