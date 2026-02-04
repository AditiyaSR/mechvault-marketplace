'use client';

import { useState, useEffect } from 'react';
import { Hero } from '@/components/mechvault/Hero';
import { ProductCard } from '@/components/mechvault/ProductCard';
import { Navbar } from '@/components/mechvault/Navbar';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowRight, TrendingUp, Shield, Zap, Star, Quote, MessageCircle, Mail, Award, Crown } from 'lucide-react';

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');

  useEffect(() => {
    async function fetchFeaturedProducts() {
      try {
        const response = await fetch('/api/products?featured=true&limit=8');
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        }
      } catch (error) {
        console.error('Error fetching featured products:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchFeaturedProducts();
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      alert(`Terima kasih! Email ${email} telah terdaftar ke newsletter.`);
      setEmail('');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main>
        <Hero />

        <section id="featured" className="py-16 bg-slate-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
                Featured Products
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                Hand-picked engineering assets from our premium collection
              </p>
            </div>

            {loading ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="space-y-4">
                    <Skeleton className="aspect-square w-full rounded-lg" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                ))}
              </div>
            ) : products.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-slate-600">No featured products available at the moment.</p>
                <Button
                  className="mt-4 bg-brand-orange hover:bg-brand-orange-hover text-white"
                  asChild
                >
                  <a href="/market">
                    View All Products
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            )}

            {!loading && products.length > 0 && (
              <div className="mt-12 text-center">
                <Button
                  size="lg"
                  className="bg-brand-orange hover:bg-brand-orange-hover text-white px-8"
                  asChild
                >
                  <a href="/market">
                    Browse All Products
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </Button>
              </div>
            )}
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 md:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand-orange/10">
                  <TrendingUp className="h-8 w-8 text-brand-orange" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-slate-900">
                  Premium Quality
                </h3>
                <p className="text-slate-600">
                  Every asset is carefully curated and tested by engineering professionals
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand-orange/10">
                  <Shield className="h-8 w-8 text-brand-orange" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-slate-900">
                  Verified Files
                </h3>
                <p className="text-slate-600">
                  All CAD files and blueprints are verified for accuracy and compatibility
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand-orange/10">
                  <Zap className="h-8 w-8 text-brand-orange" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-slate-900">
                  Instant Download
                </h3>
                <p className="text-slate-600">
                  Get immediate access to your purchased files, ready to use
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-brand-industrial text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold sm:text-4xl">
                Ready to Find Your Perfect Asset?
              </h2>
              <p className="mt-4 text-lg text-slate-300">
                Join thousands of engineers and designers who trust MechVault
              </p>
              <div className="mt-10">
                <Button
                  size="lg"
                  className="bg-brand-orange hover:bg-brand-orange-hover text-white px-8 text-lg"
                  asChild
                >
                  <a href="/market">
                    Start Browsing
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Badges */}
        <section className="py-16 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
                Trusted by Engineers Worldwide
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                Our quality and reliability speaks for itself
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-4">
              <div className="flex flex-col items-center rounded-xl bg-gradient-to-br from-brand-orange to-brand-orange-dark p-6 text-white shadow-lg">
                <Award className="mb-4 h-12 w-12" />
                <h3 className="mb-2 text-xl font-bold">10K+</h3>
                <p className="text-center opacity-90">Products</p>
              </div>

              <div className="flex flex-col items-center rounded-xl bg-gradient-to-br from-brand-blue to-brand-blue-dark p-6 text-white shadow-lg">
                <Crown className="mb-4 h-12 w-12" />
                <h3 className="mb-2 text-xl font-bold">5K+</h3>
                <p className="text-center opacity-90">Happy Customers</p>
              </div>

              <div className="flex flex-col items-center rounded-xl bg-gradient-to-br from-brand-industrial to-brand-industrial-light p-6 text-white shadow-lg">
                <Shield className="mb-4 h-12 w-12" />
                <h3 className="mb-2 text-xl font-bold">99.9%</h3>
                <p className="text-center opacity-90">Verified Files</p>
              </div>

              <div className="flex flex-col items-center rounded-xl bg-gradient-to-br from-brand-orange-light to-brand-orange-darker p-6 text-white shadow-lg">
                <Star className="mb-4 h-12 w-12" />
                <h3 className="mb-2 text-xl font-bold">4.9/5</h3>
                <p className="text-center opacity-90">Average Rating</p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-slate-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
                What Our Customers Say
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                Don't just take our word for it - hear from our satisfied customers
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-brand-orange to-brand-orange-light text-white font-bold">
                    BS
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Budi Santoso</p>
                    <p className="text-sm text-slate-500">Mechanical Engineer</p>
                  </div>
                </div>
                <div className="mb-4">
                  <Quote className="mb-2 h-6 w-6 text-brand-orange" />
                  <p className="italic text-slate-600">
                    MechVault has transformed my workflow. The CAD files are top-notch and the support is incredible. Highly recommended for any engineer!
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className={`h-5 w-5 ${star <= 5 ? 'fill-brand-orange text-brand-orange' : 'text-slate-300'}`} />
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-brand-blue to-brand-blue-light text-white font-bold">
                    SR
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Siti Rahayu</p>
                    <p className="text-sm text-slate-500">3D Printing Specialist</p>
                  </div>
                </div>
                <div className="mb-4">
                  <Quote className="mb-2 h-6 w-6 text-brand-blue" />
                  <p className="italic text-slate-600">
                    Found exactly what I needed for my 3D printing projects. The files are clean and easy to work with. Will definitely be back for more!
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className={`h-5 w-5 ${star <= 5 ? 'fill-brand-orange text-brand-orange' : 'text-slate-300'}`} />
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-brand-industrial to-brand-industrial-light text-white font-bold">
                    AW
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Ahmad Wijaya</p>
                    <p className="text-sm text-slate-500">Industrial Designer</p>
                  </div>
                </div>
                <div className="mb-4">
                  <Quote className="mb-2 h-6 w-6 text-brand-industrial" />
                  <p className="italic text-slate-600">
                    The quality of the blueprints exceeded my expectations. MechVault is now my go-to source for all engineering resources. Great job!
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className={`h-5 w-5 ${star <= 5 ? 'fill-brand-orange text-brand-orange' : 'text-slate-300'}`} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-20 bg-gradient-to-r from-brand-industrial to-brand-blue text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 md:grid-cols-2 items-center">
              <div>
                <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
                  Stay Updated
                </h2>
                <p className="mb-6 text-lg text-slate-200">
                  Subscribe to our newsletter and be the first to know about new products, special offers, and engineering tips.
                </p>
                <form onSubmit={handleSubscribe} className="flex gap-3">
                  <div className="flex-1">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-lg border-0 px-4 py-3 text-slate-900 placeholder:text-slate-400"
                      required
                    />
                  </div>
                  <Button type="submit" className="bg-brand-orange hover:bg-brand-orange-dark text-white px-6">
                    Subscribe
                  </Button>
                </form>
                <p className="mt-4 text-sm text-slate-300">
                  By subscribing, you agree to receive promotional emails. Unsubscribe anytime.
                </p>
              </div>

              <div className="hidden md:block">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-brand-orange/20">
                  <Mail className="h-12 w-12 text-brand-orange" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-slate-900 text-slate-400">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-orange text-white">
                  <span className="text-xl font-bold">MV</span>
                </div>
                <span className="text-xl font-bold text-white">MechVault</span>
              </div>
              <p className="text-sm">
                Your trusted marketplace for premium engineering assets.
              </p>
            </div>

            <div>
              <h4 className="mb-4 font-semibold text-white">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="/" className="hover:text-brand-orange transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/market" className="hover:text-brand-orange transition-colors">
                    Products
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-brand-orange transition-colors">
                    About Us
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4 font-semibold text-white">Categories</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="/market?category=CAD%20Library" className="hover:text-brand-orange transition-colors">
                    CAD Library
                  </a>
                </li>
                <li>
                  <a href="/market?category=3D%20Print" className="hover:text-brand-orange transition-colors">
                    3D Print
                  </a>
                </li>
                <li>
                  <a href="/market?category=Tutorial" className="hover:text-brand-orange transition-colors">
                    Tutorials
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4 font-semibold text-white">Support</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="https://wa.me/6281234567890"
                    className="hover:text-brand-orange transition-colors"
                  >
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-brand-orange transition-colors">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-brand-orange transition-colors">
                    Terms & Conditions
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 border-t border-slate-800 pt-8 text-center text-sm">
            <p>&copy; {new Date().getFullYear()} MechVault. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Chat Widget */}
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          className="rounded-full h-14 w-14 shadow-lg bg-gradient-to-br from-brand-orange to-brand-orange-dark hover:from-brand-orange-dark hover:to-brand-orange-darker text-white transition-all hover:scale-110"
          onClick={() => window.open('https://wa.me/6281234567890', '_blank')}
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
}
