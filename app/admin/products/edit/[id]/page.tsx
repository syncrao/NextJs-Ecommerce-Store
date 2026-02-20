"use client";

import ProductForm from "@/app/components/admin/ProductForm";
import { fetcher } from "@/app/lib/fetcher";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface ImageType {
  url: string;
  public_id: string;
  alt?: string;
}

interface ProductType {
  _id: string;
  name: string;
  description?: string;
  price: number;
  category?: string;
  images: ImageType[];
}

export default function ProductEditClient() {
  const params = useParams(); 
  const [product, setProduct] = useState<ProductType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!params?.id) return;

    const fetchProduct = async () => {
      try {
        const data = await fetcher(`/api/products/${params.id}`);
        setProduct(data);
      } catch (err) {
        console.error("Failed to fetch product", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params?.id]);

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
      <ProductForm initialData={product} />
    </div>
  );
}
