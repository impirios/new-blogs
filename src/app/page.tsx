import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function Home() {
  const posts = getAllPosts();

  return (
    <div>
      <section className="mb-16">
        <h1 className="text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
          Writing
        </h1>
        <p className="mt-3 text-lg text-neutral-500 dark:text-neutral-400">
          Thoughts on JavaScript, design patterns, and building software.
        </p>
      </section>

      <section className="flex flex-col divide-y divide-neutral-100 dark:divide-neutral-800">
        {posts.map((post) => (
          <article key={post.slug} className="py-8 first:pt-0 last:pb-0">
            <Link href={`/blog/${post.slug}`} className="group block">
              <div className="flex items-center gap-3 text-sm text-neutral-400 dark:text-neutral-500">
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                <span>·</span>
                <span>{post.readTime}</span>
              </div>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-neutral-900 group-hover:text-neutral-600 dark:text-neutral-100 dark:group-hover:text-neutral-300 transition-colors">
                {post.title}
              </h2>
              <p className="mt-2 text-base leading-relaxed text-neutral-500 dark:text-neutral-400 line-clamp-2">
                {post.description}
              </p>
              <div className="mt-4 flex gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          </article>
        ))}
      </section>
    </div>
  );
}
