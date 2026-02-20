"use client";

import { useState, useEffect } from "react";

interface ImageType {
  url: string;
  public_id: string;
  alt?: string;
}

interface ProductType {
  _id?: string;
  name: string;
  description?: string;
  mrp?: number;
  price: number;
  category?: string;
  images: ImageType[];
}

interface Props {
  initialData?: ProductType; 
}

export default function ProductForm({ initialData }: Props) {
  const [product, setProduct] = useState<ProductType>({
    name: "",
    description: "",
    mrp: 0,
    price: 0,
    category: "",
    images: [],
  });

  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    if (initialData) setProduct(initialData);
  }, [initialData]);

  const handleChange = (e: any) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: any) => {
    setFiles(Array.from(e.target.files));
  };

  const uploadImages = async () => {
    if (!files.length) return [];

    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    return data.map((img: any) => ({
      url: img.secure_url,
      public_id: img.public_id,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      const uploadedImages = await uploadImages();

      const finalProduct = {
        ...product,
        images: [...product.images, ...uploadedImages],
      };

      const res = await fetch(
        initialData ? `/api/products/${initialData._id}` : "/api/products",
        {
          method: initialData ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(finalProduct),
        },
      );

      if (!res.ok) throw new Error("Failed");

      alert("Product saved!");
    } catch (err) {
      alert("Error saving product");
    }

    setLoading(false);
  };

  const removeImage = (public_id: string) => {
    setProduct({
      ...product,
      images: product.images.filter((img) => img.public_id !== public_id),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
      <input
        name="name"
        placeholder="Product Name"
        value={product.name}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />

      <textarea
        name="description"
        placeholder="Description"
        value={product.description}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <input
        name="mrp"
        type="number"
        placeholder="MRP"
        value={product.mrp}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <input
        name="price"
        type="number"
        placeholder="Price"
        value={product.price}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />

      <input
        name="category"
        placeholder="Category"
        value={product.category}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <input type="file" multiple onChange={handleFileChange} />

      {/* Existing Images */}
      <div className="flex gap-3 flex-wrap">
        {product.images.map((img) => (
          <div key={img.public_id} className="relative">
            <img src={img.url} className="w-24 h-24 object-cover rounded" />
            <button
              type="button"
              onClick={() => removeImage(img.public_id)}
              className="absolute top-0 right-0 bg-red-500 text-white px-1"
            >
              X
            </button>
          </div>
        ))}
      </div>

      <button
        disabled={loading}
        className="bg-black text-white px-6 py-2 rounded"
      >
        {loading
          ? "Saving..."
          : initialData
            ? "Update Product"
            : "Create Product"}
      </button>
    </form>
  );
}
