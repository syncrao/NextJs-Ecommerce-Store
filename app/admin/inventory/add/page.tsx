"use client";

import { useEffect, useState } from "react";

type Product = {
  _id: string;
  name: string;
};

export default function AddInventory() {
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState({
    productId: "",
    color: "",
    size: "",
    stock: 0,
  });

  useEffect(() => {
    fetch("/api/products")
      .then((r) => r.json())
      .then(setProducts);
  }, []);

  async function submit(e: any) {
    e.preventDefault();

    await fetch("/api/inventory", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    alert("Created");
  }

  return (
    <form onSubmit={submit}>
      <h1>Add Inventory</h1>

      <select
        value={form.productId}
        onChange={(e) =>
          setForm({ ...form, productId: e.target.value })
        }
        required
      >
        <option value="">Select product</option>
        {products.map((p) => (
          <option key={p._id} value={p._id}>
            {p.name}
          </option>
        ))}
      </select>

      <input
        placeholder="Color"
        onChange={(e) => setForm({ ...form, color: e.target.value })}
        required
      />

      <input
        placeholder="Size"
        onChange={(e) => setForm({ ...form, size: e.target.value })}
        required
      />

      <input
        type="number"
        placeholder="Stock"
        onChange={(e) =>
          setForm({ ...form, stock: Number(e.target.value) })
        }
      />

      <button type="submit">Create</button>
    </form>
  );
}