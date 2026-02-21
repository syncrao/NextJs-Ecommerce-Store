"use client";
import { useEffect, useState } from "react";
import { fetcher } from "@/app/lib/fetcher";
import Link from "next/link";

interface Product {
  _id: string;
  name: string;
  price: number;
}

const ProductsCard = () => {
  console.log("ProductsCard component rendered");
  const [data, setData] = useState<Product[]>([]);
  const [error, setError] = useState();

  useEffect(() => {
    fetcher("/api/products", { revalidate: 300 })
      .then((res) => {
        console.log(res);
        setData(res);
      })
      .catch((error) => {
        console.error("Component Error:", error);
        setError(error.message || "Something went wrong");
      });
  }, []);

  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      {data.length ? (
        <div>
          {data.map((product) => {
            return (
              <div key={product._id}>
                <h1>{product.name}</h1>
                <p>{product.price}</p>
                <p>{product._id}</p>
                <Link href={`/admin/products/${product._id}`}>
                Edit
                </Link>
              </div>
            );
          })}
        </div>
      ) : (
        "Loading . . ."
      )}
    </div>
  );
};

export default ProductsCard;
