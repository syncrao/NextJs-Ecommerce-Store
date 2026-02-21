"use client";
import { fetcher } from "@/app/lib/fetcher";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useCartStore } from "@/stores/cartStore";

type Products = {
  _id: string;
  name: string;
  mrp: number;
  price: number;
  images: { url: string }[];
};

type Inventory = {
  _id: string;
  color: string;
  size: string;
  stock: number;
};

const Product = () => {
  const [product, setProduct] = useState<Products | null>(null);
  const [inventory, setInventory] = useState<Inventory[]>([]);
  const [selected, setSelected] = useState<Inventory | null>(null);

  const params = useParams();
  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    fetcher(`/api/products/${params.id}`).then(setProduct);
    fetcher(`/api/inventory/product/${params.id}`).then(setInventory);
  }, [params.id]);

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
      image: product.images?.[0]?.url,
      color: selected.color,
      size: selected.size,
    });

    alert("Added to cart ✅");
  };

  return (
    <div>
      <h2>{product?.name}</h2>

      {/* SELECT VARIANT */}
      <select
        onChange={(e) =>
          setSelected(inventory.find((i) => i._id === e.target.value) || null)
        }
      >
        <option>Select Color / Size</option>
        {inventory.map((i) => (
          <option key={i._id} value={i._id} disabled={i.stock <= 0}>
            {i.color} / {i.size} {i.stock <= 0 ? "(Out)" : ""}
          </option>
        ))}
      </select>

      {/* STOCK */}
      {selected && (
        <p>Stock: {selected.stock > 0 ? "Available" : "Out of Stock"}</p>
      )}

      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};

export default Product;
