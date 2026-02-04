export interface Product {
  id: string;
  title: string;
  category: string;
  price: string;
  original_price?: string;
  description: string;
  images: string[];
  tags: string[];
  link_shopee?: string;
  link_whatsapp?: string;
  badge?: string;
  is_active: boolean;
}

export interface ProductFilters {
  search: string;
  categories: string[];
  minPrice: number;
  maxPrice: number;
}
