import { revalidateTag } from "next/cache";

export async function POST(req: Request) {
  const { tag } = await req.json();
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
