import React, { useEffect, useMemo, useState } from "react";

import type { BlogPost } from "../types";

type BlogStatus = "loading" | "success" | "empty" | "error";

interface BlogApiResponse {
  posts: BlogPost[];
  profileUrl: string;
  error?: string;
}

const FALLBACK_MEDIUM_URL = "https://medium.com/@devanshuparmar04";
const DESCRIPTION_LIMIT = 100;

function formatDate(value: string) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function BlogMessage({ children }: { children: React.ReactNode }) {
  return (
    <div className="border border-zinc-200/70 rounded-lg px-4 py-4 text-[13px] text-zinc-500 leading-relaxed">
      {children}
    </div>
  );
}

function truncateText(value: string, maxLength: number) {
  if (value.length <= maxLength) return value;
  return `${value.slice(0, maxLength).trim()}...`;
}

function BlogCard({ post }: { post: BlogPost }) {
  return (
    <a
      href={post.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group block rounded border border-zinc-300 bg-white p-3 transition-colors duration-200 hover:border-zinc-900 hover:bg-zinc-50/60"
    >
      {post.imageUrl && (
        <div className="mb-3 overflow-hidden rounded-sm border border-zinc-800 bg-zinc-50">
          <img
            src={post.imageUrl}
            alt=""
            loading="lazy"
            className="aspect-[16/7] w-full object-cover transition-transform duration-200 group-hover:scale-[1.02]"
          />
        </div>
      )}

      <div className="mb-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] font-medium text-zinc-400">
        <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
        <span>{post.readingTime}</span>
      </div>

      <h3 className="text-[13px] font-semibold leading-snug tracking-tight text-zinc-900 transition-colors duration-200 group-hover:text-zinc-700">
        {post.title}
      </h3>

      <p className="mt-1.5 text-[12px] leading-relaxed text-zinc-500">
        {truncateText(post.excerpt, DESCRIPTION_LIMIT)}
      </p>
    </a>
  );
}

export default function BlogSection() {
  const [status, setStatus] = useState<BlogStatus>("loading");
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [mediumUrl, setMediumUrl] = useState(FALLBACK_MEDIUM_URL);

  useEffect(() => {
    const controller = new AbortController();

    async function loadBlogs() {
      try {
        const response = await fetch("/api/blogs", {
          signal: controller.signal,
          headers: {
            Accept: "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Unable to fetch blog posts");
        }

        const data = (await response.json()) as BlogApiResponse;
        setPosts(data.posts || []);
        setMediumUrl(data.profileUrl || FALLBACK_MEDIUM_URL);
        setStatus(data.posts?.length ? "success" : "empty");
      } catch (error) {
        if (controller.signal.aborted) return;
        setStatus("error");
      }
    }

    void loadBlogs();

    return () => controller.abort();
  }, []);

  const visiblePosts = useMemo(() => posts.slice(0, 6), [posts]);

  return (
    <section id="section-writing" className="scroll-mt-24">
      <div className="mb-5">
        <h2 id="heading-writing" className="text-[15px] font-semibold tracking-tight text-zinc-900 mb-2">
          Writing
        </h2>
      </div>

      {status === "loading" && <BlogMessage>Loading latest article...</BlogMessage>}

      {status === "error" && (
        <BlogMessage>Latest articles are unavailable right now. You can still read everything on Medium.</BlogMessage>
      )}

      {status === "empty" && <BlogMessage>No blog posts are available yet.</BlogMessage>}

      {status === "success" && (
        <div id="blog-card-grid" className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {visiblePosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      )}

      <a
        id="writing-medium-link"
        href={mediumUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-block text-[13px] font-medium text-zinc-600 transition-colors duration-200 hover:text-zinc-900"
      >
        View all articles on Medium →
      </a>
    </section>
  );
}
