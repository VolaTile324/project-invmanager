import { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "../../../lib/mongodb";
import Product from "../../../models/Product";
import { json2csv } from "json-2-csv";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await connectDB();

    const products = await Product.find({});
    const includedField = ["id", "name", "category", "quantity", "price", "dateAdded"];

    // Convert products to CSV format using json2csv
    const csv = json2csv(products, {keys: includedField});

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=products.csv');
    
    res.status(200).send(csv);
  } catch (error) {
    console.error("Error exporting products:", error);
    res.status(500).json({ message: "Failed to export products" });
  }
}
