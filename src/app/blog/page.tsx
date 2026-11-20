import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { getArticles } from "@/services/catalog";

export const metadata: Metadata = {
  title: "Journal",
  description: "Buying notes from the Happy Cars inspection floor.",
};

export default function BlogPage() {
  const posts = getArticles();
  return (
    <>
      <PageHero title="Journal" subtitle="Short notes from inspections, finance files, and handover day." items={[{ label: "Home", href: "/" }, { label: "Journal" }]} />
      <div className="container-page grid gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <article key={post.slug} className="overflow-hidden rounded-3xl border border-line bg-white shadow-card">
            <div className="relative aspect-[16/10]">
              <Image src={post.image} alt="" fill className="object-cover" sizes="33vw" />
            </div>
            <div className="p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-gold-dark">{post.category} · {post.readTime}</p>
              <h2 className="mt-2 text-xl font-semibold text-navy"><Link href={`/blog/${post.slug}`}>{post.title}</Link></h2>
              <p className="mt-2 text-sm leading-6 text-ink">{post.excerpt}</p>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
