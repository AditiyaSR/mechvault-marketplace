'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search, SlidersHorizontal, X } from 'lucide-react';

interface FilterSidebarProps {
  search: string;
  onSearchChange: (value: string) => void;
  categories: string[];
  selectedCategories: string[];
  onCategoryToggle: (category: string) => void;
  minPrice: number;
  maxPrice: number;
  priceRange: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
  onResetFilters: () => void;
  productCount: number;
  isMobile?: boolean;
  onClose?: () => void;
}

export function FilterSidebar({
  search,
  onSearchChange,
  categories,
  selectedCategories,
  onCategoryToggle,
  minPrice,
  maxPrice,
  priceRange,
  onPriceRangeChange,
  onResetFilters,
  productCount,
  isMobile = false,
  onClose,
}: FilterSidebarProps) {
  const hasActiveFilters =
    search !== '' ||
    selectedCategories.length > 0 ||
    priceRange[0] !== minPrice ||
    priceRange[1] !== maxPrice;

  return (
    <div className={`${isMobile ? 'h-full' : 'sticky top-4'} space-y-6`}>
      <div className="flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-lg font-semibold">
          <SlidersHorizontal className="h-5 w-5" />
          Filters
        </h3>
        {isMobile && onClose && (
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="search">Search</Label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            id="search"
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <div className="space-y-3">
        <Label>Categories</Label>
        <ScrollArea className="h-48 pr-4">
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={`category-${category}`}
                  checked={selectedCategories.includes(category)}
                  onCheckedChange={() => onCategoryToggle(category)}
                />
                <Label
                  htmlFor={`category-${category}`}
                  className="cursor-pointer text-sm font-normal"
                >
                  {category}
                </Label>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      <div className="space-y-3">
        <Label>Price Range</Label>
        <div className="space-y-4">
          <Slider
            min={minPrice}
            max={maxPrice}
            step={1}
            value={priceRange}
            onValueChange={(value) => onPriceRangeChange([value[0], value[1]])}
            className="w-full"
          />
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-1">
              <span className="text-slate-500">Min:</span>
              <span className="font-semibold">{priceRange[0]}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-slate-500">Max:</span>
              <span className="font-semibold">{priceRange[1]}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-600">
            {productCount} product{productCount !== 1 ? 's' : ''} found
          </span>
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={onResetFilters}>
              Reset
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
