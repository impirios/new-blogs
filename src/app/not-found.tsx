import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <h1 className="text-6xl font-bold text-neutral-900 dark:text-neutral-100">
        404
      </h1>
      <p className="mt-4 text-lg text-neutral-500 dark:text-neutral-400">
        This page doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="mt-8 text-sm text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors underline underline-offset-4"
      >
        Back to home
      </Link>
    </div>
  );
}
