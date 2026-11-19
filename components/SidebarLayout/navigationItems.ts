import {
  Briefcase,
  Building2,
  Folder,
  Home,
  Image,
  Newspaper,
  Tag,
  Type,
  Radio,
  Users,
  Database,
  Mail,
} from "lucide-react";

export const navigation = [
  {
    label: "Platform",
    items: [
      {
        title: "Dashboard",
        url: "/admin",
        icon: Home,
        isActive: true,
      },
      {
        title: "Category",
        url: "/admin/category",
        icon: Type,
        isActive: false,
      },
      {
        title: "Blog",
        url: "/admin/blogs",
        icon: Newspaper,
        isActive: false,
      },
      {
        title: "Gallery",
        url: "/admin/gallery",
        icon: Image,
        isActive: false,
      },
      {
        title: "Companies",
        url: "/admin/companies",
        icon: Building2,
        isActive: false,
      },
      {
        title: "Podcasts",
        url: "/admin/podcasts",
        icon: Radio,
        isActive: false,
      },
      {
        title: "Projects",
        url: "/admin/projects",
        icon: Folder,
        isActive: false,
      },
      {
        title: "Job Categories",
        url: "/admin/job-categories",
        icon: Tag,
        isActive: false,
      },
      {
        title: "Jobs",
        url: "/admin/jobs",
        icon: Briefcase,
        isActive: false,
      },
      {
        title: "Teams",
        url: "/admin/teams",
        icon: Users,
        isActive: false,
      },
      {
        title: "Contact Submissions",
        url: "/admin/contact",
        icon: Mail,
        isActive: false,
      },
      {
        title: "Database Backup",
        url: "/admin/backup",
        icon: Database,
        isActive: false,
      },
    ],
  },
];
