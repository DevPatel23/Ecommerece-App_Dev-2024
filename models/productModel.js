import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    //                   category mate Notebook ma vaachvu
    category: {
      type: mongoose.ObjectId,
      ref: "category", //         ref name e model-name j lakhase
      required: true,
    },
    //                   Photo mate Notebook ma vaachvu
    photo: {
      data: Buffer,
      contentType: String,
    },
    quantity: {
      type: Number,
      required: true,
    },
    shipping: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

export default mongoose.model("products", productSchema);
