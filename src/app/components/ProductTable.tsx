// tabel barang
"use client";
import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Product } from "../../types/productModel";
import { Icons } from "../components/Icons";

type ProductTableProps = {
  products: Product[];
  deleteProduct: (id: number) => void;
  updateProduct: (product: Product) => void;
};

const ProductTable = ({
  products,
  deleteProduct,
  updateProduct,
}: ProductTableProps) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isBulkDelete, setIsBulkDelete] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);

  const toggleSelectProduct = (id: number) => {
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedProducts.length === products.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(products.map((product) => product.id));
    }
  };

  const openDeleteModal = (isBulk: boolean, id?: number) => {
    setIsBulkDelete(isBulk);
    if (!isBulk && id !== undefined) {
      setSelectedProducts([id]);
    }
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setIsBulkDelete(false);
    setSelectedProducts([]);
  };

  const confirmDelete = () => {
    if (isBulkDelete) {
      selectedProducts.forEach((id) => deleteProduct(id));
      setSelectedProducts([]);
    } else if (selectedProducts.length === 1) {
      deleteProduct(selectedProducts[0]);
    }
    setSelectedProducts([]);
    closeDeleteModal();
  };

  /* const handleExportCSV = () => {
    const csv = products.map((product) => {
      return `${product.id},${product.name},${product.category},${product.quantity},${product.price},${product.dateAdded}`;
    });
    const csvData = csv.join("\n");
    const blob = new Blob([csvData], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "products.csv";
    a.click();
  }; */

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(value);
  };
  
  const isBulkSelectionActive = selectedProducts.length > 0; // cek apakah ada barang yang dipilih

  return (
    <div>
      <div className="mb-4 space-x-4">
        <button
            // onClick={handleExportCSV}
            className="bg-green-500 text-white px-4 py-2 rounded-md 
            hover:bg-green-600 transition-all duration-200"
          >
            Export File CSV
        </button>
        <button
          disabled={selectedProducts.length === 0}
          onClick={() => openDeleteModal(true)}
          className={`bg-red-500 text-white px-4 py-2 rounded-md 
            hover:bg-red-600 transition-all duration-200`}
            style={{ visibility: selectedProducts.length > 0 ? "visible" : "hidden" }}
        >
          Hapus Terpilih
        </button>
      </div>

      <table className="min-w-full table-auto border-collapse border-y border-gray-200">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b">
              <input
                type="checkbox"
                onChange={toggleSelectAll}
                checked={selectedProducts.length === products.length}
              />
            </th>
            <th className="w-80 px-4 py-2 border-b text-left">Nama Barang</th>
            <th className="px-4 py-2 border-b text-left">Kategori</th>
            <th className="px-4 py-2 border-b text-left">Jumlah Barang</th>
            <th className="px-4 py-2 border-b text-left">Harga Total</th>
            <th className="px-4 py-2 border-b text-left">Tanggal Masuk</th>
            <th className="w-32 px-4 py-2 border-b text-left">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.id} className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100`}>
              <td className="px-4 py-2 border-b text-center">
                <input
                  type="checkbox"
                  checked={selectedProducts.includes(product.id)}
                  onChange={() => toggleSelectProduct(product.id)}
                />
              </td>
              <td className="px-4 py-2 border-b">{product.name}</td>
              <td className="px-4 py-2 border-b">{product.category}</td>
              <td className="px-4 py-2 border-b">{product.quantity}</td>
              <td className="px-4 py-2 border-b">
                {formatCurrency(product.price * product.quantity)}
              </td>
              <td className="px-4 py-2 border-b">{product.dateAdded}</td>
              <td className="px-4 py-2 border-b space-x-2">
                <button
                  disabled={isBulkSelectionActive}
                  onClick={() => updateProduct(product)}
                  className={`w-8 h-8 bg-yellow-500 text-white px-2 py-1 rounded-md ${
                    isBulkSelectionActive
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-yellow-600"
                  } transition-all duration-200`}
                >
                  <Icons.PencilSquare />
                </button>
                <button
                  disabled={isBulkSelectionActive}
                  onClick={() => openDeleteModal(false, product.id)}
                  className={`w-8 h-8 bg-red-500 text-white px-2 py-1 rounded-md ${
                    isBulkSelectionActive
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-red-600"
                  } transition-all duration-200`}
                >
                  <Icons.Trash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Bagian Delete Modal */}
      {isDeleteModalOpen && (
        <Dialog open={isDeleteModalOpen} onClose={closeDeleteModal}>
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
              <Dialog.Panel className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-bold mb-4">Konfirmasi Hapus</h2>
                <p className="text-gray-700 mb-6">
                Apakah Anda yakin ingin menghapus{" "}
                {isBulkDelete
                  ? `${selectedProducts.length} barang terpilih`
                  : "barang ini"}
                ? Data yang dihapus tidak dapat dikembalikan.
                </p>
                <div className="flex justify-end space-x-4">
                  <button
                    onClick={closeDeleteModal}
                    className="bg-gray-300 text-gray-900 px-4 py-2 rounded-md
                    hover:bg-gray-400 transition-all duration-200"
                  >
                    Batalkan
                  </button>
                  <button
                    onClick={confirmDelete}
                    className="bg-red-500 text-white px-4 py-2 rounded-md
                    hover:bg-red-600 transition-all duration-200"
                  >
                    Hapus
                  </button>
                </div>
              </Dialog.Panel>
            </div>
          </Dialog>
        )}
      </div>
  );
};

export default ProductTable;
