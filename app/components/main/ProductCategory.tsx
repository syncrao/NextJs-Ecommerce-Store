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

      {/* Image */}
      <div className="w-full h-40 rounded-lg bg-gray-300 dark:bg-gray-600" />

      {/* Title */}
      <div className="h-4 rounded w-3/4 bg-gray-300 dark:bg-gray-600" />
      <div className="h-4 rounded w-1/2 bg-gray-300 dark:bg-gray-600" />

      {/* Price */}
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
  const getDiscount = (mrp: number, price: number) =>
    Math.round(((mrp - price) / mrp) * 100);

  return (
    <div className="px-4 mb-10 lg:mb-20 lg:px-8 bg-section">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-main">{title}</h2>

        <Link
          href={`/products/${category}`}
          className="text-accent font-semibold hover:text-accent-hover transition"
        >
          See All
        </Link>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))
          : items.slice(0, 4).map((item) => (
              <Link
                href={`/product/${item._id}`}
                key={item._id}
                className="rounded-lg transition relative group bg-surface p-3 hover:shadow-md"
              >
                {/* Discount */}
                <span className="absolute top-3 left-3 bg-accent text-inverse text-xs font-semibold px-2 py-1 rounded">
                  {getDiscount(item.mrp, item.price)}% OFF 
                </span>

                {/* Image */}
                
                <div className="overflow-hidden rounded-lg relative w-full h-60">
                  <Image
                    src={item.images[0]?.url}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Name */}
                <h3 className="mt-3 text-muted font-medium text-sm line-clamp-2 group-hover:text-accent transition-colors">
                  {item.name}
                </h3>

                {/* Price */}
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-muted line-through text-sm">
                    ₹{item.mrp}
                  </span>
                  <span className="text-main font-semibold">
                    ₹{item.price}
                  </span>
                </div>
              </Link>
            ))}
      </div>
    </div>
  );
}