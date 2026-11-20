import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/ui/PageHero";
import { getArticle, getArticles } from "@/services/catalog";

type Params = { slug: string };

export function generateStaticParams() {
  return getArticles().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  return { title: article?.title || "Article", description: article?.excerpt };
}

export default async function ArticlePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();
  return (
    <>
      <PageHero title={article.title} subtitle={`${article.date} · ${article.readTime} · ${article.author}`} items={[{ label: "Home", href: "/" }, { label: "Journal", href: "/blog" }, { label: article.title }]} />
      <article className="container-page max-w-3xl py-12">
        <div className="relative mb-8 aspect-[16/8] overflow-hidden rounded-3xl">
          <Image src={article.image} alt="" fill className="object-cover" priority sizes="800px" />
        </div>
        <div className="space-y-4 text-base leading-8 text-ink">
          {article.content.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
      </article>
    </>
  );
}
