import prisma from "@/lib/prisma";

export async function getGalleryItems() {
  return await prisma.galleryItem.findMany({
    select: {
      id: true,
      url: true,
      altText: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

