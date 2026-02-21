"use client";

import { useEffect, useState } from "react";

type Inventory = {
  _id: string;
  productId: any;
  color: string;
  size: string;
  stock: number;
};

export default function InventoryPage() {
  const [data, setData] = useState<Inventory[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    const res = await fetch("/api/inventory");
    const json = await res.json();
    setData(json);
    setLoading(false);
  }

  async function deleteItem(id: string) {
    if (!confirm("Delete inventory?")) return;

    await fetch(`/api/inventory/${id}`, { method: "DELETE" });
    load();
  }

  useEffect(() => {
    load();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Inventory</h1>

      <a href="/admin/inventory/add">Add Inventory</a>

      <table border={1} cellPadding={5}>
        <thead>
          <tr>
            <th>Product</th>
            <th>Color</th>
            <th>Size</th>
            <th>Stock</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {data.map((i) => (
            <tr key={i._id}>
              <td>{i.productId?.name}</td>
              <td>{i.color}</td>
              <td>{i.size}</td>
              <td>{i.stock}</td>

              <td>
                <a href={`/admin/inventory/${i._id}`}>Edit</a>{" "}
                <button onClick={() => deleteItem(i._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}