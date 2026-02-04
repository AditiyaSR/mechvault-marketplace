import { NextResponse } from 'next/server';
import { fetchProducts, fetchFeaturedProducts, fetchProductById } from '@/lib/sheets';

export const dynamic = 'force-dynamic';
export const revalidate = 60;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const featured = searchParams.get('featured');

    if (id) {
      const product = await fetchProductById(id);
      if (!product) {
        return NextResponse.json({ error: 'Product not found' }, { status: 404 });
      }
      return NextResponse.json(product);
    }

    if (featured === 'true') {
      const limit = searchParams.get('limit');
      const products = await fetchFeaturedProducts(limit ? parseInt(limit) : 8);
      return NextResponse.json(products);
    }

    const products = await fetchProducts();
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error in /api/products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}
