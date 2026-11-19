import "dotenv/config";
import { PrismaClient } from "@/app/generated/prisma/client";
import AdmZip from "adm-zip";
import path from "path";
import { existsSync } from "fs";
import { mkdir, writeFile } from "fs/promises";

async function exportFullBackup() {
  const startTime = Date.now();
  console.log("==================================================");
  console.log("[INFO] Starting Full Database & Assets Export");
  console.log("==================================================");

  if (!process.env.DATABASE_URL) {
    console.error("[ERROR] DATABASE_URL environment variable is not set.");
    process.exit(1);
  }

  const prisma = new PrismaClient({
    datasources: { db: { url: process.env.DATABASE_URL } },
    log: ["error"],
  });

  try {
    console.log("[INFO] Connecting to database...");
    await prisma.$connect();
    console.log("[INFO] Fetching all database records in dependency order...");

    const galleryItems = await prisma.galleryItem.findMany({
      orderBy: { createdAt: "asc" },
    });
    const users = await prisma.user.findMany({
      orderBy: { created_at: "asc" },
    });
    const blogCategories = await prisma.blogCategory.findMany({
      orderBy: { created_at: "asc" },
    });
    const teams = await prisma.team.findMany({ orderBy: { createdAt: "asc" } });
    const podcasts = await prisma.podcast.findMany({
      orderBy: { created_at: "asc" },
    });
    const companies = await prisma.myCompanies.findMany({
      orderBy: { company_id: "asc" },
    });
    const projects = await prisma.project.findMany({
      orderBy: { created_at: "asc" },
    });
    const blogs = await prisma.blog.findMany({
      orderBy: { created_at: "asc" },
    });
    const blogCategoryRelations = await prisma.blogCategoryRelation.findMany({
      orderBy: { assigned_at: "asc" },
    });
    const jobCategories = await prisma.jobCategory.findMany({
      orderBy: { created_at: "asc" },
    });
    const jobs = await prisma.job.findMany({ orderBy: { created_at: "asc" } });
    const jobCategoryRelations = await prisma.jobCategoryRelation.findMany({
      orderBy: { assigned_at: "asc" },
    });
    const contactUs = await prisma.contactUs.findMany({
      orderBy: { submitted_at: "asc" },
    });

    const backupData = {
      version: "2.0",
      exportedAt: new Date().toISOString(),
      exportedBy: "cli-migration-script",
      data: {
        galleryItems,
        users,
        blogCategories,
        teams,
        podcasts,
        companies,
        projects,
        blogs,
        blogCategoryRelations,
        jobCategories,
        jobs,
        jobCategoryRelations,
        contactUs,
      },
    };

    const recordCounts: Record<string, number> = {
      galleryItems: galleryItems.length,
      users: users.length,
      blogCategories: blogCategories.length,
      teams: teams.length,
      podcasts: podcasts.length,
      companies: companies.length,
      projects: projects.length,
      blogs: blogs.length,
      blogCategoryRelations: blogCategoryRelations.length,
      jobCategories: jobCategories.length,
      jobs: jobs.length,
      jobCategoryRelations: jobCategoryRelations.length,
      contactUs: contactUs.length,
    };

    const totalRecords = Object.values(recordCounts).reduce(
      (sum, count) => sum + count,
      0,
    );

    console.log(
      `\n[OK] Database export complete: ${totalRecords} total records found across 15 models.`,
    );
    console.table(recordCounts);

    // Setup output directory
    const outputDir = path.join(process.cwd(), "backups");
    await mkdir(outputDir, { recursive: true });

    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const zipPath = path.join(outputDir, `full-backup-${timestamp}.zip`);
    const jsonPath = path.join(outputDir, `db-backup-${timestamp}.json`);
    const latestZipPath = path.join(outputDir, `latest-backup.zip`);

    // Write raw JSON backup
    const jsonBuffer = Buffer.from(
      JSON.stringify(backupData, null, 2),
      "utf-8",
    );
    await writeFile(jsonPath, jsonBuffer);
    console.log(`[FILE] Saved JSON dump to: ${jsonPath}`);

    const storagePath = process.env.STORAGE_BASE_PATH
      ? path.resolve(process.env.STORAGE_BASE_PATH)
      : path.join(process.cwd(), "public", "storage");

    // Ensure all physical assets exist locally (download missing remote assets from live server)
    console.log("\n[INFO] Syncing physical assets from remote server if missing locally...");
    const galleryStorageDir = path.join(storagePath, "gallery");
    await mkdir(galleryStorageDir, { recursive: true });

    let downloadedCount = 0;
    for (const item of galleryItems) {
      if (!item.url) continue;

      let filename = "";
      let downloadUrls: string[] = [];

      if (
        item.url.startsWith("/api/storage/gallery/") ||
        item.url.startsWith("/storage/gallery/")
      ) {
        filename = path.basename(item.url);
        downloadUrls = [
          `https://admin.softechsol.com/api/storage/gallery/${filename}`,
          `https://admin.softechsol.com/storage/gallery/${filename}`,
          `https://softechsol.com/api/storage/gallery/${filename}`,
          `https://softechsol.com/storage/gallery/${filename}`,
        ];
      } else if (
        item.url.startsWith("http://") ||
        item.url.startsWith("https://")
      ) {
        filename = path.basename(new URL(item.url).pathname);
        downloadUrls = [item.url];
      }

      if (filename) {
        const localFilePath = path.join(galleryStorageDir, filename);
        if (!existsSync(localFilePath)) {
          let downloaded = false;
          for (const dUrl of downloadUrls) {
            try {
              const res = await fetch(dUrl, { signal: AbortSignal.timeout(10000) });
              if (res.ok) {
                const arrayBuf = await res.arrayBuffer();
                await writeFile(localFilePath, Buffer.from(arrayBuf));
                downloadedCount++;
                downloaded = true;
                console.log(`  [OK] Downloaded asset: ${filename}`);
                break;
              }
            } catch (err: any) {
              // try next fallback url
            }
          }
          if (!downloaded) {
            console.log(`  [WARN] Could not fetch remote asset: ${filename}`);
          }
        }
      }
    }

    if (downloadedCount > 0) {
      console.log(`[OK] Successfully synced ${downloadedCount} missing assets into local public/storage/gallery!`);
    } else {
      console.log(`[OK] All referenced physical assets already exist locally.`);
    }

    // Create ZIP archive
    console.log("\n[INFO] Packaging ZIP bundle with uploaded assets...");
    const zip = new AdmZip();
    zip.addFile("database.json", jsonBuffer);

    let assetsCount = 0;
    if (existsSync(storagePath)) {
      zip.addLocalFolder(storagePath, "storage");
      assetsCount = zip
        .getEntries()
        .filter(
          (e) => e.entryName.startsWith("storage/") && !e.isDirectory,
        ).length;
      console.log(
        `[INFO] Added ${assetsCount} physical assets from: ${storagePath}`,
      );
    } else {
      console.log(`[WARN] No public/storage folder found at: ${storagePath}`);
    }

    const manifest = {
      version: "2.0",
      type: "full-backup",
      exportedAt: new Date().toISOString(),
      recordCounts,
      totalRecords,
      totalAssets: assetsCount,
    };
    zip.addFile(
      "manifest.json",
      Buffer.from(JSON.stringify(manifest, null, 2), "utf-8"),
    );

    // Write zip to disk
    const zipBuffer = zip.toBuffer();
    await writeFile(zipPath, zipBuffer);
    await writeFile(latestZipPath, zipBuffer);

    const fileSizeMb = (zipBuffer.length / (1024 * 1024)).toFixed(2);
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);

    console.log("\n==================================================");
    console.log("[SUCCESS] FULL BACKUP EXPORT SUCCESSFUL!");
    console.log("==================================================");
    console.log(`Archive Path:    ${zipPath}`);
    console.log(`Latest Shortcut: ${latestZipPath}`);
    console.log(`Archive Size:    ${fileSizeMb} MB`);
    console.log(`Total Records:   ${totalRecords}`);
    console.log(`Total Assets:    ${assetsCount}`);
    console.log(`Duration:        ${duration}s`);
    console.log("==================================================\n");
  } catch (error) {
    console.error("[ERROR] Export failed:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

exportFullBackup();
