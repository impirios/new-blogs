"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ children }) => (
          <h1 className="mt-10 mb-4 text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
            {children}
          </h1>
        ),
        h2: ({ children }) => (
          <h2 className="mt-10 mb-4 text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 className="mt-8 mb-3 text-xl font-semibold text-neutral-900 dark:text-neutral-100">
            {children}
          </h3>
        ),
        p: ({ children }) => (
          <p className="mb-6 text-lg leading-8 text-neutral-700 dark:text-neutral-300">
            {children}
          </p>
        ),
        ul: ({ children }) => (
          <ul className="mb-6 ml-1 list-disc space-y-2 pl-6 text-lg leading-8 text-neutral-700 dark:text-neutral-300">
            {children}
          </ul>
        ),
        ol: ({ children }) => (
          <ol className="mb-6 ml-1 list-decimal space-y-2 pl-6 text-lg leading-8 text-neutral-700 dark:text-neutral-300">
            {children}
          </ol>
        ),
        li: ({ children }) => <li className="pl-1">{children}</li>,
        blockquote: ({ children }) => (
          <blockquote className="my-6 border-l-4 border-neutral-200 dark:border-neutral-700 pl-6 italic text-neutral-600 dark:text-neutral-400">
            {children}
          </blockquote>
        ),
        a: ({ href, children }) => (
          <a
            href={href}
            className="text-neutral-900 dark:text-neutral-100 underline decoration-neutral-300 dark:decoration-neutral-600 underline-offset-2 hover:decoration-neutral-900 dark:hover:decoration-neutral-300 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            {children}
          </a>
        ),
        code: ({ className, children }) => {
          const isBlock = className?.includes("language-");
          if (isBlock) {
            return (
              <code className={`${className} block`}>
                {children}
              </code>
            );
          }
          return (
            <code className="rounded bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 text-[0.9em] font-mono text-neutral-800 dark:text-neutral-200">
              {children}
            </code>
          );
        },
        pre: ({ children }) => (
          <pre className="my-6 overflow-x-auto rounded-lg bg-neutral-950 p-5 text-sm leading-relaxed text-neutral-200">
            {children}
          </pre>
        ),
        hr: () => <hr className="my-10 border-neutral-200 dark:border-neutral-700" />,
        strong: ({ children }) => (
          <strong className="font-semibold text-neutral-900 dark:text-neutral-100">
            {children}
          </strong>
        ),
        table: ({ children }) => (
          <div className="my-6 overflow-x-auto">
            <table className="w-full text-left text-base">
              {children}
            </table>
          </div>
        ),
        thead: ({ children }) => (
          <thead className="border-b-2 border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 font-semibold">
            {children}
          </thead>
        ),
        tbody: ({ children }) => (
          <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
            {children}
          </tbody>
        ),
        th: ({ children }) => (
          <th className="px-4 py-3 text-sm">{children}</th>
        ),
        td: ({ children }) => (
          <td className="px-4 py-3 text-sm text-neutral-600 dark:text-neutral-400">
            {children}
          </td>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
