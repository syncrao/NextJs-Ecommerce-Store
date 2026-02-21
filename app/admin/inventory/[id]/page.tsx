"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function EditInventory() {
  const { id }: any = useParams();
  const [form, setForm] = useState<any>(null);

  useEffect(() => {
    fetch(`/api/inventory/${id}`)
      .then((r) => r.json())
      .then(setForm);
  }, [id]);

  if (!form) return <p>Loading...</p>;

  async function submit(e: any) {
    e.preventDefault();

    await fetch(`/api/inventory/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    alert("Updated");
  }

  return (
    <form onSubmit={submit}>
      <h1>Edit Inventory</h1>

      <input
        value={form.color}
        onChange={(e) => setForm({ ...form, color: e.target.value })}
      />

      <input
        value={form.size}
        onChange={(e) => setForm({ ...form, size: e.target.value })}
      />

      <input
        type="number"
        value={form.stock}
        onChange={(e) =>
          setForm({ ...form, stock: Number(e.target.value) })
        }
      />

      <button>Save</button>
    </form>
  );
}