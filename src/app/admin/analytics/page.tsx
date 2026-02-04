'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  TrendingDown,
  Users,
  Eye,
  ShoppingCart,
  DollarSign,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  MoreHorizontal,
  Target
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
import { Progress } from '@/components/ui/progress';

export default function AdminAnalytics() {
  const [timeRange, setTimeRange] = useState('30d');

  const metrics = [
    {
      title: 'Total Views',
      value: '125,430',
      change: '+23.5%',
      trend: 'up' as const,
      icon: Eye,
      color: 'from-brand-blue to-brand-blue-light'
    },
    {
      title: 'Unique Visitors',
      value: '45,230',
      change: '+18.2%',
      trend: 'up' as const,
      icon: Users,
      color: 'from-brand-orange to-brand-orange-light'
    },
    {
      title: 'Conversion Rate',
      value: '4.8%',
      change: '+5.1%',
      trend: 'up' as const,
      icon: Target,
      color: 'from-brand-industrial to-brand-industrial-light'
    },
    {
      title: 'Avg. Order Value',
      value: 'Rp 245K',
      change: '-2.3%',
      trend: 'down' as const,
      icon: DollarSign,
      color: 'from-brand-orange-light to-brand-orange-darker'
    }
  ];

  const monthlyData = [
    { month: 'Jan', views: 8500, orders: 412, revenue: 'Rp 98.5M' },
    { month: 'Feb', views: 9200, orders: 489, revenue: 'Rp 108.2M' },
    { month: 'Mar', views: 11000, orders: 567, revenue: 'Rp 132.4M' },
    { month: 'Apr', views: 10500, orders: 523, revenue: 'Rp 121.8M' },
    { month: 'May', views: 12500, orders: 634, revenue: 'Rp 145.2M' },
    { month: 'Jun', views: 14000, orders: 712, revenue: 'Rp 162.8M' },
  ];

  const topPages = [
    { page: '/market', views: 45230, percentage: 36 },
    { page: '/', views: 31280, percentage: 25 },
    { page: '/product/PROD-001', views: 18760, percentage: 15 },
    { page: '/product/PROD-002', views: 12540, percentage: 10 },
    { page: '/category/CAD', views: 12540, percentage: 10 },
  ];

  const trafficSources = [
    { source: 'Direct', percentage: 45, color: 'bg-brand-orange' },
    { source: 'Google Search', percentage: 30, color: 'bg-brand-blue' },
    { source: 'Social Media', percentage: 15, color: 'bg-brand-industrial' },
    { source: 'Referral', percentage: 10, color: 'bg-brand-orange-light' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Analytics Dashboard</h1>
          <p className="text-slate-600">Track your website performance and metrics</p>
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

      {/* Metrics Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          const TrendIcon = metric.trend === 'up' ? ArrowUpRight : ArrowDownRight;

          return (
            <motion.div
              key={metric.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden border-slate-200/50 bg-white shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-slate-600">
                    {metric.title}
                  </CardTitle>
                  <div className={`rounded-lg bg-gradient-to-br ${metric.color} p-2`}>
                    <Icon className="h-4 w-4 text-white" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-baseline gap-2">
                    <div className="text-2xl font-bold text-slate-900">
                      {metric.value}
                    </div>
                    <div
                      className={`flex items-center gap-1 text-sm font-medium ${
                        metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      <TrendIcon className="h-3 w-3" />
                      {metric.change}
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
              <span>Traffic Overview</span>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-end justify-between gap-3 px-2">
              {monthlyData.map((data, index) => {
                const maxViews = Math.max(...monthlyData.map(d => d.views));
                const height = (data.views / maxViews) * 100;

                return (
                  <motion.div
                    key={data.month}
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    className="flex-1 rounded-t bg-gradient-to-t from-brand-blue to-brand-orange relative group cursor-pointer hover:opacity-80"
                  >
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 hidden w-max rounded-lg bg-slate-900 px-3 py-2 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
                      <div className="font-semibold">{data.month}</div>
                      <div>Views: {data.views.toLocaleString()}</div>
                      <div>Orders: {data.orders}</div>
                      <div className="text-brand-orange">{data.revenue}</div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
            <div className="mt-4 flex justify-between text-xs text-slate-500">
              {monthlyData.map(data => (
                <span key={data.month}>{data.month}</span>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200/50 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Traffic Sources</span>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {trafficSources.map((source, index) => (
              <div key={source.source} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-slate-700">{source.source}</span>
                  <span className="text-slate-500">{source.percentage}%</span>
                </div>
                <Progress value={source.percentage} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Top Pages */}
      <Card className="border-slate-200/50 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Top Performing Pages</span>
            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topPages.map((page, index) => (
              <motion.div
                key={page.page}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="flex items-center gap-4 rounded-lg p-3 hover:bg-slate-50 transition-colors"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-brand-industrial to-brand-blue text-white font-semibold">
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-mono text-sm font-medium text-slate-900 truncate">
                    {page.page}
                  </p>
                  <p className="text-xs text-slate-500">{page.views.toLocaleString()} page views</p>
                </div>
                <div className="text-right min-w-[80px]">
                  <Badge className={`bg-gradient-to-r ${index === 0 ? 'from-brand-orange to-brand-orange-dark text-white' : ''}`}>
                    {page.percentage}% of total
                  </Badge>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Revenue Breakdown */}
      <div className="grid gap-6 lg:grid-cols-2">
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
              { name: 'CAD Library', value: 45, revenue: 'Rp 145.2M', color: 'bg-brand-orange' },
              { name: '3D Print', value: 30, revenue: 'Rp 89.6M', color: 'bg-brand-blue' },
              { name: 'Tutorials', value: 15, revenue: 'Rp 34.8M', color: 'bg-brand-industrial' },
              { name: 'Blueprints', value: 10, revenue: 'Rp 28.3M', color: 'bg-brand-orange-light' }
            ].map((category, index) => (
              <div key={category.name} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-slate-700">{category.name}</span>
                  <div className="text-right">
                    <span className="text-slate-500">{category.value}%</span>
                    <p className="font-semibold text-slate-900">{category.revenue}</p>
                  </div>
                </div>
                <Progress value={category.value} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-slate-200/50 bg-gradient-to-br from-brand-industrial to-brand-blue text-white">
          <CardHeader>
            <CardTitle className="text-white">Performance Goals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { label: 'Monthly Revenue Goal', current: 'Rp 145.2M', goal: 'Rp 200M', progress: 73 },
                { label: 'Conversion Rate Target', current: '4.8%', goal: '6.0%', progress: 80 },
                { label: 'Customer Satisfaction', current: '92%', goal: '95%', progress: 97 }
              ].map((goal, index) => (
                <div key={goal.label} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{goal.label}</span>
                    <span className="text-sm opacity-90">
                      {goal.current} / {goal.goal}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Progress value={goal.progress} className="flex-1 h-2" />
                    <span className="text-sm font-semibold min-w-[50px] text-right">
                      {goal.progress}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
