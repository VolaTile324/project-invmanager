// /pages/api/products.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "../../../lib/mongodb";
import Product from "../../../models/Product";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { searchQuery, selectedCategory } = req.query;

  try {
    await connectDB();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const filter: any = {};

    if (searchQuery) {
      filter.name = { $regex: searchQuery, $options: "i" }; // Regex untuk Case-insensitive search
    }

    if (selectedCategory) {
      filter.category = selectedCategory;
    }

    const products = await Product.find(filter);

    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Failed to fetch products" });
  }
}
