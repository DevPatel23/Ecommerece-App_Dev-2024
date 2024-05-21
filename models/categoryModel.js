import mongoose from "mongoose"; // mongoDB mate aa import karyu

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    // required: true,
    // unique: true,
  },

  slug: {
    type: String,
    lowercase: true,
  },
});

export default mongoose.model("category", categorySchema); // (model-name, schema-name)
//  model nu je name hase te name nu NEW COLLECTION(category) mongoDB ma bani jase
