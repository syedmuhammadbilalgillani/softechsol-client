import { unstable_cache } from "next/cache";
import logger from "./logger";
import axios from "axios";
import prisma from "./prisma";

// ——— Config ————————————————————————————————————————————————
export const REVALIDATE_SECONDS = 10;

// ——— Helpers ————————————————————————————————————————————————
const num = (v?: number) => (typeof v === "number" ? v : undefined);
const str = (v?: string) => (typeof v === "string" && v.trim() ? v : undefined);

const buildParams = <T extends Record<string, unknown>>(obj: T) =>
  Object.fromEntries(
    Object.entries(obj).filter(([, v]) => v !== undefined)
  ) as Record<string, string | number>;

async function safeGet<T>(
  url: string,
  params?: Record<string, any>,
  label?: string,
  token?: string
): Promise<T | null> {
  try {
    logger.debug(url, "url");
    logger.debug(params, "params");
    logger.debug(label, "label");
    logger.debug(token, "token");
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
      params,
      ...(token ? { headers: { Authorization: `Bearer ${token}` } } : {}),
    });
    logger.info(res, label);
    return res?.data ?? null;
  } catch (error) {
    logger.error(error, `${label} failed`);
    return null;
  }
}

export const fetchTeams = unstable_cache(
  async () =>
    await prisma.team.findMany({
      include: {
        featured_image: true,
      },
    }),
  ["teams"],
  { revalidate: REVALIDATE_SECONDS, tags: ["teams"] }
);
