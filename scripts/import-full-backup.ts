import "dotenv/config";
import { PrismaClient } from "@/app/generated/prisma/client";
import AdmZip from "adm-zip";
import path from "path";
import { existsSync } from "fs";
import { mkdir, readFile, writeFile } from "fs/promises";

async function importFullBackup() {
  const startTime = Date.now();
  console.log("==================================================");
  console.log("🚀 Starting Full Database & Assets Import");
  console.log("==================================================");

  if (!process.env.DATABASE_URL) {
    console.error("❌ Error: DATABASE_URL environment variable is not set.");
    process.exit(1);
  }

  // Determine input backup file path
  let inputPath = process.argv[2];
  if (!inputPath) {
    // Default fallbacks to check
    const fallbacks = [
      path.resolve(process.cwd(), "..", "company-site", "backups", "latest-backup.zip"),
      path.resolve(process.cwd(), "backups", "latest-backup.zip"),
    ];

    for (const fb of fallbacks) {
      if (existsSync(fb)) {
        inputPath = fb;
        break;
      }
    }
  }

  if (!inputPath || !existsSync(inputPath)) {
    console.error(
      `❌ Error: Backup file not found. Usage: pnpm import-backup <path-to-zip-or-json>\nChecked: ${inputPath || "no path specified"}`
    );
    process.exit(1);
  }

  console.log(`📂 Using backup archive: ${inputPath}`);

  let backupData: any = null;
  let assetsCount = 0;

  const targetStoragePath = process.env.STORAGE_BASE_PATH
    ? path.resolve(process.env.STORAGE_BASE_PATH)
    : path.join(process.cwd(), "public", "storage");

  if (inputPath.endsWith(".zip")) {
    console.log("📦 Reading ZIP archive...");
    const zip = new AdmZip(inputPath);

    // Find database.json
    const dbEntry =
      zip.getEntry("database.json") ||
      zip
        .getEntries()
        .find(
          (e) =>
            e.entryName.endsWith(".json") && !e.entryName.includes("manifest")
        );

    if (!dbEntry) {
      console.error("❌ Error: database.json not found inside zip archive.");
      process.exit(1);
    }

    try {
      backupData = JSON.parse(zip.readAsText(dbEntry));
    } catch (e: any) {
      console.error("❌ Error parsing database.json:", e.message);
      process.exit(1);
    }

    // Extract storage assets
    console.log(`🖼️ Extracting assets to: ${targetStoragePath}`);
    await mkdir(targetStoragePath, { recursive: true });

    for (const entry of zip.getEntries()) {
      if (entry.entryName.startsWith("storage/") && !entry.isDirectory) {
        const relativeName = entry.entryName.replace(/^storage\//, "");
        const outPath = path.join(targetStoragePath, relativeName);
        await mkdir(path.dirname(outPath), { recursive: true });
        await writeFile(outPath, entry.getData());
        assetsCount++;
      }
    }
    console.log(`✅ Extracted ${assetsCount} physical assets.`);
  } else if (inputPath.endsWith(".json")) {
    console.log("📄 Reading JSON dump file...");
    const content = await readFile(inputPath, "utf-8");
    backupData = JSON.parse(content);
  } else {
    console.error("❌ Error: Unsupported file format. Please provide a .zip or .json file.");
    process.exit(1);
  }

  if (!backupData || !backupData.data) {
    console.error("❌ Error: Invalid backup data structure. Expected 'data' object.");
    process.exit(1);
  }

  const prisma = new PrismaClient({
    datasources: { db: { url: process.env.DATABASE_URL } },
    log: ["error"],
  });

  try {
    console.log("\n🔄 Restoring database records in dependency order (Transaction)...");

    const result = await prisma.$transaction(
      async (tx) => {
        const importResults = {
          created: {} as Record<string, number>,
          errors: [] as string[],
        };

        // 1. Clear existing data in reverse dependency order
        console.log("  Clearing existing tables in reverse dependency order...");
        await tx.contactUs.deleteMany({});
        await tx.blogCategoryRelation.deleteMany({});
        await tx.jobCategoryRelation.deleteMany({});
        await tx.blog.deleteMany({});
        await tx.job.deleteMany({});
        await tx.jobCategory.deleteMany({});
        await tx.service.deleteMany({});
        await tx.serviceCategory.deleteMany({});
        await tx.team.deleteMany({});
        await tx.podcast.deleteMany({});
        await tx.myCompanies.deleteMany({});
        await tx.project.deleteMany({});
        await tx.blogCategory.deleteMany({});
        await tx.user.deleteMany({});
        await tx.galleryItem.deleteMany({});

        // 2. Import Gallery Items
        if (backupData.data.galleryItems?.length > 0) {
          for (const item of backupData.data.galleryItems) {
            try {
              await tx.galleryItem.create({
                data: {
                  id: item.id,
                  url: item.url,
                  altText: item.altText,
                  createdAt: new Date(item.createdAt),
                  updatedAt: new Date(item.updatedAt),
                },
              });
            } catch (err: any) {
              importResults.errors.push(`GalleryItem ${item.id}: ${err.message}`);
            }
          }
          importResults.created.galleryItems = backupData.data.galleryItems.length;
        }

        // 3. Import Users
        if (backupData.data.users?.length > 0) {
          for (const user of backupData.data.users) {
            try {
              await tx.user.create({
                data: {
                  user_id: user.user_id,
                  username: user.username || user.email.split("@")[0],
                  email: user.email,
                  password: user.password,
                  role: user.role || "EDITOR",
                  first_name: user.first_name || null,
                  last_name: user.last_name || null,
                  avatar_id: user.avatar_id || null,
                  is_active: user.is_active !== undefined ? user.is_active : true,
                  last_login: user.last_login ? new Date(user.last_login) : null,
                  created_at: new Date(user.created_at),
                  updated_at: new Date(user.updated_at),
                },
              });
            } catch (err: any) {
              importResults.errors.push(`User ${user.email}: ${err.message}`);
            }
          }
          importResults.created.users = backupData.data.users.length;
        }

        // 4. Import Blog Categories
        if (backupData.data.blogCategories?.length > 0) {
          for (const cat of backupData.data.blogCategories) {
            try {
              await tx.blogCategory.create({
                data: {
                  category_id: cat.category_id,
                  slug: cat.slug,
                  name: cat.name,
                  description: cat.description,
                  parent_id: cat.parent_id,
                  color: cat.color,
                  icon: cat.icon,
                  meta_title: cat.meta_title,
                  meta_description: cat.meta_description,
                  is_active: cat.is_active,
                  created_at: new Date(cat.created_at),
                  updated_at: new Date(cat.updated_at),
                },
              });
            } catch (err: any) {
              importResults.errors.push(`BlogCategory ${cat.slug}: ${err.message}`);
            }
          }
          importResults.created.blogCategories = backupData.data.blogCategories.length;
        }

        // 5. Import Service Categories
        if (backupData.data.serviceCategories?.length > 0) {
          for (const sc of backupData.data.serviceCategories) {
            try {
              await tx.serviceCategory.create({
                data: {
                  id: sc.id,
                  slug: sc.slug,
                  name: sc.name,
                  description: sc.description || "",
                  shortDescription: sc.shortDescription || null,
                  image_id: sc.image_id || sc.imageId || null,
                  createdAt: new Date(sc.createdAt),
                  updatedAt: new Date(sc.updatedAt),
                },
              });
            } catch (err: any) {
              importResults.errors.push(`ServiceCategory ${sc.slug}: ${err.message}`);
            }
          }
          importResults.created.serviceCategories = backupData.data.serviceCategories.length;
        }

        // 6. Import Services
        if (backupData.data.services?.length > 0) {
          for (const s of backupData.data.services) {
            try {
              await tx.service.create({
                data: {
                  id: s.id,
                  title: s.title,
                  description: s.description || null,
                  image_id: s.image_id || s.imageId || null,
                  categoryId: s.categoryId,
                  createdAt: new Date(s.createdAt),
                  updatedAt: new Date(s.updatedAt),
                },
              });
            } catch (err: any) {
              importResults.errors.push(`Service ${s.title}: ${err.message}`);
            }
          }
          importResults.created.services = backupData.data.services.length;
        }

        // 7. Import Teams
        if (backupData.data.teams?.length > 0) {
          for (const t of backupData.data.teams) {
            try {
              await tx.team.create({
                data: {
                  id: t.id,
                  title: t.title,
                  position: t.position,
                  description: t.description || null,
                  linkedinUrl: t.linkedinUrl || null,
                  twitterUrl: t.twitterUrl || null,
                  facebookUrl: t.facebookUrl || null,
                  instagramUrl: t.instagramUrl || null,
                  githubUrl: t.githubUrl || null,
                  websiteUrl: t.websiteUrl || null,
                  featured_image_id: t.featured_image_id || t.featuredImageId || null,
                  createdAt: new Date(t.createdAt),
                  updatedAt: new Date(t.updatedAt),
                },
              });
            } catch (err: any) {
              importResults.errors.push(`Team ${t.title}: ${err.message}`);
            }
          }
          importResults.created.teams = backupData.data.teams.length;
        }

        // 8. Import Podcasts
        if (backupData.data.podcasts?.length > 0) {
          for (const p of backupData.data.podcasts) {
            try {
              await tx.podcast.create({
                data: {
                  id: p.id,
                  title: p.title,
                  description: p.description,
                  url: p.url,
                  image_id: p.image_id,
                  status: p.status,
                  is_featured: p.is_featured,
                  publish_date: p.publish_date ? new Date(p.publish_date) : null,
                  created_at: new Date(p.created_at),
                  updated_at: new Date(p.updated_at),
                },
              });
            } catch (err: any) {
              importResults.errors.push(`Podcast ${p.title}: ${err.message}`);
            }
          }
          importResults.created.podcasts = backupData.data.podcasts.length;
        }

        // 9. Import Companies
        if (backupData.data.companies?.length > 0) {
          for (const c of backupData.data.companies) {
            try {
              await tx.myCompanies.create({
                data: {
                  company_id: c.company_id,
                  featured_image_id: c.featured_image_id,
                },
              });
            } catch (err: any) {
              importResults.errors.push(`Company ${c.company_id}: ${err.message}`);
            }
          }
          importResults.created.companies = backupData.data.companies.length;
        }

        // 10. Import Projects
        if (backupData.data.projects?.length > 0) {
          for (const p of backupData.data.projects) {
            try {
              await tx.project.create({
                data: {
                  project_id: p.project_id,
                  title: p.title,
                  url: p.url || p.website_url || null,
                  image_id: p.image_id || null,
                  description: p.description || null,
                  status: p.status || "DRAFT",
                  technologies: Array.isArray(p.technologies) ? p.technologies : [],
                  created_at: new Date(p.created_at),
                  updated_at: new Date(p.updated_at),
                },
              });
            } catch (err: any) {
              importResults.errors.push(`Project ${p.title}: ${err.message}`);
            }
          }
          importResults.created.projects = backupData.data.projects.length;
        }

        // 11. Import Blogs
        if (backupData.data.blogs?.length > 0) {
          for (const b of backupData.data.blogs) {
            try {
              await tx.blog.create({
                data: {
                  blog_id: b.blog_id,
                  slug: b.slug,
                  title: b.title,
                  content: b.content,
                  excerpt: b.excerpt,
                  author_id: b.author_id,
                  featured_image_id: b.featured_image_id,
                  status: b.status,
                  is_featured: b.is_featured !== undefined ? b.is_featured : false,
                  meta_title: b.meta_title,
                  meta_description: b.meta_description,
                  meta_keywords: b.meta_keywords,
                  og_image_id: b.og_image_id,
                  publish_date: b.publish_date ? new Date(b.publish_date) : null,
                  created_at: new Date(b.created_at),
                  updated_at: new Date(b.updated_at),
                },
              });
            } catch (err: any) {
              importResults.errors.push(`Blog ${b.slug}: ${err.message}`);
            }
          }
          importResults.created.blogs = backupData.data.blogs.length;
        }

        // 12. Import Blog Category Relations
        if (backupData.data.blogCategoryRelations?.length > 0) {
          for (const r of backupData.data.blogCategoryRelations) {
            try {
              await tx.blogCategoryRelation.create({
                data: {
                  blog_id: r.blog_id,
                  category_id: r.category_id,
                  assigned_at: new Date(r.assigned_at),
                },
              });
            } catch (err: any) {
              importResults.errors.push(`BlogCatRelation ${r.blog_id}-${r.category_id}: ${err.message}`);
            }
          }
          importResults.created.blogCategoryRelations = backupData.data.blogCategoryRelations.length;
        }

        // 13. Import Job Categories
        if (backupData.data.jobCategories?.length > 0) {
          for (const jc of backupData.data.jobCategories) {
            try {
              await tx.jobCategory.create({
                data: {
                  category_id: jc.category_id,
                  slug: jc.slug,
                  name: jc.name,
                  created_at: new Date(jc.created_at),
                  updated_at: new Date(jc.updated_at),
                },
              });
            } catch (err: any) {
              importResults.errors.push(`JobCategory ${jc.slug}: ${err.message}`);
            }
          }
          importResults.created.jobCategories = backupData.data.jobCategories.length;
        }

        // 14. Import Jobs
        if (backupData.data.jobs?.length > 0) {
          for (const j of backupData.data.jobs) {
            try {
              await tx.job.create({
                data: {
                  job_id: j.job_id,
                  title: j.title,
                  slug: j.slug,
                  description: j.description,
                  requirements: j.requirements,
                  responsibilities: j.responsibilities,
                  location: j.location,
                  job_type: j.job_type,
                  salary_min: j.salary_min,
                  salary_max: j.salary_max,
                  salary_currency: j.salary_currency,
                  experience_level: j.experience_level,
                  status: j.status,
                  is_featured: j.is_featured,
                  application_url: j.application_url,
                  application_email: j.application_email,
                  publish_date: j.publish_date ? new Date(j.publish_date) : null,
                  expiry_date: j.expiry_date ? new Date(j.expiry_date) : null,
                  created_at: new Date(j.created_at),
                  updated_at: new Date(j.updated_at),
                  meta_title: j.meta_title,
                  meta_description: j.meta_description,
                  meta_keywords: j.meta_keywords,
                },
              });
            } catch (err: any) {
              importResults.errors.push(`Job ${j.slug}: ${err.message}`);
            }
          }
          importResults.created.jobs = backupData.data.jobs.length;
        }

        // 15. Import Job Category Relations
        if (backupData.data.jobCategoryRelations?.length > 0) {
          for (const r of backupData.data.jobCategoryRelations) {
            try {
              await tx.jobCategoryRelation.create({
                data: {
                  job_id: r.job_id,
                  category_id: r.category_id,
                  assigned_at: new Date(r.assigned_at),
                },
              });
            } catch (err: any) {
              importResults.errors.push(`JobCatRelation ${r.job_id}-${r.category_id}: ${err.message}`);
            }
          }
          importResults.created.jobCategoryRelations = backupData.data.jobCategoryRelations.length;
        }

        // 16. Import Contact Us
        if (backupData.data.contactUs?.length > 0) {
          const contactData = backupData.data.contactUs.map((c: any) => ({
            contact_id: c.contact_id,
            name: c.name,
            email: c.email,
            phone: c.phone || null,
            service_id: c.service_id || null,
            status: c.status || "NEW",
            submitted_at: new Date(c.submitted_at),
            responded_at: c.responded_at ? new Date(c.responded_at) : null,
            notes: c.notes || null,
          }));
          await tx.contactUs.createMany({
            data: contactData,
            skipDuplicates: true,
          });
          importResults.created.contactUs = contactData.length;
        }

        return importResults;
      },
      { timeout: 300000, maxWait: 60000 }
    );

    const totalCreated = Object.values(result.created).reduce(
      (sum, count) => sum + count,
      0
    );
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);

    console.log("\n==================================================");
    console.log("🎉 DATABASE & ASSETS IMPORT COMPLETED SUCCESSFULLY!");
    console.log("==================================================");
    console.log(`📊 Records Created:  ${totalCreated}`);
    console.log(`🖼️ Assets Extracted: ${assetsCount}`);
    console.log(`⏱️ Duration:         ${duration}s`);
    if (result.errors.length > 0) {
      console.log(`⚠️ Errors / Warnings: ${result.errors.length}`);
      console.table(result.errors.slice(0, 10));
    }
    console.table(result.created);
    console.log("==================================================\n");
  } catch (error) {
    console.error("❌ Import failed:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

importFullBackup();
