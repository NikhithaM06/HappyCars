import type { Metadata } from "next";
import { OrderComplete } from "@/components/interactive/Interactive";

export const metadata: Metadata = { title: "Order noted", description: "Sample accessory order reference." };

export default function OrderPage() {
  return (
    <div className="container-page py-20">
      <OrderComplete />
    </div>
  );
}
