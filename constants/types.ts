import { BlogCategory } from "@/app/generated/prisma"

export interface Blog {
    slug: string
    title: string
    excerpt: string | null
    featured_image: FeaturedImage | null
    categories: Category[]
  }
  
  export interface FeaturedImage {
    id: string
    url: string
    altText: string
    publicId: string
  }
  
  export interface Category {
    category: BlogCategory
  }
  
  export interface Category2 {
    name: string
    slug: string
  }
  