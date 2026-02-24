"use client";

import { useEffect, useState } from "react";
import { fetcher } from "../lib/fetcher";
import ProductCategory from "@/components/main/ProductCategory";

type Products = {
  _id: string;
  name: string;
  mrp: number;
  price: number;
  images: { url: string }[];
};

const Products = () => {

  console.log("Products page rendered");
  const [products, setProducts] = useState<Products[]>([]);

  useEffect(() => {
    fetcher("/api/products", { revalidate: 8000 })
      .then((data) => setProducts(data))
      .catch((err) => console.error("Failed to fetch products:", err));
    console.log("Fetched products:", products);
  }, []);

  return (
    <div className="">
      <ProductCategory title="" items={products} category="best-sellers" loading={products.length === 0} />
    </div>
  );
};

export default Products;
