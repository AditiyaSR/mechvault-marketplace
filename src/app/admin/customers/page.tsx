'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Filter,
  Mail,
  Phone,
  MapPin,
  Calendar,
  ShoppingCart,
  DollarSign,
  MoreHorizontal,
  Download,
  UserPlus,
  Crown,
  Shield
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  totalOrders: number;
  totalSpent: number;
  joinedDate: string;
  status: 'active' | 'inactive';
  tier: 'bronze' | 'silver' | 'gold';
}

export default function AdminCustomers() {
  const [customers, setCustomers] = useState<Customer[]>([
    {
      id: 'CUST-001',
      name: 'Budi Santoso',
      email: 'budi@email.com',
      phone: '+62 812 3456 7890',
      location: 'Jakarta, Indonesia',
      totalOrders: 12,
      totalSpent: 3580000,
      joinedDate: '2023-05-15',
      status: 'active',
      tier: 'gold'
    },
    {
      id: 'CUST-002',
      name: 'Siti Rahayu',
      email: 'siti@email.com',
      phone: '+62 812 987 6543',
      location: 'Surabaya, Indonesia',
      totalOrders: 8,
      totalSpent: 1192000,
      joinedDate: '2023-08-22',
      status: 'active',
      tier: 'silver'
    },
    {
      id: 'CUST-003',
      name: 'Ahmad Wijaya',
      email: 'ahmad@email.com',
      phone: '+62 812 111 2222',
      location: 'Bandung, Indonesia',
      totalOrders: 5,
      totalSpent: 495000,
      joinedDate: '2023-10-10',
      status: 'active',
      tier: 'bronze'
    },
    {
      id: 'CUST-004',
      name: 'Dewi Kartika',
      email: 'dewi@email.com',
      phone: '+62 812 333 4444',
      location: 'Medan, Indonesia',
      totalOrders: 15,
      totalSpent: 6230000,
      joinedDate: '2023-03-01',
      status: 'active',
      tier: 'gold'
    },
    {
      id: 'CUST-005',
      name: 'Rudi Hartono',
      email: 'rudi@email.com',
      phone: '+62 812 555 6666',
      location: 'Yogyakarta, Indonesia',
      totalOrders: 3,
      totalSpent: 297000,
      joinedDate: '2023-11-18',
      status: 'inactive',
      tier: 'bronze'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterTier, setFilterTier] = useState('all');

  const getTierBadge = (tier: Customer['tier']) => {
    const tierConfig = {
      gold: { variant: 'default' as const, label: 'Gold', icon: Crown, color: 'bg-yellow-500 text-white' },
      silver: { variant: 'secondary' as const, label: 'Silver', icon: Shield, color: 'bg-slate-500 text-white' },
      bronze: { variant: 'outline' as const, label: 'Bronze', icon: Shield, color: 'bg-orange-700 text-white' }
    };

    return tierConfig[tier];
  };

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = filterStatus === 'all' || customer.status === filterStatus;

    const matchesTier = filterTier === 'all' || customer.tier === filterTier;

    return matchesSearch && matchesStatus && matchesTier;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Customer Management</h1>
          <p className="text-slate-600">View and manage your customer database</p>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
          <Button className="bg-gradient-to-r from-brand-orange to-brand-orange-dark text-white">
            <UserPlus className="mr-2 h-4 w-4" />
            Add Customer
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-slate-200/50 bg-gradient-to-br from-brand-orange to-brand-orange-dark text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Total Customers</p>
                <p className="text-2xl font-bold">{customers.length}</p>
              </div>
              <Crown className="h-8 w-8 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200/50 bg-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Active</p>
                <p className="text-2xl font-bold text-green-600">
                  {customers.filter(c => c.status === 'active').length}
                </p>
              </div>
              <Shield className="h-8 w-8 text-brand-blue" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200/50 bg-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Total Revenue</p>
                <p className="text-2xl font-bold text-slate-900">
                  Rp {(customers.reduce((sum, c) => sum + c.totalSpent, 0) / 1000000).toFixed(1)}M
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-brand-orange" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200/50 bg-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Gold Members</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {customers.filter(c => c.tier === 'gold').length}
                </p>
              </div>
              <Crown className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="border-slate-200/50">
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                type="search"
                placeholder="Search by name, email, or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>

            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterTier} onValueChange={setFilterTier}>
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tiers</SelectItem>
                <SelectItem value="gold">Gold</SelectItem>
                <SelectItem value="silver">Silver</SelectItem>
                <SelectItem value="bronze">Bronze</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Customers Table */}
      <Card className="border-slate-200/50">
        <CardContent className="p-0">
          {filteredCustomers.length === 0 ? (
            <div className="flex h-64 flex-col items-center justify-center">
              <Shield className="mb-4 h-16 w-16 text-slate-300" />
              <p className="text-lg font-medium text-slate-900">No customers found</p>
              <p className="text-sm text-slate-500">Try adjusting your filters</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gradient-to-r from-slate-50 to-slate-100">
                    <TableHead>Customer</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Tier</TableHead>
                    <TableHead>Orders</TableHead>
                    <TableHead>Total Spent</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCustomers.map((customer, index) => {
                    const tierConfig = getTierBadge(customer.tier);
                    const TierIcon = tierConfig.icon;

                    return (
                      <motion.tr
                        key={customer.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="hover:bg-slate-50 transition-colors border-b border-slate-100"
                      >
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarFallback className="bg-gradient-to-br from-brand-orange to-brand-orange-light text-white">
                                {customer.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-slate-900">{customer.name}</p>
                              <p className="text-xs text-slate-500">{customer.id}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-sm">
                              <Mail className="h-3 w-3 text-slate-400" />
                              <span className="text-slate-600">{customer.email}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Phone className="h-3 w-3 text-slate-400" />
                              <span className="text-slate-600">{customer.phone}</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2 text-sm text-slate-600">
                            <MapPin className="h-3 w-3" />
                            {customer.location}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={tierConfig.color}>
                            <TierIcon className="mr-1 h-3 w-3" />
                            {tierConfig.label}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2 text-sm text-slate-600">
                            <ShoppingCart className="h-3 w-3" />
                            <span className="font-semibold">{customer.totalOrders}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2 text-sm">
                            <DollarSign className="h-3 w-3 text-brand-orange" />
                            <span className="font-semibold text-slate-900">
                              Rp {(customer.totalSpent / 1000000).toFixed(1)}M
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2 text-sm text-slate-600">
                            <Calendar className="h-3 w-3" />
                            {customer.joinedDate}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>View Details</DropdownMenuItem>
                              <DropdownMenuItem>Edit Customer</DropdownMenuItem>
                              <DropdownMenuItem>View Orders</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600 hover:text-red-700">
                                Deactivate
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </motion.tr>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
