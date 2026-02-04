import { GoogleSpreadsheet } from 'google-spreadsheet';
import { Product } from '@/types/product';

export interface SheetRow {
  id: string;
  title: string;
  category: string;
  price: string;
  original_price: string;
  description: string;
  images: string;
  tags: string;
  link_shopee: string;
  link_whatsapp: string;
  badge: string;
  is_active: string;
}

// Parse price string to number
function parsePrice(priceStr: string): number {
  if (!priceStr) return 0;
  const cleaned = priceStr.replace(/[^0-9.]/g, '');
  return parseFloat(cleaned) || 0;
}

// Parse comma-separated string to array
function parseCommaSeparated(str: string): string[] {
  if (!str) return [];
  return str.split(',').map(s => s.trim()).filter(s => s.length > 0);
}

// Parse is_active string to boolean
function parseIsActive(value: string): boolean {
  return value?.toUpperCase() === 'TRUE' || value === '1';
}

// Map sheet row to Product
function mapRowToProduct(row: SheetRow): Product | null {
  if (!row.id || !row.title) return null;

  const images = parseCommaSeparated(row.images);
  const tags = parseCommaSeparated(row.tags);

  return {
    id: row.id,
    title: row.title,
    category: row.category || 'Uncategorized',
    price: row.price || '0',
    original_price: row.original_price || undefined,
    description: row.description || '',
    images,
    tags,
    link_shopee: row.link_shopee || undefined,
    link_whatsapp: row.link_whatsapp || undefined,
    badge: row.badge || undefined,
    is_active: parseIsActive(row.is_active || 'TRUE'),
  };
}

// Initialize Google Spreadsheet
async function initSheet(): Promise<GoogleSpreadsheet> {
  const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID);

  if (process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL && process.env.GOOGLE_PRIVATE_KEY) {
    await doc.useServiceAccountAuth({
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    });
  }

  await doc.loadInfo();
  return doc;
}

// Fetch all products from Google Sheets
export async function fetchProducts(): Promise<Product[]> {
  try {
    const doc = await initSheet();
    const sheet = doc.sheetsByIndex[0];

    if (!sheet) {
      throw new Error('No sheet found in the document');
    }

    const rows = await sheet.getRows<SheetRow>();
    const products: Product[] = [];

    for (const row of rows) {
      const product = mapRowToProduct(row.toObject());
      if (product && product.is_active) {
        products.push(product);
      }
    }

    return products;
  } catch (error) {
    console.error('Error fetching products from Google Sheets:', error);
    throw error;
  }
}

// Fetch a single product by ID
export async function fetchProductById(id: string): Promise<Product | null> {
  try {
    const products = await fetchProducts();
    return products.find(p => p.id === id) || null;
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    return null;
  }
}

// Fetch all unique categories
export async function fetchCategories(): Promise<string[]> {
  try {
    const products = await fetchProducts();
    const categories = new Set<string>();
    products.forEach(p => categories.add(p.category));
    return Array.from(categories).sort();
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

// Fetch featured products (products with badges)
export async function fetchFeaturedProducts(limit: number = 8): Promise<Product[]> {
  try {
    const products = await fetchProducts();
    return products
      .filter(p => p.badge)
      .slice(0, limit);
  } catch (error) {
    console.error('Error fetching featured products:', error);
    return [];
  }
}

// Fetch related products (same category, excluding current product)
export async function fetchRelatedProducts(
  category: string,
  currentId: string,
  limit: number = 3
): Promise<Product[]> {
  try {
    const products = await fetchProducts();
    return products
      .filter(p => p.category === category && p.id !== currentId)
      .slice(0, limit);
  } catch (error) {
    console.error('Error fetching related products:', error);
    return [];
  }
}
