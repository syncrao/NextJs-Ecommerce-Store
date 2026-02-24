import { Suspense } from "react";
import OrderSuccessClient from "./OrderSuccessClient";

export default function Page() {
  return (
    <Suspense fallback={<p>Loading order...</p>}>
      <OrderSuccessClient />
    </Suspense>
  );
}