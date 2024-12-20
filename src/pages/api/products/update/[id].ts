import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "../../../../lib/mongodb";
import Product from "../../../../models/Product";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "PUT") {
    try {
      await connectDB();
      const { id, name, category, quantity, price, dateAdded } = req.body;

      if (!id) {
        return res.status(400).json({ message: "Product ID is required" });
      }

      const updatedProduct = await Product.findOneAndUpdate(
        { id },
        { name, category, quantity, price, dateAdded },
        { new: true }
      );

      if (!updatedProduct) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.status(200).json(updatedProduct);
    } catch (error) {
      res.status(500).json({ message: "Failed to update product", error });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
