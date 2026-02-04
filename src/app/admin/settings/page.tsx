'use client';

import { useState } from 'react';
import {
  Save,
  RefreshCw,
  Globe,
  Mail,
  Phone,
  MapPin,
  Palette,
  Shield,
  Bell,
  Database,
  CreditCard,
  Building2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function AdminSettings() {
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState({
    siteName: 'MechVault',
    siteUrl: 'https://mechvault.com',
    contactEmail: 'admin@mechvault.com',
    contactPhone: '+62 812 3456 7890',
    address: 'Jakarta, Indonesia',
    currency: 'IDR',
    currencySymbol: 'Rp',
    whatsappNumber: '6281234567890',
    shopeeShopUrl: 'https://shopee.com/mechvault',
    enableNotifications: true,
    enableAutoBackup: true,
    maintenanceMode: false,
    primaryColor: '#F97316',
    secondaryColor: '#0F172A'
  });

  const handleSave = async () => {
    setSaving(true);
    // Simulate save
    setTimeout(() => {
      setSaving(false);
      alert('Settings saved successfully!');
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
          <p className="text-slate-600">Configure your application settings</p>
        </div>

        <Button
          onClick={handleSave}
          disabled={saving}
          className="bg-gradient-to-r from-brand-orange to-brand-orange-dark text-white"
        >
          {saving ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </>
          )}
        </Button>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="store">Store</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="border-slate-200/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-brand-orange" />
                  Site Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="siteName">Site Name</Label>
                  <Input
                    id="siteName"
                    value={settings.siteName}
                    onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                    placeholder="MechVault"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="siteUrl">Site URL</Label>
                  <Input
                    id="siteUrl"
                    type="url"
                    value={settings.siteUrl}
                    onChange={(e) => setSettings({ ...settings, siteUrl: e.target.value })}
                    placeholder="https://mechvault.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Contact Email</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={settings.contactEmail}
                    onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                    placeholder="admin@mechvault.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contactPhone">Contact Phone</Label>
                  <Input
                    id="contactPhone"
                    type="tel"
                    value={settings.contactPhone}
                    onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })}
                    placeholder="+62 812 3456 7890"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Business Address</Label>
                  <Textarea
                    id="address"
                    value={settings.address}
                    onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                    placeholder="Your business address"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-200/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5 text-brand-blue" />
                  Appearance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="primaryColor">Primary Color</Label>
                  <div className="flex gap-2">
                    <Input
                      id="primaryColor"
                      type="color"
                      value={settings.primaryColor}
                      onChange={(e) => setSettings({ ...settings, primaryColor: e.target.value })}
                      className="h-10 w-20"
                    />
                    <Input
                      value={settings.primaryColor}
                      onChange={(e) => setSettings({ ...settings, primaryColor: e.target.value })}
                      className="flex-1"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="secondaryColor">Secondary Color</Label>
                  <div className="flex gap-2">
                    <Input
                      id="secondaryColor"
                      type="color"
                      value={settings.secondaryColor}
                      onChange={(e) => setSettings({ ...settings, secondaryColor: e.target.value })}
                      className="h-10 w-20"
                    />
                    <Input
                      value={settings.secondaryColor}
                      onChange={(e) => setSettings({ ...settings, secondaryColor: e.target.value })}
                      className="flex-1"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Store Settings */}
        <TabsContent value="store">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="border-slate-200/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-brand-orange" />
                  Store Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Select
                    value={settings.currency}
                    onValueChange={(value) => setSettings({ ...settings, currency: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="IDR">IDR (Indonesian Rupiah)</SelectItem>
                      <SelectItem value="USD">USD (US Dollar)</SelectItem>
                      <SelectItem value="EUR">EUR (Euro)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="currencySymbol">Currency Symbol</Label>
                  <Input
                    id="currencySymbol"
                    value={settings.currencySymbol}
                    onChange={(e) => setSettings({ ...settings, currencySymbol: e.target.value })}
                    placeholder="Rp"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="whatsappNumber">WhatsApp Number</Label>
                  <Input
                    id="whatsappNumber"
                    value={settings.whatsappNumber}
                    onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                    placeholder="6281234567890"
                  />
                  <p className="text-xs text-slate-500">
                    This will be used for order notifications
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-200/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-brand-blue" />
                  Payment & Social
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="shopeeShopUrl">Shopee Shop URL</Label>
                  <Input
                    id="shopeeShopUrl"
                    type="url"
                    value={settings.shopeeShopUrl}
                    onChange={(e) => setSettings({ ...settings, shopeeShopUrl: e.target.value })}
                    placeholder="https://shopee.com/mechvault"
                  />
                </div>

                <Separator />

                <div>
                  <Label>Connected Platforms</Label>
                  <div className="mt-3 space-y-2">
                    <div className="flex items-center justify-between rounded-lg bg-green-50 p-3">
                      <div className="flex items-center gap-2">
                        <Badge className="bg-green-600 text-white">Google Sheets</Badge>
                        <span className="text-sm text-slate-700">Connected</span>
                      </div>
                      <Badge className="bg-green-100 text-green-700">Active</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Notifications Settings */}
        <TabsContent value="notifications">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="border-slate-200/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-brand-orange" />
                  Notification Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border border-slate-200 p-4">
                  <div className="space-y-1">
                    <Label htmlFor="enableNotifications" className="text-base">
                      Enable Notifications
                    </Label>
                    <p className="text-sm text-slate-500">
                      Receive alerts for new orders and updates
                    </p>
                  </div>
                  <Switch
                    id="enableNotifications"
                    checked={settings.enableNotifications}
                    onCheckedChange={(checked) =>
                      setSettings({ ...settings, enableNotifications: checked })
                    }
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-200/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-brand-blue" />
                  Email Notifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { label: 'New Orders', description: 'Get notified when new orders arrive' },
                  { label: 'Order Updates', description: 'Updates on order status changes' },
                  { label: 'Customer Messages', description: 'Messages from customers' },
                  { label: 'System Alerts', description: 'Important system notifications' }
                ].map((item, index) => (
                  <div key={item.label} className="flex items-center justify-between rounded-lg border border-slate-200 p-3">
                    <div className="space-y-1">
                      <Label className="text-base">{item.label}</Label>
                      <p className="text-sm text-slate-500">{item.description}</p>
                    </div>
                    <Switch defaultChecked={true} />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Advanced Settings */}
        <TabsContent value="advanced">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="border-slate-200/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-brand-orange" />
                  Security
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border border-slate-200 p-4">
                  <div className="space-y-1">
                    <Label htmlFor="maintenanceMode" className="text-base">
                      Maintenance Mode
                    </Label>
                    <p className="text-sm text-slate-500">
                      Temporarily disable the site for maintenance
                    </p>
                  </div>
                  <Switch
                    id="maintenanceMode"
                    checked={settings.maintenanceMode}
                    onCheckedChange={(checked) =>
                      setSettings({ ...settings, maintenanceMode: checked })
                    }
                  />
                </div>

                {settings.maintenanceMode && (
                  <div className="rounded-lg bg-amber-50 border border-amber-200 p-4">
                    <p className="text-sm text-amber-800 font-medium">
                      ⚠️ Maintenance mode is currently active. Your site will not be accessible to visitors.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="border-slate-200/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5 text-brand-blue" />
                  Data & Backup
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border border-slate-200 p-4">
                  <div className="space-y-1">
                    <Label htmlFor="enableAutoBackup" className="text-base">
                      Automatic Backup
                    </Label>
                    <p className="text-sm text-slate-500">
                      Daily backup of product data
                    </p>
                  </div>
                  <Switch
                    id="enableAutoBackup"
                    checked={settings.enableAutoBackup}
                    onCheckedChange={(checked) =>
                      setSettings({ ...settings, enableAutoBackup: checked })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label>Last Backup</Label>
                  <div className="rounded-lg bg-slate-50 p-3">
                    <p className="text-sm font-medium text-slate-700">
                      15 January 2024 at 02:30 AM
                    </p>
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => alert('Backup initiated!')}
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Backup Now
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
