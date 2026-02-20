"use client"

import { useEffect, useState } from "react";
import HomeHero from "./components/main/HomeHero";
import ProductCategory from "./components/main/ProductCategory";
import { fetcher } from "./lib/fetcher";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetcher("/api/products", {revalidate: 8000})
      .then((data) => setProducts(data))
      .catch((err) => console.error("Failed to fetch products:", err));
      console.log("Fetched products:", products);
  }, [])

  return (
    <div className="">
    <HomeHero />
    <ProductCategory title="Best Sellers" items={products} category="best-sellers" loading={products.length === 0} />
    </div>
  );
}
