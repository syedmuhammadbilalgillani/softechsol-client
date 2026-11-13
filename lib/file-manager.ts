import logger from "@/lib/logger";
import { existsSync } from "fs";
import { mkdir, unlink, writeFile } from "fs/promises";
import path from "path";

const STORAGE_BASE = process.env.STORAGE_BASE_PATH
  ? process.env.STORAGE_BASE_PATH
  : path.join(process.cwd(), "public", "storage");

export interface UploadResult {
  url: string;
  path: string;
  filename: string;
}

const ALLOWED_EXTENSIONS = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".avif",
  ".svg",
]);

export async function ensureFolder(folderPath: string): Promise<string> {
  try {
    const fullPath = path.join(STORAGE_BASE, folderPath);
    if (!existsSync(fullPath)) {
      await mkdir(fullPath, { recursive: true });
    }
    return fullPath;
  } catch (error: unknown) {
    logger.error(error, "Error ensuring folder");
    throw error;
  }
}

export function getStorageUrl(relativePath: string): string {
  const cleanPath = relativePath.replace(/^\//, "");
  return `/storage/${cleanPath}`;
}

export async function uploadImage(
  file: File,
  folder: string = "general",
  filename?: string
): Promise<UploadResult> {
  try {
    const fileExt = path.extname(file.name).toLowerCase();
    if (!ALLOWED_EXTENSIONS.has(fileExt)) {
      throw new Error(`Invalid file type ${fileExt}. Allowed: ${Array.from(ALLOWED_EXTENSIONS).join(", ")}`);
    }

    const folderPath = await ensureFolder(folder);
    const baseName =
      filename || `${Date.now()}-${Math.random().toString(36).substring(7)}`;
    const finalFilename = `${baseName}${fileExt}`;
    const filePath = path.join(folderPath, finalFilename);

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    await writeFile(filePath, buffer);

    const relativePath = `${folder}/${finalFilename}`;
    const url = getStorageUrl(relativePath);

    return {
      url,
      path: filePath,
      filename: finalFilename,
    };
  } catch (error: unknown) {
    logger.error(error, "Error uploading image");
    throw error;
  }
}

export async function deleteImage(url: string): Promise<boolean> {
  try {
    const relativePath = url.replace(/^\/api\/storage\//, "").replace(/^\/storage\//, "");
    const safeBase = path.resolve(STORAGE_BASE);
    const filePath = path.resolve(safeBase, relativePath);

    if (!filePath.startsWith(safeBase)) {
      throw new Error("Invalid file path traversal");
    }

    if (existsSync(filePath)) {
      await unlink(filePath);
      return true;
    }
    return false;
  } catch (error: unknown) {
    logger.error(error, "Error deleting image");
    return false;
  }
}

export async function updateImage(
  newFile: File,
  oldUrl: string | null | undefined,
  folder: string = "general",
  filename?: string
): Promise<UploadResult> {
  try {
    if (oldUrl) {
      try {
        await deleteImage(oldUrl);
      } catch (error: unknown) {
        logger.warn(error, "Failed to delete old image during update");
      }
    }
    return await uploadImage(newFile, folder, filename);
  } catch (error: unknown) {
    logger.error(error, "Error updating image");
    throw error;
  }
}

