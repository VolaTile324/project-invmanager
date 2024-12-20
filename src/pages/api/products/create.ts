import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "../../../lib/mongodb";
import Product from "../../../models/Product";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      await connectDB();
      const product = new Product(req.body);
      const savedProduct = await product.save();
      res.status(201).json(savedProduct);
    } catch (error) {
      res.status(500).json({ message: "Failed to create product", error });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
