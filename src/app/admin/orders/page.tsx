'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Filter,
  Download,
  Eye,
  Package,
  CheckCircle,
  Clock,
  XCircle,
  MoreHorizontal,
  Calendar,
  ArrowRight,
  RefreshCw
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';

interface Order {
  id: string;
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  product: {
    id: string;
    name: string;
    image: string;
  };
  amount: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  date: string;
  paymentMethod: string;
}

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'ORD-2024-001',
      customer: {
        name: 'Budi Santoso',
        email: 'budi@email.com',
        phone: '+62 812 3456 7890'
      },
      product: {
        id: 'PROD-001',
        name: 'Mechanical Gear Assembly',
        image: 'https://via.placeholder.com/150'
      },
      amount: 299000,
      status: 'completed',
      date: '2024-01-15 10:30',
      paymentMethod: 'Transfer Bank'
    },
    {
      id: 'ORD-2024-002',
      customer: {
        name: 'Siti Rahayu',
        email: 'siti@email.com',
        phone: '+62 812 987 6543'
      },
      product: {
        id: 'PROD-002',
        name: '3D Printer Model',
        image: 'https://via.placeholder.com/150'
      },
      amount: 149000,
      status: 'processing',
      date: '2024-01-15 11:45',
      paymentMethod: 'E-Wallet'
    },
    {
      id: 'ORD-2024-003',
      customer: {
        name: 'Ahmad Wijaya',
        email: 'ahmad@email.com',
        phone: '+62 812 111 2222'
      },
      product: {
        id: 'PROD-003',
        name: 'AutoCAD Blueprint',
        image: 'https://via.placeholder.com/150'
      },
      amount: 99000,
      status: 'pending',
      date: '2024-01-15 14:20',
      paymentMethod: 'ShopeePay'
    },
    {
      id: 'ORD-2024-004',
      customer: {
        name: 'Dewi Kartika',
        email: 'dewi@email.com',
        phone: '+62 812 333 4444'
      },
      product: {
        id: 'PROD-004',
        name: 'Industrial Robot Design',
        image: 'https://via.placeholder.com/150'
      },
      amount: 499000,
      status: 'completed',
      date: '2024-01-14 16:15',
      paymentMethod: 'Transfer Bank'
    },
    {
      id: 'ORD-2024-005',
      customer: {
        name: 'Rudi Hartono',
        email: 'rudi@email.com',
        phone: '+62 812 555 6666'
      },
      product: {
        id: 'PROD-005',
        name: 'CAD Template Bundle',
        image: 'https://via.placeholder.com/150'
      },
      amount: 199000,
      status: 'cancelled',
      date: '2024-01-14 09:30',
      paymentMethod: 'Credit Card'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const getStatusBadge = (status: Order['status']) => {
    const statusConfig = {
      pending: { variant: 'secondary' as const, label: 'Pending', icon: Clock, color: 'text-yellow-600' },
      processing: { variant: 'default' as const, label: 'Processing', icon: Package, color: 'text-blue-600' },
      completed: { variant: 'default' as const, label: 'Completed', icon: CheckCircle, color: 'text-green-600' },
      cancelled: { variant: 'outline' as const, label: 'Cancelled', icon: XCircle, color: 'text-red-600' }
    };

    return statusConfig[status];
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch =
      order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.product.name.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = filterStatus === 'all' || order.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setIsDetailModalOpen(true);
  };

  const handleUpdateStatus = (orderId: string, newStatus: Order['status']) => {
    setOrders(orders.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Orders Management</h1>
          <p className="text-slate-600">Monitor and manage all customer orders</p>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="icon">
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-slate-200/50 bg-gradient-to-br from-brand-orange to-brand-orange-dark text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Total Orders</p>
                <p className="text-2xl font-bold">{orders.length}</p>
              </div>
              <Package className="h-8 w-8 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200/50 bg-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {orders.filter(o => o.status === 'pending').length}
                </p>
              </div>
              <Clock className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200/50 bg-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Processing</p>
                <p className="text-2xl font-bold text-blue-600">
                  {orders.filter(o => o.status === 'processing').length}
                </p>
              </div>
              <Package className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200/50 bg-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Completed</p>
                <p className="text-2xl font-bold text-green-600">
                  {orders.filter(o => o.status === 'completed').length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
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
                placeholder="Search by order ID, customer name, or product..."
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
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card className="border-slate-200/50">
        <CardContent className="p-0">
          {filteredOrders.length === 0 ? (
            <div className="flex h-64 flex-col items-center justify-center">
              <Package className="mb-4 h-16 w-16 text-slate-300" />
              <p className="text-lg font-medium text-slate-900">No orders found</p>
              <p className="text-sm text-slate-500">Try adjusting your filters</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gradient-to-r from-slate-50 to-slate-100">
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Payment</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order, index) => {
                    const statusConfig = getStatusBadge(order.status);
                    const StatusIcon = statusConfig.icon;

                    return (
                      <motion.tr
                        key={order.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="hover:bg-slate-50 transition-colors border-b border-slate-100"
                      >
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium text-slate-900">{order.customer.name}</p>
                            <p className="text-xs text-slate-500">{order.customer.email}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 overflow-hidden rounded-lg bg-slate-100">
                              <img
                                src={order.product.image}
                                alt={order.product.name}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div>
                              <p className="font-medium text-slate-900">{order.product.name}</p>
                              <p className="text-xs text-slate-500">{order.product.id}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <p className="font-semibold text-slate-900">Rp {order.amount.toLocaleString('id-ID')}</p>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-xs">
                            {order.paymentMethod}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2 text-sm text-slate-600">
                            <Calendar className="h-3 w-3" />
                            {order.date}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={statusConfig.variant}
                            className={`${
                              order.status === 'completed'
                                ? 'bg-green-100 text-green-700'
                                : order.status === 'pending'
                                ? 'bg-yellow-100 text-yellow-700'
                                : order.status === 'processing'
                                ? 'bg-blue-100 text-blue-700'
                                : 'bg-red-100 text-red-700'
                            }`}
                          >
                            <StatusIcon className="mr-1 h-3 w-3" />
                            {statusConfig.label}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleViewOrder(order)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
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

      {/* Order Detail Modal */}
      <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
        <DialogContent className="max-w-2xl">
          {selectedOrder && (
            <>
              <DialogHeader>
                <DialogTitle>Order Details - {selectedOrder.id}</DialogTitle>
                <DialogDescription>
                  View complete order information and update status
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                {/* Status Update */}
                <div className="flex items-center justify-between rounded-lg bg-slate-50 p-4">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Current Status</p>
                    <p className="text-xs text-slate-500">Last updated: {selectedOrder.date}</p>
                  </div>
                  <div className="flex gap-2">
                    {(['pending', 'processing', 'completed', 'cancelled'] as const).map((status) => {
                      const config = getStatusBadge(status);
                      const StatusIcon = config.icon;
                      const isActive = selectedOrder.status === status;

                      return (
                        <Button
                          key={status}
                          variant={isActive ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => handleUpdateStatus(selectedOrder.id, status)}
                          className={isActive ? 'bg-brand-orange hover:bg-brand-orange-dark text-white' : ''}
                        >
                          <StatusIcon className="mr-1 h-4 w-4" />
                          {config.label}
                        </Button>
                      );
                    })}
                  </div>
                </div>

                <Separator />

                {/* Customer Information */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-slate-900">Customer Information</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <p className="text-sm text-slate-500">Name</p>
                      <p className="font-medium text-slate-900">{selectedOrder.customer.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Email</p>
                      <p className="font-medium text-slate-900">{selectedOrder.customer.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Phone</p>
                      <p className="font-medium text-slate-900">{selectedOrder.customer.phone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Payment Method</p>
                      <p className="font-medium text-slate-900">{selectedOrder.paymentMethod}</p>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Product Information */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-slate-900">Product Information</h3>
                  <div className="flex items-center gap-4 rounded-lg border border-slate-200 p-4">
                    <div className="h-20 w-20 overflow-hidden rounded-lg bg-slate-100">
                      <img
                        src={selectedOrder.product.image}
                        alt={selectedOrder.product.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-slate-900">{selectedOrder.product.name}</p>
                      <p className="text-sm text-slate-500">{selectedOrder.product.id}</p>
                      <p className="mt-2 text-lg font-bold text-brand-orange">
                        Rp {selectedOrder.amount.toLocaleString('id-ID')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
