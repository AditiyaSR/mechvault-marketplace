'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Package,
  ShoppingCart,
  DollarSign,
  Users,
  TrendingUp,
  TrendingDown,
  Eye,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Filter,
  Download,
  MoreHorizontal
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';

interface StatCard {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: any;
  color: string;
}

export default function AdminDashboard() {
  const [timeRange, setTimeRange] = useState('7d');
  const [loading, setLoading] = useState(false);

  const stats: StatCard[] = [
    {
      title: 'Total Revenue',
      value: 'Rp 45.2M',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'from-brand-orange to-brand-orange-dark'
    },
    {
      title: 'Total Orders',
      value: '1,234',
      change: '+8.2%',
      trend: 'up',
      icon: ShoppingCart,
      color: 'from-brand-blue to-brand-blue-dark'
    },
    {
      title: 'Active Products',
      value: '156',
      change: '+2.1%',
      trend: 'up',
      icon: Package,
      color: 'from-brand-industrial to-brand-industrial-light'
    },
    {
      title: 'Total Customers',
      value: '2,847',
      change: '+15.3%',
      trend: 'up',
      icon: Users,
      color: 'from-brand-orange-light to-brand-orange-darker'
    }
  ];

  const recentOrders = [
    {
      id: 'ORD-001',
      customer: 'Budi Santoso',
      product: 'Mechanical Gear Assembly',
      amount: 'Rp 299,000',
      status: 'completed',
      date: '2 hours ago'
    },
    {
      id: 'ORD-002',
      customer: 'Siti Rahayu',
      product: '3D Printer Model',
      amount: 'Rp 149,000',
      status: 'pending',
      date: '4 hours ago'
    },
    {
      id: 'ORD-003',
      customer: 'Ahmad Wijaya',
      product: 'AutoCAD Blueprint',
      amount: 'Rp 99,000',
      status: 'completed',
      date: '6 hours ago'
    },
    {
      id: 'ORD-004',
      customer: 'Dewi Kartika',
      product: 'Industrial Robot Design',
      amount: 'Rp 499,000',
      status: 'processing',
      date: '1 day ago'
    },
    {
      id: 'ORD-005',
      customer: 'Rudi Hartono',
      product: 'CAD Template Bundle',
      amount: 'Rp 199,000',
      status: 'completed',
      date: '1 day ago'
    }
  ];

  const topProducts = [
    {
      id: 'PROD-001',
      name: 'Mechanical Gear Assembly',
      sales: 234,
      revenue: 'Rp 69.9M',
      views: 1250
    },
    {
      id: 'PROD-002',
      name: '3D Printer Model',
      sales: 189,
      revenue: 'Rp 28.1M',
      views: 980
    },
    {
      id: 'PROD-003',
      name: 'AutoCAD Blueprint',
      sales: 156,
      revenue: 'Rp 15.4M',
      views: 876
    },
    {
      id: 'PROD-004',
      name: 'Industrial Robot Design',
      sales: 98,
      revenue: 'Rp 48.9M',
      views: 654
    },
    {
      id: 'PROD-005',
      name: 'CAD Template Bundle',
      sales: 87,
      revenue: 'Rp 17.3M',
      views: 543
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard Overview</h1>
          <p className="text-slate-600">Welcome back! Here's what's happening with your store.</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const TrendIcon = stat.trend === 'up' ? TrendingUp : TrendingDown;

          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden border-slate-200/50 bg-white shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-slate-600">
                    {stat.title}
                  </CardTitle>
                  <div className={`rounded-lg bg-gradient-to-br ${stat.color} p-2`}>
                    <Icon className="h-4 w-4 text-white" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-baseline gap-2">
                    <div className="text-2xl font-bold text-slate-900">
                      {stat.value}
                    </div>
                    <div
                      className={`flex items-center gap-1 text-sm font-medium ${
                        stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      <TrendIcon className="h-3 w-3" />
                      {stat.change}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-slate-200/50 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Sales Analytics</span>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-end justify-between gap-2 px-2">
              {[65, 85, 45, 90, 75, 60, 95, 80, 55, 70, 88, 65].map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ height: 0 }}
                  animate={{ height: `${value}%` }}
                  transition={{ duration: 0.8, delay: index * 0.05 }}
                  className="flex-1 rounded-t bg-gradient-to-t from-brand-blue to-brand-orange relative group cursor-pointer hover:opacity-80"
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 hidden rounded-lg bg-slate-900 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
                    Rp {value}K
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="mt-4 flex justify-between text-xs text-slate-500">
              {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month) => (
                <span key={month}>{month}</span>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200/50 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Revenue by Category</span>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { name: 'CAD Library', value: 45, color: 'bg-brand-orange' },
              { name: '3D Print', value: 30, color: 'bg-brand-blue' },
              { name: 'Tutorials', value: 15, color: 'bg-brand-industrial' },
              { name: 'Blueprints', value: 10, color: 'bg-brand-orange-light' }
            ].map((category, index) => (
              <div key={category.name} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-slate-700">{category.name}</span>
                  <span className="text-slate-500">{category.value}%</span>
                </div>
                <Progress value={category.value} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders & Top Products */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-slate-200/50 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Recent Orders</span>
              <Button variant="outline" size="sm" asChild>
                <a href="/admin/orders">View All</a>
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.slice(0, 5).map((order, index) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="flex items-center gap-3 rounded-lg p-3 hover:bg-slate-50 transition-colors"
                >
                  <Avatar>
                    <AvatarFallback className="bg-gradient-to-br from-brand-orange to-brand-orange-light text-white">
                      {order.customer.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="truncate text-sm font-medium text-slate-900">
                      {order.customer}
                    </p>
                    <p className="truncate text-xs text-slate-500">{order.product}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-slate-900">
                      {order.amount}
                    </p>
                    <Badge
                      variant={
                        order.status === 'completed'
                          ? 'default'
                          : order.status === 'processing'
                          ? 'secondary'
                          : 'outline'
                      }
                      className="text-xs"
                    >
                      {order.status}
                    </Badge>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200/50 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Top Products</span>
              <Button variant="outline" size="sm" asChild>
                <a href="/admin/products">View All</a>
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.slice(0, 5).map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="flex items-center gap-3 rounded-lg p-3 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-brand-industrial to-brand-blue text-white font-semibold">
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="truncate text-sm font-medium text-slate-900">
                      {product.name}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <Eye className="h-3 w-3" />
                      {product.views} views
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-slate-900">
                      {product.revenue}
                    </p>
                    <p className="text-xs text-slate-500">{product.sales} sales</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="border-slate-200/50 bg-gradient-to-br from-brand-industrial to-brand-blue-light text-white shadow-lg">
        <CardContent className="p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-xl font-bold">Need Help Getting Started?</h3>
              <p className="mt-1 text-slate-200">
                Check out our documentation or contact support for assistance.
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="secondary" className="bg-white/10 hover:bg-white/20 text-white border-white/20">
                Documentation
              </Button>
              <Button className="bg-brand-orange hover:bg-brand-orange-dark text-white">
                Contact Support
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
