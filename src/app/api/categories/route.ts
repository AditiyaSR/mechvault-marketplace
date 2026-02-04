import { NextResponse } from 'next/server';
import { fetchCategories } from '@/lib/sheets';

export const dynamic = 'force-dynamic';
export const revalidate = 60;

export async function GET() {
  try {
    const categories = await fetchCategories();
    return NextResponse.json(categories);
  } catch (error) {
    console.error('Error in /api/categories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}
