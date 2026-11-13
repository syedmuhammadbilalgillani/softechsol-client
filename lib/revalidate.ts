import { revalidateTag as nextRevalidateTag, revalidatePath as nextRevalidatePath } from "next/cache";
import logger from "@/lib/logger";

/**
 * Revalidates a cache tag natively in Next.js
 */
export async function revalidateTag(tag: string): Promise<boolean> {
  try {
    if (typeof (nextRevalidateTag as any) === "function") {
      // Next.js 16 requires tag and profile/config
      (nextRevalidateTag as any)(tag, "default");
    }
    logger.info(`Natively revalidated cache tag: ${tag}`);
    return true;
  } catch (error) {
    logger.error(error, `Error revalidating tag: ${tag}`);
    return false;
  }
}

/**
 * Revalidates a path natively in Next.js
 */
export async function revalidatePath(path: string): Promise<boolean> {
  try {
    nextRevalidatePath(path);
    logger.info(`Natively revalidated path: ${path}`);
    return true;
  } catch (error) {
    logger.error(error, `Error revalidating path: ${path}`);
    return false;
  }
}
