"use client";

import { useEffect, useState } from "react";
import { fetcher } from "../lib/fetcher";
import Image from "next/image";
import Link from "next/link";

type Products = {
  _id: string;
  name: string;
  mrp: number;
  price: number;
  images: { url: string }[];
};

const Products = () => {
  const [products, setProducts] = useState<Products[]>([]);

  useEffect(() => {
    fetcher("/api/products", { revalidate: 8000 })
      .then((data) => setProducts(data))
      .catch((err) => console.error("Failed to fetch products:", err));
    console.log("Fetched products:", products);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col items-center gap-8">
      <h1>Products</h1>

      {products.map((product) => (
        <div key={product._id}>
          <h1>{product.name}</h1>
          <Image
            src={product.images[0]?.url}
            alt={product.name}
            className="group-hover:scale-105 transition-transform duration-300"
            width={300}
            height={300}
          />
          <Link href={`/products/${product._id}`}>
          Details
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Products;
