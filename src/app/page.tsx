// halaman utama
"use client";
import React, { useState, useEffect, useCallback } from "react";
import { Product } from "../types/productType";
import ProductModal from "./components/ProductModal";
import ProductTable from "../app/components/ProductTable";
import ProductFilter from "../app/components/ProductFilter";
import InventoryStats from "./components/InventoryStats";

const InventoryPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [stats, setStats] = useState({ totalToday: 0, totalAllTime: 0 });

  const fetchProducts = useCallback(async () => {
    try {
      const queryParams = new URLSearchParams();
      if (searchQuery) {
        queryParams.append("searchQuery", searchQuery);
      }
      
      if (selectedCategory) {
        queryParams.append("selectedCategory", selectedCategory);
      }

      const productResponse = await fetch(`/api/products?${queryParams.toString()}`);
      const data = await productResponse.json();
      if (Array.isArray(data)) {
        setProducts(data);
      } else {
        setProducts([]);  // fallback to empty array if data is not an array
      }

      const statResponse = await fetch("/api/products/stats");
      const statData = await statResponse.json();
      setStats(statData);

    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);  // fallback to empty array on error
    }
  }, [searchQuery, selectedCategory]);
  
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]); // it's re-run time, ketika searchQuery atau selectedCategory berubah

  const handleSaveProduct = async (product: Product) => {
    if (product.id) {
      setProducts((prevProducts) => prevProducts.map((p) => (p.id === product.id ? product : p)));
    }
    else {
      setProducts((prevProducts) => [...prevProducts, product]);
    }

    await fetchProducts();
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const deleteProduct = async (id: number) => {
    try {
      await fetch(`/api/products/delete/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }

    await fetchProducts();
  };

  const deleteBulkProducts = async (ids: number[]) => {
    try {
      const response = await fetch("/api/products/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log(data.message);
        setProducts((prevProducts) => prevProducts.filter((product) => !ids.includes(product.id)));
      }
    } catch (error) {
      console.error("Error deleting bulk products:", error);
    }

    await fetchProducts();
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-center text-l sm:text-xl font-bold border-b pb-2">Daftar Inventaris</h2>
      <div className="mt-4">
        <div className= "flex flex-col sm:flex-row sm:justify-between sm:items-center border-b mb-4">
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
          products={products} // langsung pakai filter dari API
          updateProduct={handleEditProduct} // bawa handleEditProduct untuk updateProduct
          deleteProduct={deleteProduct}
          deleteBulkProducts={deleteBulkProducts}
        />
      </div>

      {/* Modal setup */}
      {isModalOpen && (
        <ProductModal
          closeModal={() => setIsModalOpen(false)}
          saveProduct={handleSaveProduct} // update kalau edit, add kalau tambah produk baru
          product={editingProduct}
        />
      )}

      <InventoryStats totalToday={stats.totalToday} totalAllTime={stats.totalAllTime} />
    </div>
  );
};

export default InventoryPage;
