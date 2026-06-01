import { fetchMediumPosts } from "../server/blogs";

export default async function handler(req: any, res: any) {
  try {
    const data = await fetchMediumPosts();

    res.status(200).json(data);
  } catch (error) {
    res.status(502).json({
      posts: [],
      profileUrl: "https://medium.com/@devanshuparmar04",
      error:
        error instanceof Error
          ? error.message
          : "Unable to fetch Medium RSS feed",
    });
  }
}