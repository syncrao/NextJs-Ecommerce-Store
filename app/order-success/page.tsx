"use client";
export const dynamic = "force-dynamic";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function OrderSuccessPage() {
  const searchParams = useSearchParams();
  const txn = searchParams.get("txn");

  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    if (!txn) return;

    const fetchOrder = async () => {
      try {
        const res = await fetch("/api/order/get-by-payment-id", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ paymentId: txn }),
        });

        if (!res.ok) throw new Error("API failed");

        const data = await res.json();
        setOrder(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchOrder();
  }, [txn]);

  if (!txn) return <p>No transaction ID found</p>;
  if (!order || !order.items) return <p>Loading...</p>;

  return (
    <div>
      <h1>Order Success ✅</h1>
      <p><strong>Transaction ID:</strong> {order.paymentId}</p>
      <p><strong>Status:</strong> {order.status}</p>
      <p><strong>Total:</strong> ₹{order.totalPrice}</p>

      <h3>Items:</h3>
      {order.items.map((item: any, index: number) => (
        <div key={index}>
          <p>Name: {item.name}</p>
          <p>Color: {item.color}</p>
          <p>Size: {item.size}</p>
          <p>Qty: {item.qty}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}