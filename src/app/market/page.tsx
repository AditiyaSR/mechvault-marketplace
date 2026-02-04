'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ProductCard } from '@/components/mechvault/ProductCard';
import { FilterSidebar } from '@/components/mechvault/FilterSidebar';
import { Navbar } from '@/components/mechvault/Navbar';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { SlidersHorizontal, Grid, List } from 'lucide-react';
import { Product, ProductFilters } from '@/types/product';

export default function MarketPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const [filters, setFilters] = useState<ProductFilters>({
    search: '',
    categories: [],
    minPrice: 0,
    maxPrice: 1000,
  });

  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);

  useEffect(() => {
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category') || '';

    const newFilters: ProductFilters = {
      search,
      categories: category ? [category] : [],
      minPrice: 0,
      maxPrice: 1000,
    };

    setFilters(newFilters);
  }, [searchParams]);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const [productsRes, categoriesRes] = await Promise.all([
          fetch('/api/products'),
          fetch('/api/categories'),
        ]);

        if (productsRes.ok && categoriesRes.ok) {
          const productsData = await productsRes.json();
          const categoriesData = await categoriesRes.json();

          setProducts(productsData);
          setFilteredProducts(productsData);
          setCategories(categoriesData);

          if (productsData.length > 0) {
            const prices = productsData.map((p: Product) => parseFloat(p.price) || 0);
            const minP = Math.min(...prices);
            const maxP = Math.max(...prices);
            setPriceRange([minP, maxP]);
            setFilters((prev) => ({ ...prev, minPrice: minP, maxPrice: maxP }));
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    let filtered = [...products];

    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(searchTerm) ||
          p.description.toLowerCase().includes(searchTerm) ||
          p.tags.some((tag) => tag.toLowerCase().includes(searchTerm))
      );
    }

    if (filters.categories.length > 0) {
      filtered = filtered.filter((p) => filters.categories.includes(p.category));
    }

    filtered = filtered.filter((p) => {
      const price = parseFloat(p.price) || 0;
      return price >= priceRange[0] && price <= priceRange[1];
    });

    setFilteredProducts(filtered);
  }, [products, filters, priceRange]);

  const handleSearchChange = (value: string) => {
    setFilters((prev) => ({ ...prev, search: value }));
  };

  const handleCategoryToggle = (category: string) => {
    setFilters((prev) => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category],
    }));
  };

  const handlePriceRangeChange = (range: [number, number]) => {
    setPriceRange(range);
  };

  const handleResetFilters = () => {
    setFilters({
      search: '',
      categories: [],
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
    });
    setPriceRange([0, 1000]);
    router.push('/market');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            Engineering Assets Marketplace
          </h1>
          <p className="mt-2 text-lg text-slate-600">
            Browse our collection of premium CAD files, 3D models, and blueprints
          </p>
        </div>

        <div className="lg:flex lg:gap-8">
          <aside className="mb-8 lg:mb-0 lg:w-72 lg:flex-shrink-0">
            <div className="hidden lg:block">
              <FilterSidebar
                search={filters.search}
                onSearchChange={handleSearchChange}
                categories={categories}
                selectedCategories={filters.categories}
                onCategoryToggle={handleCategoryToggle}
                minPrice={priceRange[0]}
                maxPrice={priceRange[1]}
                priceRange={priceRange}
                onPriceRangeChange={handlePriceRangeChange}
                onResetFilters={handleResetFilters}
                productCount={filteredProducts.length}
              />
            </div>

            <Sheet open={isMobileFilterOpen} onOpenChange={setIsMobileFilterOpen}>
              <SheetContent side="left" className="w-80 p-6">
                <FilterSidebar
                  search={filters.search}
                  onSearchChange={handleSearchChange}
                  categories={categories}
                  selectedCategories={filters.categories}
                  onCategoryToggle={handleCategoryToggle}
                  minPrice={priceRange[0]}
                  maxPrice={priceRange[1]}
                  priceRange={priceRange}
                  onPriceRangeChange={handlePriceRangeChange}
                  onResetFilters={handleResetFilters}
                  productCount={filteredProducts.length}
                  isMobile={true}
                  onClose={() => setIsMobileFilterOpen(false)}
                />
              </SheetContent>
            </Sheet>
          </aside>

          <div className="flex-1">
            <div className="mb-6 flex items-center justify-between">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="lg:hidden">
                    <SlidersHorizontal className="mr-2 h-4 w-4" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80 p-6">
                  <FilterSidebar
                    search={filters.search}
                    onSearchChange={handleSearchChange}
                    categories={categories}
                    selectedCategories={filters.categories}
                    onCategoryToggle={handleCategoryToggle}
                    minPrice={priceRange[0]}
                    maxPrice={priceRange[1]}
                    priceRange={priceRange}
                    onPriceRangeChange={handlePriceRangeChange}
                    onResetFilters={handleResetFilters}
                    productCount={filteredProducts.length}
                    isMobile={true}
                    onClose={() => setIsMobileFilterOpen(false)}
                  />
                </SheetContent>
              </Sheet>

              <div className="ml-auto flex items-center gap-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="icon"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="icon"
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {loading ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="space-y-4">
                    <Skeleton className="aspect-square w-full rounded-lg" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                ))}
              </div>
            ) : filteredProducts.length > 0 ? (
              <div
                className={
                  viewMode === 'grid'
                    ? 'grid gap-6 sm:grid-cols-2 lg:grid-cols-3'
                    : 'grid gap-6'
                }
              >
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="mb-4 text-slate-400">
                  <SlidersHorizontal className="mx-auto h-16 w-16" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900">
                  No products found
                </h3>
                <p className="mt-2 text-slate-600">
                  Try adjusting your filters or search terms
                </p>
                <Button
                  className="mt-4 bg-brand-orange hover:bg-brand-orange-hover text-white"
                  onClick={handleResetFilters}
                >
                  Reset Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="mt-auto border-t border-slate-200 bg-slate-50 py-8">
        <div className="mx-auto max-w-7xl px-4 text-center text-sm text-slate-600 sm:px-6 lg:px-8">
          <p>&copy; {new Date().getFullYear()} MechVault. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
