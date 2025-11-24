import logger from "@/lib/logger";
import { revalidateTag } from "next/cache";

export async function POST(req: Request) {
  const { tag } = await req.json();
  logger.info(`Revalidating tag: ${tag}`);
  if (tag) {
    revalidateTag(tag, "max");
    return Response.json({ revalidated: true, now: Date.now() });
  }

  return Response.json({
    revalidated: false,
    now: Date.now(),
    message: "Missing tag to revalidate",
  });
}
