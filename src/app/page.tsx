// halaman utama
"use client";
import React, { useState } from "react";
import ProductModal from "./components/ProductModal";
import ProductTable from "../app/components/ProductTable";
import ProductFilter from "../app/components/ProductFilter";
import { Product } from "../types/productModel";

const InventoryPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const addProduct = (newProduct: Product) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) => (product.id === updatedProduct.id ? updatedProduct : product))
    );
  }

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const deleteProduct = (id: number) => {
    setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-center text-xl font-bold border-b pb-2">Daftar Inventaris</h2>
      <div className="mt-4">
        <div className= "flex justify-between items-center">
          <button
            onClick={() => {
              setEditingProduct(null);
              setIsModalOpen(true);
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4
            hover:bg-blue-600 transition-all duration-200"
          >
            + Tambah
          </button>

          <ProductFilter
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </div>

        <ProductTable
          products={filteredProducts}
          updateProduct={handleEditProduct} // bawa handleEditProduct untuk updateProduct
          deleteProduct={deleteProduct}
        />
      </div>

      {/* Modal setup */}
      {isModalOpen && (
        <ProductModal
          closeModal={() => setIsModalOpen(false)}
          saveProduct={editingProduct ? updateProduct : addProduct} // update kalau edit, add kalau tambah produk baru
          product={editingProduct}
        />
      )}
    </div>
  );
};

export default InventoryPage;
