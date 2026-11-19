import "dotenv/config";
import prisma from "@/lib/prisma";

async function fixAllSequences() {
  console.log("==================================================");
  console.log("Fixing PostgreSQL Auto-Increment Sequences...");
  console.log("==================================================");

  const tables = [
    { table: "ContactUs", col: "contact_id" },
    { table: "User", col: "user_id" },
    { table: "Blog", col: "blog_id" },
    { table: "BlogCategory", col: "category_id" },
    { table: "Job", col: "job_id" },
    { table: "JobCategory", col: "category_id" },
    { table: "Project", col: "project_id" },
    { table: "Team", col: "id" },
    { table: "MyCompanies", col: "company_id" },
  ];

  for (const { table, col } of tables) {
    try {
      const query = `
        SELECT setval(
          pg_get_serial_sequence('"${table}"', '${col}'),
          COALESCE((SELECT MAX("${col}") FROM "${table}"), 1)
        );
      `;
      const res: any = await prisma.$queryRawUnsafe(query);
      console.log(`[OK] Synced sequence for "${table}"."${col}" -> value:`, res[0]?.setval);
    } catch (err: any) {
      console.warn(`[WARN] Could not sync sequence for "${table}"."${col}":`, err.message);
    }
  }

  console.log("==================================================");
  console.log("All PostgreSQL sequences synced successfully!");
  console.log("==================================================");
}

fixAllSequences()
  .catch((err) => {
    console.error("Fatal error fixing sequences:", err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
