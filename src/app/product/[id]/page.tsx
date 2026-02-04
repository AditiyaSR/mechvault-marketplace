'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Navbar } from '@/components/mechvault/Navbar';
import { ProductCard } from '@/components/mechvault/ProductCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import {
  ArrowLeft,
  ShoppingCart,
  Tag,
  Share2,
  MessageCircle,
  CheckCircle,
  Download,
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Product } from '@/types/product';
import ReactMarkdown from 'react-markdown';

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);
        const response = await fetch(`/api/products?id=${productId}`);

        if (response.ok) {
          const data = await response.json();
          setProduct(data);

          if (data) {
            const relatedResponse = await fetch(
              `/api/products?category=${encodeURIComponent(data.category)}`
            );
            if (relatedResponse.ok) {
              const relatedData = await relatedResponse.json();
              setRelatedProducts(
                relatedData
                  .filter((p: Product) => p.id !== productId)
                  .slice(0, 3)
              );
            }
          }
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [productId]);

  const handleBuyNow = () => {
    if (!product) return;

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

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product?.title,
          text: product?.description,
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: 'Link copied!',
        description: 'Product link has been copied to clipboard.',
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            <Skeleton className="aspect-square w-full rounded-lg" />
            <div className="space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="flex min-h-[60vh] items-center justify-center px-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-slate-900">
              Product Not Found
            </h1>
            <p className="mt-4 text-slate-600">
              The product you are looking for does not exist or has been removed.
            </p>
            <Button className="mt-6 bg-brand-orange hover:bg-brand-orange-hover text-white" asChild>
              <Link href="/market">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Marketplace
              </Link>
            </Button>
          </div>
        </main>
      </div>
    );
  }

  const mainImage = product.images[0] || '/placeholder-product.jpg';
  const hasDiscount = product.original_price && product.original_price !== product.price;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Link
          href="/market"
          className="inline-flex items-center text-sm text-slate-600 hover:text-brand-orange transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Marketplace
        </Link>

        <div className="mt-6 grid gap-8 lg:grid-cols-2">
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-lg bg-slate-100">
              <Image
                src={mainImage}
                alt={product.title}
                fill
                className="object-cover"
                priority
              />
              {product.badge && (
                <Badge className="absolute top-4 left-4 bg-brand-orange hover:bg-brand-orange-hover">
                  {product.badge}
                </Badge>
              )}
              {hasDiscount && (
                <Badge className="absolute top-4 right-4 bg-red-500 hover:bg-red-600">
                  {Math.round(
                    ((parseFloat(product.price) - parseFloat(product.original_price)) / parseFloat(product.original_price)) * 100
                  )}% OFF
                </Badge>
              )}
            </div>

            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`relative aspect-square overflow-hidden rounded-lg border-2 transition-all ${
                      index === currentImageIndex
                        ? 'border-brand-orange'
                        : 'border-transparent hover:border-slate-300'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.title} - View ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div>
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <Badge variant="outline">{product.category}</Badge>
                {product.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary">
                    <Tag className="h-3 w-3 mr-1" />
                    {tag}
                  </Badge>
                ))}
              </div>

              <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
                {product.title}
              </h1>

              <div className="mt-4 flex items-end gap-3">
                {hasDiscount ? (
                  <>
                    <span className="text-3xl font-bold text-brand-orange">
                      {product.price}
                    </span>
                    <span className="text-xl text-slate-400 line-through">
                      {product.original_price}
                    </span>
                  </>
                ) : (
                  <span className="text-3xl font-bold text-slate-900">
                    {product.price}
                  </span>
                )}
              </div>
            </div>

            <Separator />

            <div className="flex flex-wrap gap-3">
              <Button
                size="lg"
                className="flex-1 bg-brand-orange hover:bg-brand-orange-hover text-white"
                onClick={handleBuyNow}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Buy Now
              </Button>
              <Button size="lg" variant="outline" onClick={handleShare}>
                <Share2 className="h-5 w-5" />
              </Button>
              {product.link_whatsapp && (
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                >
                  <a
                    href={product.link_whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="h-5 w-5" />
                  </a>
                </Button>
              )}
            </div>

            <div className="space-y-3 rounded-lg bg-slate-50 p-4">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-sm text-slate-700">Verified & Tested Files</span>
              </div>
              <div className="flex items-center gap-3">
                <Download className="h-5 w-5 text-brand-orange" />
                <span className="text-sm text-slate-700">Instant Digital Download</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-sm text-slate-700">Full Support Included</span>
              </div>
            </div>

            <Tabs defaultValue="description" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="specs">Specifications</TabsTrigger>
                <TabsTrigger value="usage">How to Use</TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="mt-4">
                <div className="prose prose-slate max-w-none">
                  <ReactMarkdown>{product.description}</ReactMarkdown>
                </div>
              </TabsContent>
              <TabsContent value="specs" className="mt-4">
                <div className="space-y-2">
                  <div className="flex justify-between border-b py-2">
                    <span className="font-medium">Category</span>
                    <span>{product.category}</span>
                  </div>
                  <div className="flex justify-between border-b py-2">
                    <span className="font-medium">Price</span>
                    <span>{product.price}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="font-medium">Tags</span>
                    <div className="flex gap-1 flex-wrap justify-end">
                      {product.tags.map((tag, index) => (
                        <Badge key={index} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="usage" className="mt-4">
                <div className="space-y-4 text-slate-700">
                  <p>
                    1. Purchase the product using the Buy Now button
                  </p>
                  <p>
                    2. Wait for the download link to be sent to your email
                  </p>
                  <p>
                    3. Download and extract the files
                  </p>
                  <p>
                    4. Open the files in your preferred CAD software (SolidWorks, AutoCAD, etc.)
                  </p>
                  <p>
                    5. If you need assistance, reach out via WhatsApp
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <section className="mt-16">
            <h2 className="mb-8 text-2xl font-bold text-slate-900">
              Related Products
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </section>
        )}
      </main>

      <footer className="mt-auto border-t border-slate-200 bg-slate-50 py-8 sm:hidden">
        <div className="fixed bottom-0 left-0 right-0 border-t border-slate-200 bg-white p-4">
          <Button
            size="lg"
            className="w-full bg-brand-orange hover:bg-brand-orange-hover text-white"
            onClick={handleBuyNow}
          >
            <ShoppingCart className="mr-2 h-5 w-5" />
            Buy Now - {product.price}
          </Button>
        </div>
      </footer>
    </div>
  );
}
