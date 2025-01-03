import { Category } from "./categoryType";

// Definisi model data product
export interface Product {
  id: number;
  name: string;
  category: Category;
  quantity: number;
  price: number;
  dateAdded: string;
}
