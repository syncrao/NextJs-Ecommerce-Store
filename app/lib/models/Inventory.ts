import mongoose, { Schema, models } from "mongoose";

const InventorySchema = new Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    color: { type: String, required: true },
    size: { type: String, required: true },

    stock: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Inventory =
  models.Inventory || mongoose.model("Inventory", InventorySchema);

export default Inventory;