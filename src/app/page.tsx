import React from 'react';
import Link from 'next/link';

const InventoryPage = () => {
  const products = [
    { id: 1, name: "Product 1", category: "Category A", quantity: 10, price: 1000, dateAdded: "2024-12-01" },
    { id: 2, name: "Product 2", category: "Category B", quantity: 5, price: 2000, dateAdded: "2024-12-05" },
  ];

  return (
    <div>
      <h2 className="text-xl font-bold">Product List</h2>
      <div className="mt-4">
        <Link href="/inventory/add">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4">
            Add New Product
          </button>
        </Link>
        <table className="min-w-full table-auto border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b text-left">Name</th>
              <th className="px-4 py-2 border-b text-left">Category</th>
              <th className="px-4 py-2 border-b text-left">Quantity</th>
              <th className="px-4 py-2 border-b text-left">Price</th>
              <th className="px-4 py-2 border-b text-left">Date Added</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td className="px-4 py-2 border-b">{product.name}</td>
                <td className="px-4 py-2 border-b">{product.category}</td>
                <td className="px-4 py-2 border-b">{product.quantity}</td>
                <td className="px-4 py-2 border-b">{product.price}</td>
                <td className="px-4 py-2 border-b">{product.dateAdded}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InventoryPage;