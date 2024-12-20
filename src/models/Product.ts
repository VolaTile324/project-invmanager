import mongoose, { Document, Schema } from "mongoose";

export interface ProductDocument extends Document {
  name: string;
  category: string;
  quantity: number;
  price: number;
  dateAdded: Date;
}

const ProductSchema: Schema = new Schema(
  {
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    category: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    dateAdded: { type: Date, required: true },
  },
  { timestamps: true }
);

const Product = mongoose.models.Product || mongoose.model<ProductDocument>("Product", ProductSchema);

export default Product;
