'use client';

import Link from 'next/link';
import { Navbar } from '@/components/mechvault/Navbar';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Home, Search, Wrench } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="flex min-h-[70vh] items-center justify-center px-4">
        <div className="max-w-2xl text-center">
          <div className="mb-6 flex justify-center">
            <div className="relative">
              <Wrench className="h-32 w-32 text-slate-300" />
              <div className="absolute -top-2 -right-2 flex h-10 w-10 items-center justify-center rounded-full bg-brand-orange text-white text-xl font-bold">
                4
              </div>
              <div className="absolute -bottom-2 -left-2 flex h-10 w-10 items-center justify-center rounded-full bg-brand-orange text-white text-xl font-bold">
                4
              </div>
            </div>
          </div>

          <h1 className="text-4xl font-bold text-slate-900 sm:text-5xl lg:text-6xl">
            Page Not Found
          </h1>

          <p className="mt-6 text-lg text-slate-600">
            The engineering asset you're looking for doesn't exist or has been moved.
            Let's get you back on track.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button
              size="lg"
              className="bg-brand-orange hover:bg-brand-orange-hover text-white"
              asChild
            >
              <Link href="/">
                <Home className="mr-2 h-5 w-5" />
                Back to Home
              </Link>
            </Button>

            <Button size="lg" variant="outline" asChild>
              <Link href="/market">
                <Search className="mr-2 h-5 w-5" />
                Browse Products
              </Link>
            </Button>
          </div>

          <div className="mt-12 border-t border-slate-200 pt-8">
            <p className="text-sm text-slate-500">
              Need help? <Link href="https://wa.me/6281234567890" className="text-brand-orange hover:underline">Contact Support</Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
