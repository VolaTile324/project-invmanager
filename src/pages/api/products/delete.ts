import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "../../../lib/mongodb";
import Product from "../../../models/Product";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "DELETE") {
    const { ids } = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ message: "IDs array is required" });
    }

    try {
      await connectDB();
      
      const result = await Product.deleteMany({
        id: { $in: ids }
      });

      if (result.deletedCount > 0) {
        return res.status(200).json({ message: "Products deleted successfully" });
      } else {
        return res.status(404).json({ message: "No products found to delete" });
      }
    } catch (error) {
      return res.status(500).json({ message: "Error deleting products", error });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
