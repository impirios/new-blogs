import { notFound } from "next/navigation";
import Link from "next/link";
import { getPostBySlug, getAllSlugs } from "@/lib/blog";
import { MarkdownRenderer } from "./markdown-renderer";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: `${post.title} — Blog`,
    description: post.description,
  };
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPost({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  return (
    <article>
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-sm text-neutral-400 hover:text-neutral-600 dark:text-neutral-500 dark:hover:text-neutral-300 transition-colors mb-10"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          className="mt-px"
        >
          <path
            d="M10 12L6 8L10 4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Back to all posts
      </Link>

      <header className="mb-10">
        <div className="flex items-center gap-3 text-sm text-neutral-400 dark:text-neutral-500">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span>·</span>
          <span>{post.readTime}</span>
        </div>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 leading-tight">
          {post.title}
        </h1>
        <p className="mt-4 text-lg text-neutral-500 dark:text-neutral-400 leading-relaxed">
          {post.description}
        </p>
        <div className="mt-6 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-900 dark:bg-neutral-100 text-sm font-semibold text-white dark:text-neutral-900">
            {post.author
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
          <div>
            <div className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
              {post.author}
            </div>
            <div className="text-sm text-neutral-400 dark:text-neutral-500">
              {formatDate(post.date)}
            </div>
          </div>
        </div>
      </header>

      <hr className="mb-10 border-neutral-100 dark:border-neutral-800" />

      <div className="prose">
        <MarkdownRenderer content={post.content} />
      </div>

      <div className="mt-12 flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400"
          >
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}
