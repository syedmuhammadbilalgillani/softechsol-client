import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// GET - List contact inquiries (Authenticated Admin)
export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any)?.role !== "ADMIN" && (session.user as any)?.role !== "EDITOR") {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const search = searchParams.get("search");
    const limit = parseInt(searchParams.get("limit") || "100", 10);
    const skip = parseInt(searchParams.get("skip") || "0", 10);

    const where: any = {};

    if (status && status !== "ALL") {
      where.status = status;
    }

    if (search && search.trim()) {
      const q = search.trim();
      where.OR = [
        { name: { contains: q, mode: "insensitive" } },
        { email: { contains: q, mode: "insensitive" } },
        { phone: { contains: q, mode: "insensitive" } },
        { notes: { contains: q, mode: "insensitive" } },
      ];
    }

    const [contacts, total] = await Promise.all([
      prisma.contactUs.findMany({
        where,
        orderBy: { submitted_at: "desc" },
        take: limit,
        skip,
      }),
      prisma.contactUs.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      contacts,
      total,
      limit,
      skip,
    });
  } catch (error: any) {
    console.error("[API Contact GET] Error fetching inquiries:", error?.message || error);
    return NextResponse.json(
      { error: "Failed to retrieve contact inquiries" },
      { status: 500 }
    );
  }
}

// PATCH - Update contact status or notes
export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any)?.role !== "ADMIN" && (session.user as any)?.role !== "EDITOR") {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    const body = await req.json();
    const { contact_id, status, notes } = body;

    if (!contact_id || typeof contact_id !== "number") {
      return NextResponse.json(
        { error: "Valid contact_id is required" },
        { status: 400 }
      );
    }

    const updateData: any = {};
    if (status !== undefined) {
      updateData.status = String(status).toUpperCase();
      if (updateData.status === "RESOLVED" || updateData.status === "CONTACTED") {
        updateData.responded_at = new Date();
      }
    }
    if (notes !== undefined) {
      updateData.notes = notes;
    }

    const updated = await prisma.contactUs.update({
      where: { contact_id },
      data: updateData,
    });

    return NextResponse.json({ success: true, contact: updated });
  } catch (error: any) {
    console.error("[API Contact PATCH] Error updating inquiry:", error?.message || error);
    return NextResponse.json(
      { error: error?.message || "Failed to update inquiry" },
      { status: 500 }
    );
  }
}

// DELETE - Delete a contact inquiry
export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any)?.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized access: Only Admins can delete inquiries" }, { status: 401 });
    }

    const body = await req.json();
    const { contact_id } = body;

    if (!contact_id || typeof contact_id !== "number") {
      return NextResponse.json(
        { error: "Valid contact_id is required" },
        { status: 400 }
      );
    }

    const deleted = await prisma.contactUs.delete({
      where: { contact_id },
    });

    return NextResponse.json({ success: true, contact: deleted });
  } catch (error: any) {
    console.error("[API Contact DELETE] Error deleting inquiry:", error?.message || error);
    return NextResponse.json(
      { error: error?.message || "Failed to delete inquiry" },
      { status: 500 }
    );
  }
}

// POST - Create manual contact submission (Admin lead entry or public fallback)
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, service_id, notes, status } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    let contactSubmission;
    try {
      contactSubmission = await prisma.contactUs.create({
        data: {
          name: name.trim(),
          email: email.trim().toLowerCase(),
          phone: phone?.trim() || null,
          service_id: service_id ? Number(service_id) : null,
          notes: notes?.trim() || null,
          status: status ? String(status).toUpperCase() : "NEW",
        },
      });
    } catch (createErr: any) {
      if (createErr?.code === "P2002" || String(createErr?.message).includes("contact_id")) {
        console.warn("[API Contact POST] Auto-healing contact_id sequence and retrying...");
        await prisma.$executeRawUnsafe(`
          SELECT setval(
            pg_get_serial_sequence('"ContactUs"', 'contact_id'),
            COALESCE((SELECT MAX(contact_id) FROM "ContactUs"), 1)
          );
        `);
        contactSubmission = await prisma.contactUs.create({
          data: {
            name: name.trim(),
            email: email.trim().toLowerCase(),
            phone: phone?.trim() || null,
            service_id: service_id ? Number(service_id) : null,
            notes: notes?.trim() || null,
            status: status ? String(status).toUpperCase() : "NEW",
          },
        });
      } else {
        throw createErr;
      }
    }

    return NextResponse.json(
      { success: true, contact: contactSubmission },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("[API Contact POST] Error creating inquiry:", error?.message || error);
    return NextResponse.json(
      { error: "Failed to create contact submission." },
      { status: 500 }
    );
  }
}
