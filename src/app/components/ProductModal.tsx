// dialog modal untuk menambahkan produk baru
"use client";
import React, { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { Product } from "../../types/productType";
import { Category } from "@/types/categoryType";
import { useNumberFormat } from "@react-input/number-format";

interface ProductModalProps {
    closeModal: () => void;
    saveProduct: (product : Product) => void;
    product?: Product | null; // untuk editing
}

const formatDate = (date: string) => {
    return new Date(date).toISOString().split("T")[0];
}

const ProductModal = ({
    closeModal,
    saveProduct,
    product,
}: ProductModalProps) => {
  // Inisialisasi dengan data produk yang ada kalau editing, atau data kosong jika menambahkan produk baru
  const [formData, setFormData] = useState<Product>({
    id: product?.id || 0,
    name: product?.name || "",
    category: product?.category || Category.Electronics, // Default setting
    quantity: product?.quantity || 1,
    price: product?.price || 100,
    dateAdded: product?.dateAdded || new Date().toISOString().split("T")[0], // Default ke hari ini
  });

  useEffect(() => {
    // Ketika prop produk berubah (editing produk), update data
    if (product) {
      setFormData({
        id: product.id,
        name: product.name,
        category: product.category,
        quantity: product.quantity,
        price: product.price,
        dateAdded: formatDate(product.dateAdded),
      });

      console.log(product);
    }
    else {
      setFormData((prev) => ({
        ...prev,
        id: parseInt(Date.now().toString()), // Generate ID
      }));
    }
  }, [product]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  
  // format display penulisan harga
  const numberFormat = useNumberFormat({
    maximumFractionDigits: 0,
    locales: "id-ID",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validasi data
    if (!formData.name || !formData.category || !formData.dateAdded) {
      alert("Mohon lengkapi data produk.");
      return;
    }

    // Validasi tanggal
    const currentDate = new Date().toISOString().split("T")[0];
    const selectedDate = new Date(formData.dateAdded).toISOString().split("T")[0];
    if (selectedDate > currentDate) {
      alert("Tanggal hanya diperbolehkan sampai hari ini.");
      return;
    }

    // Validasi harga dan konversi
    const price = parseInt(formData.price.toString().replace(/\D/g, ""));
    if (price < 100) {
      alert("Harga minimal Rp100.");
      return;
    } else {
      formData.price = price;
    }

    try {
      let response;
      if (product) {
        // Khusus update
        response = await fetch(`/api/products/update/${product.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
      } else {
        // Khusus tambah produk baru
        response = await fetch("/api/products/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
      }

      if (!response.ok) {
        throw new Error("Failed to save product.");
      }

      const savedProduct = await response.json();
      saveProduct(savedProduct);
      closeModal();
    } catch (error) {
      console.error("Error saving product:", error);
      alert("Terjadi kesalahan saat menyimpan produk.");
    }
  };

  return (
    <Dialog open={true} onClose={closeModal}>
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <Dialog.Panel className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96">
          <h2 className="text-center text-xl font-bold mb-4">{product ? "Edit Barang" : "Tambah Barang"}</h2>
          <form onSubmit={handleSubmit}>
            {!product && (
              <div className="mb-4 hidden">
                <label className="block mb-2">ID</label>
                <input
                  type="text"
                  name="id"
                  value={formData.id}
                  onChange={handleChange}
                  className="border px-3 py-2 w-full"
                  disabled
                />
              </div>
            )}
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium">
                Nama Barang
                <span className="ml-1 text-xs font-bold text-red-500 dark:text-red-400">( * Wajib diisi )</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-1 p-2 border border-gray-300 rounded-md w-full dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="category" className="block text-sm font-medium">Kategori</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="mt-1 p-2 border border-gray-300 rounded-md w-full dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200"
              >
                {Object.values(Category).map((category) => (
                  <option key={category} value={category} className="dark:bg-gray-800 dark:text-gray-200">
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor="quantity" className="block text-sm font-medium">
                Jumlah Barang
                <span className="ml-1 text-xs font-bold text-red-500 dark:text-red-400">( * Minimal 1 )</span>
              </label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                required
                min={1}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="price" className="block text-sm font-medium">Harga per Unit
                <span className="ml-1 text-xs font-bold text-red-500 dark:text-red-400">( * Minimal 100 )</span>
              </label>
              <div className="flex items-center space-x-2">
                <p className="mt-1 text-gray-500 dark:text-gray-300">Rp.</p>
              <input
                ref={numberFormat}
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                className="mt-1 p-2 border border-gray-300 rounded-md w-full dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200"
              />
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="dateAdded" className="block text-sm font-medium">Tanggal Masuk</label>
              <input
                type="date"
                id="dateAdded"
                name="dateAdded"
                value={formData.dateAdded}
                onChange={handleChange}
                required
                className="mt-1 p-2 border border-gray-300 rounded-md w-full dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200"
              />
            </div>

            <div className="flex justify-center space-x-4">
              <button
                onClick={closeModal}
                className="bg-gray-300 text-gray-900 px-4 py-2 rounded-md
                hover:bg-gray-400 transition-all duration-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
              >
                Batalkan
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md
                hover:bg-blue-600 transition-all duration-200 dark:bg-blue-600 dark:hover:bg-blue-700"
              >
                {product ? "Update Produk" : "Tambah Produk"}
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default ProductModal;
