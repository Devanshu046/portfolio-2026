import type { IncomingMessage, ServerResponse } from "node:http";
import { XMLParser } from "fast-xml-parser";

import type { BlogPost } from "../src/types";

const DEFAULT_MEDIUM_RSS_URL = "https://medium.com/feed/@devanshuparmar04";
const CACHE_TTL_MS = 1000 * 60 * 15;

interface MediumFeedResponse {
  posts: BlogPost[];
  profileUrl: string;
}

interface CacheEntry {
  data: MediumFeedResponse;
  expiresAt: number;
}

let cache: CacheEntry | null = null;

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "",
  textNodeName: "text",
});

function getMediumRssUrl() {
  return process.env.MEDIUM_RSS_URL || DEFAULT_MEDIUM_RSS_URL;
}

function getMediumProfileUrl(feedUrl: string) {
  return feedUrl.replace("https://medium.com/feed/", "https://medium.com/");
}

function asArray<T>(value: T | T[] | undefined): T[] {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

function decodeHtml(value: string) {
  return value
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function stripHtml(value: string) {
  return decodeHtml(value)
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getText(value: unknown): string {
  if (typeof value === "string") return value;
  if (typeof value === "number") return String(value);
  if (value && typeof value === "object" && "text" in value) {
    const text = (value as { text?: unknown }).text;
    return typeof text === "string" ? text : "";
  }
  return "";
}

function getExcerpt(content: string) {
  const text = stripHtml(content);
  if (text.length <= 210) return text;
  return `${text.slice(0, 207).trim()}...`;
}

function getReadingTime(content: string) {
  const words = stripHtml(content).split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 225));
  return `${minutes} min read`;
}

function getFirstImageUrl(content: string) {
  const imageMatch = content.match(/<img[^>]+src=["']([^"']+)["']/i);
  if (!imageMatch?.[1]) return undefined;
  return decodeHtml(imageMatch[1]);
}

function normalizeItem(item: Record<string, unknown>, index: number): BlogPost | null {
  const title = getText(item.title).trim();
  const link = getText(item.link).trim();
  const publishedAt = getText(item.pubDate || item["dc:date"] || item.date).trim();
  const content = getText(item["content:encoded"] || item.description).trim();

  if (!title || !link) return null;

  return {
    id: getText(item.guid).trim() || link || `medium-post-${index}`,
    title: decodeHtml(title),
    link,
    publishedAt,
    readingTime: getReadingTime(content || title),
    excerpt: getExcerpt(content || title),
    imageUrl: getFirstImageUrl(content),
  };
}

export async function fetchMediumPosts(): Promise<MediumFeedResponse> {
  if (cache && cache.expiresAt > Date.now()) {
    return cache.data;
  }

  const feedUrl = getMediumRssUrl();
  const response = await fetch(feedUrl, {
    headers: {
      Accept: "application/rss+xml, application/xml, text/xml",
      "User-Agent": "minimalist-portfolio/1.0",
    },
  });

  if (!response.ok) {
    throw new Error(`Medium RSS request failed with ${response.status}`);
  }

  const xml = await response.text();
  const parsed = parser.parse(xml);
  const items = asArray<Record<string, unknown>>(parsed?.rss?.channel?.item);
  const posts = items
    .map((item, index) => normalizeItem(item, index))
    .filter((post): post is BlogPost => Boolean(post));

  const data = {
    posts,
    profileUrl: getMediumProfileUrl(feedUrl),
  };

  cache = {
    data,
    expiresAt: Date.now() + CACHE_TTL_MS,
  };

  return data;
}

export async function blogsApiHandler(_req: IncomingMessage, res: ServerResponse) {
  try {
    const data = await fetchMediumPosts();
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(data));
  } catch (error) {
    res.statusCode = 502;
    res.setHeader("Content-Type", "application/json");
    res.end(
      JSON.stringify({
        posts: [],
        profileUrl: getMediumProfileUrl(getMediumRssUrl()),
        error: error instanceof Error ? error.message : "Unable to fetch Medium RSS feed",
      }),
    );
  }
}
