import prisma from "@/lib/prisma";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FileText,
  Users,
  FolderGit2,
  Briefcase,
  Mail,
  Image as ImageIcon,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin Dashboard - Softech Solutions",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminDashboardPage() {
  const [
    blogsCount,
    teamsCount,
    projectsCount,
    jobsCount,
    newInquiriesCount,
    galleryCount,
  ] = await Promise.all([
    prisma.blog.count().catch(() => 0),
    prisma.team.count().catch(() => 0),
    prisma.project.count().catch(() => 0),
    prisma.job.count().catch(() => 0),
    prisma.contactUs.count({ where: { status: "NEW" } }).catch(() => 0),
    prisma.galleryItem.count().catch(() => 0),
  ]);

  const cards = [
    {
      title: "Total Blogs",
      count: blogsCount,
      icon: FileText,
      href: "/admin/blogs",
      color: "text-blue-600 bg-blue-50",
    },
    {
      title: "Team Members",
      count: teamsCount,
      icon: Users,
      href: "/admin/teams",
      color: "text-emerald-600 bg-emerald-50",
    },
    {
      title: "Projects",
      count: projectsCount,
      icon: FolderGit2,
      href: "/admin/projects",
      color: "text-purple-600 bg-purple-50",
    },
    {
      title: "Active Jobs",
      count: jobsCount,
      icon: Briefcase,
      href: "/admin/jobs",
      color: "text-amber-600 bg-amber-50",
    },
    {
      title: "New Inquiries",
      count: newInquiriesCount,
      icon: Mail,
      href: "/admin/contact",
      color: "text-rose-600 bg-rose-50",
    },
    {
      title: "Media Gallery",
      count: galleryCount,
      icon: ImageIcon,
      href: "/admin/gallery",
      color: "text-indigo-600 bg-indigo-50",
    },
  ];

  return (
    <div className="p-2 md:p-6 space-y-6">
      <PageHeader
        heading="Admin Overview"
        paragraph="Manage content, leads, careers, media, and site data from one place."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link key={card.title} href={card.href} className="group">
              <Card className="hover:shadow-md transition-shadow duration-200 border border-gray-200">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    {card.title}
                  </CardTitle>
                  <div className={`p-2 rounded-lg ${card.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                </CardHeader>
                <CardContent className="flex items-baseline justify-between">
                  <div className="text-3xl font-bold text-gray-900">
                    {card.count}
                  </div>
                  <span className="text-xs text-primary font-medium flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Manage <ArrowRight className="w-3 h-3" />
                  </span>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

