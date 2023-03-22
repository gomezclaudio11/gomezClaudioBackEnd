import mongoose from "mongoose";

const CarritoSchema = new mongoose.Schema(
  {
    nameProduct: { type: String, trim: true },
    description: { type: String, required: true, unique: true, trim: true }
  },
  {
    timestamps: true
   }
);

export default mongoose.model("Product", CarritoSchema);