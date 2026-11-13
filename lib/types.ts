export interface Category {
  category_id: number;
  name: string;
  slug: string;
  description: string | null;
  color: string | null;
  icon: string | null;
  parent_id: any;
  display_order?: number;
  is_active?: boolean;
  post_count?: number;
  created_at?: string | Date;
  updated_at?: string | Date;
  meta_title?: string | null;
  meta_description?: string | null;
}

