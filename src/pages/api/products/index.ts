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

    const pageNumber = parseInt(req.query.page as string, 10) || 1;
    const pageLimit = parseInt(req.query.limit as string, 10) || 10;

    const totalItems = await Product.countDocuments(filter);

    const products = await Product.find(filter).skip((pageNumber - 1) * pageLimit).limit(pageLimit);

    res.status(200).json({products, totalItems});
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Failed to fetch products" });
  }
}
