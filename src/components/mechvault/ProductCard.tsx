'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShoppingCart, Eye, ArrowRight, Tag } from 'lucide-react';
import { Product } from '@/types/product';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [imageError, setImageError] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const mainImage = product.images[0] || '/placeholder-product.jpg';
  const hasDiscount = product.original_price && product.original_price !== product.price;

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (product.link_shopee) {
      toast({
        title: 'Redirecting to Shopee...',
        description: 'Opening purchase link in a new tab.',
      });
      setTimeout(() => {
        window.open(product.link_shopee, '_blank');
      }, 500);
    } else if (product.link_whatsapp) {
      toast({
        title: 'Opening WhatsApp...',
        description: 'Opening WhatsApp to place your order.',
      });
      setTimeout(() => {
        window.open(product.link_whatsapp, '_blank');
      }, 500);
    }
  };

  const formatPrice = (price: string) => {
    return price;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
    >
      <Link href={`/product/${product.id}`}>
        <Card className="group relative overflow-hidden border-slate-200 bg-white hover:shadow-xl transition-shadow duration-300">
          <div className="relative aspect-square overflow-hidden bg-slate-100">
            {product.badge && (
              <Badge className="absolute top-3 left-3 z-10 bg-brand-orange hover:bg-brand-orange-hover">
                {product.badge}
              </Badge>
            )}
            {hasDiscount && (
              <Badge className="absolute top-3 right-3 z-10 bg-red-500 hover:bg-red-600">
                {Math.round(
                  ((parseFloat(product.price) - parseFloat(product.original_price)) / parseFloat(product.original_price)) * 100
                )}% OFF
              </Badge>
            )}

            <Image
              src={imageError ? '/placeholder-product.jpg' : mainImage}
              alt={product.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
              onError={() => setImageError(true)}
              loading="lazy"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            <motion.div
              className="absolute bottom-3 left-3 right-3 flex gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              initial={{ y: 10 }}
              whileHover={{ y: 0 }}
            >
              <Button
                size="sm"
                variant="secondary"
                className="flex-1 bg-white/90 hover:bg-white text-slate-900"
                asChild
              >
                <span className="flex items-center justify-center gap-1">
                  <Eye className="h-4 w-4" />
                  View Details
                </span>
              </Button>
              <Button
                size="sm"
                className="flex-1 bg-brand-orange hover:bg-brand-orange-hover text-white"
                onClick={handleBuyNow}
              >
                <ShoppingCart className="h-4 w-4 mr-1" />
                Buy
              </Button>
            </motion.div>
          </div>

          <CardContent className="p-4">
            <div className="mb-2 flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                {product.category}
              </Badge>
              {product.tags.slice(0, 2).map((tag, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  <Tag className="h-3 w-3 mr-1" />
                  {tag}
                </Badge>
              ))}
            </div>

            <h3 className="font-semibold text-lg text-slate-900 line-clamp-2 min-h-[3.5rem]">
              {product.title}
            </h3>

            <div className="mt-3 flex items-end gap-2">
              {hasDiscount ? (
                <>
                  <span className="text-2xl font-bold text-brand-orange">
                    {formatPrice(product.price)}
                  </span>
                  <span className="text-sm text-slate-400 line-through">
                    {formatPrice(product.original_price)}
                  </span>
                </>
              ) : (
                <span className="text-2xl font-bold text-slate-900">
                  {formatPrice(product.price)}
                </span>
              )}
            </div>
          </CardContent>

          <CardFooter className="p-4 pt-0 flex gap-2">
            <Button variant="outline" className="flex-1" asChild>
              <span className="flex items-center justify-center">
                <Eye className="h-4 w-4 mr-2" />
                View
                <ArrowRight className="h-4 w-4 ml-2" />
              </span>
            </Button>
            <Button className="flex-1 bg-brand-industrial hover:bg-slate-800 text-white" onClick={handleBuyNow}>
              <ShoppingCart className="h-4 w-4 mr-2" />
              Buy Now
            </Button>
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  );
}
