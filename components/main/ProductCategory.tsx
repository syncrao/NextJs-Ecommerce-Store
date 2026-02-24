"use client";

import Link from "next/link";
import Image from "next/image";

type Product = {
  _id: string;
  name: string;
  mrp: number;
  price: number;
  images: { url: string }[];
};

export function SkeletonCard() {
  return (
    <div className="relative overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse p-3 space-y-3">
      <div className="w-full h-40 rounded-lg bg-gray-300 dark:bg-gray-600" />
      <div className="h-4 rounded w-3/4 bg-gray-300 dark:bg-gray-600" />
      <div className="h-4 rounded w-1/2 bg-gray-300 dark:bg-gray-600" />
      <div className="flex gap-2">
        <div className="h-4 w-12 rounded bg-gray-300 dark:bg-gray-600" />
        <div className="h-4 w-16 rounded bg-gray-300 dark:bg-gray-600" />
      </div>
    </div>
  );
}

export default function ProductCategory({
  title,
  items,
  category,
  loading,
}: {
  title: string;
  items: Product[];
  category: string;
  loading: boolean;
}) {
  console.log("ProductCategory component rendered");
  const getDiscount = (mrp: number, price: number) =>
    Math.round(((mrp - price) / mrp) * 100);

  return (
    <div className="px-4 my-6 lg:px-8">
      {title && (
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-main">{title}</h2>

          <Link
            href={`/products`}
            className="text-accent font-semibold hover:text-accent-hover transition"
          >
            See All
          </Link>
        </div>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6">
        {loading
          ? Array.from({ length: title ? 4 : 8 }).map((_, i) => <SkeletonCard key={i} />)
          : items.slice(0, title ? 4 : items.length).map((item) => (
              <Link
                href={`/products/${item._id}`}
                key={item._id}
                className="rounded-lg transition relative group"
              >
                <span className="absolute z-10 m-2 p-2 bg-accent text-white text-xs font-semibold px-2 py-1 rounded">
                  {getDiscount(item.mrp, item.price)
                    ? getDiscount(item.mrp, item.price)
                    : 0}
                  % OFF
                </span>

                <div className="relative w-full h-80 md:h-96">
                  <Image
                    src={item.images[0]?.url}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <h3 className="mt-3 text-muted font-medium text-sm line-clamp-2 group-hover:text-accent transition-colors">
                  {item.name} 
                </h3>

                <div className="mt-2 flex items-center gap-2">
                  <span className="text-muted line-through text-sm">
                    ₹{item.mrp}
                  </span>
                  <span className="text-main font-semibold">₹{item.price}</span>
                </div>
              </Link>
            ))}
      </div>
    </div>
  );
}
