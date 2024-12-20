import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "../../../lib/mongodb";
import Product from "../../../models/Product";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await connectDB();

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // hitung semua produk hari ini
    const totalToday = await Product.countDocuments({
      dateAdded: { $gte: today.toISOString() },
    });

    // hitung semua produk
    const totalAllTime = await Product.countDocuments();

    res.status(200).json({ totalToday, totalAllTime });
  } catch (error) {
    res.status(500).json({ message: "Error fetching stats", error });
  }
}