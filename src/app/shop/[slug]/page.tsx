import type { Metadata } from "next";
import { ProductDetail } from "@/components/interactive/Interactive";
import { getProduct, getProducts } from "@/services/catalog";

type Params = { slug: string };

export function generateStaticParams() {
  return getProducts().map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  return { title: product?.name || "Accessory", description: product?.description };
}

export default async function ProductPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  return (
    <div className="container-page py-12">
      <ProductDetail slug={slug} />
    </div>
  );
}
