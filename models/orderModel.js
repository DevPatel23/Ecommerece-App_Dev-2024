import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    //1
    products: [
      {
        type: mongoose.ObjectId,
        ref: "products",
      },
    ],

    //2
    payment: {},

    //3
    buyer: {
      type: mongoose.ObjectId,
      ref: "users",
    },

    //4
    status: {
      type: String,
      default: "Not Process",
      enum: ["Not Process", "Processing", "Shipped", "Delivered", "Cancel"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
