import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "../../../../lib/mongodb";
import Product from "../../../../models/Product";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "DELETE") {
    try {
      await connectDB();

      const { id } = req.body;

      if (!id) {
        return res.status(400).json({ message: "Product ID is required" });
      }

      const deletedProduct = await Product.findOneAndDelete({ id });

      if (!deletedProduct) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.status(200).json({ message: "Product deleted successfully", deletedProduct });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete product", error });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}