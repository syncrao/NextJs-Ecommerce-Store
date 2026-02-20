import mongoose, { Schema, models } from "mongoose";

const ImageSchema = new Schema({
  url: { type: String, required: true },
  public_id: { type: String, required: true },
  alt: { type: String },
});

const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    mrp: { type: Number, required: true },
    price: { type: Number, required: true },
    images: [ImageSchema],
    category: { type: String },
  },
  { timestamps: true }
);

const Product = models.Product || mongoose.model("Product", ProductSchema);
export default Product;
