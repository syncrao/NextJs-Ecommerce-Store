"use client";

import { fetcher } from "@/app/lib/fetcher";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useCartStore } from "@/stores/cartStore";
import Image from "next/image";

type ImageType = {
  url: string;
};

type Products = {
  _id: string;
  name: string;
  description: string;
  mrp: number;
  price: number;
  images: ImageType[];
  category: string;
};

type Inventory = {
  _id: string;
  color: string;
  size: string;
  stock: number;
};

const ProductSkeleton = () => {
  return (
    <div className="md:p-4 space-y-6 animate-pulse">
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="w-full h-96">
          <div className="flex flex-col lg:flex-row-reverse gap-4 w-full h-full">
            <div className="relative w-full h-full bg-gray-200 rounded-xl" />
            <div className="flex lg:flex-col px-4 gap-3 overflow-x-auto">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-20 h-20 bg-gray-200 rounded-lg" />
              ))}
            </div>
          </div>
        </div>
        <div className="w-full px-4 space-y-4">
          <div className="h-8 bg-gray-200 rounded w-3/4" />
          <div className="flex gap-4">
            <div className="h-10 bg-gray-200 rounded-lg w-48" />
            <div className="h-10 bg-gray-300 rounded-lg w-32" />
          </div>
        </div>
      </div>
    </div>
  );
};

const ProductDetails = () => {
  const [product, setProduct] = useState<Products | null>(null);
  const [inventory, setInventory] = useState<Inventory[]>([]);
  const [selected, setSelected] = useState<Inventory | null>(null);
  const [selectedImage, setSelectedImage] = useState<ImageType | null>(null);

  const params = useParams();
  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    const loadData = async () => {
      try {
        const prod = await fetcher(`/api/products/${params.id}`);
        const inv = await fetcher(`/api/inventory/product/${params.id}`);
        console.log("Product:", prod);
        console.log("Inventory:", inv);
        setProduct(prod);
        setInventory(inv);

        if (prod?.images?.length > 0) {
          setSelectedImage(prod.images[0]);
        }
      } catch (err) {
        console.error("Error loading product", err);
      }
    };

    if (params?.id) loadData();
  }, [params.id]);

  if (!product) return <ProductSkeleton />;

  const imageUrl =
    selectedImage?.url || product.images?.[0]?.url || "/placeholder.png";

  const handleAddToCart = () => {
    if (!product || !selected || selected.stock <= 0) {
      alert("Select available variant ❌");
      return;
    }

    addToCart({
      productId: product._id,
      inventoryId: selected._id,
      name: product.name,
      price: product.price,
      image: imageUrl,
      color: selected.color,
      size: selected.size,
    });

    alert("Added to cart ✅");
  };

  return (
    <div className="md:p-6 space-y-6">
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="w-full h-200">
          <div className="flex flex-col lg:flex-row-reverse gap-4 w-full p-4">
            <div className="relative w-full h-170 overflow-hidden group">
              <Image
                src={imageUrl}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </div>

            <div className="flex lg:flex-col gap-3 overflow-x-auto">
              {product.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img.url}
                  alt={product.name}
                  onClick={() => setSelectedImage(img)}
                  className={`w-20 h-20 object-cover rounded-lg border cursor-pointer ${
                    selectedImage?.url === img.url
                      ? "border-black"
                      : "border-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="w-full px-6 lg:py-4 space-y-4">
          <h2 className="text-2xl font-semibold">{product.name}</h2>

          <p className="text-gray-600">{product.description}</p>
          <p className=""> <span className="bg-gray-200 px-2 py-1 rounded">Category</span>  {product.category}</p>
          <p
            className={`text-sm ${inventory[0] ? "text-green-600" : "text-red-600"}  font-semibold`}
          >
            {inventory[0] ? "In Stock" : "Out of Stock"}
          </p>

          <div className="mt-2 flex items-center gap-2">
            <span className="text-muted line-through text-3xl">
              ₹{product.mrp}
            </span>
            <span className="text-4xl font-semibold">₹{product.price}</span>
          </div>

          <div className="flex gap-4 flex-wrap">
            <select
              className="border p-2 rounded-lg"
              onChange={(e) =>
                setSelected(
                  inventory.find((i) => i._id === e.target.value) || null,
                )
              }
            >
              <option>Select Color / Size</option>
              {inventory.map((i) => (
                <option key={i._id} value={i._id} disabled={i.stock <= 0}>
                  {i.color} / {i.size} {i.stock <= 0 ? "(Out)" : ""}
                </option>
              ))}
            </select>

            <button
              onClick={handleAddToCart}
              className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition"
            >
              Add to Cart
            </button>
          </div>
          <div>
            <p className="text-sm text-gray-500 mt-2">Free shipping on orders over ₹499</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
