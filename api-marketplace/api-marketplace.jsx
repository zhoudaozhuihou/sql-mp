'use client'

import { useState } from 'react'
import { Search, Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card'

// Sample data for categories
const categories = [
  {
    name: 'Analytics & Data',
    count: 15,
  },
  {
    name: 'Artificial Intelligence',
    count: 25,
  },
  {
    name: 'Authentication & Security',
    count: 18,
  },
  {
    name: 'Communication',
    count: 20,
  },
  {
    name: 'Payment & Finance',
    count: 12,
  },
  {
    name: 'Cloud Services',
    count: 22,
  },
  {
    name: 'Media & Content',
    count: 16,
  },
  {
    name: 'E-commerce',
    count: 14,
  },
  {
    name: 'Developer Tools',
    count: 19,
  },
  {
    name: 'Internet of Things',
    count: 10,
  },
]

// Sample data for APIs
const apis = [
  {
    id: 1,
    name: 'Payment Processing API',
    status: 'Published',
    version: '2.1.0',
    description: 'Secure payment processing solution with support for multiple payment methods and currencies. Includes fraud detection and chargeback protection.',
    created: '2023-01-15',
    updated: '2023-12-20',
    tags: ['finance', 'payment', 'security'],
    purchaseStatus: 'Available for Purchase'
  },
  {
    id: 2,
    name: 'Authentication Service',
    status: 'Published',
    version: '1.5.0',
    description: 'Complete authentication and authorization solution with OAuth 2.0 support, MFA, and SSO capabilities.',
    created: '2023-03-10',
    updated: '2023-11-28',
    tags: ['auth', 'security', 'oauth'],
    purchaseStatus: 'Purchased'
  },
  {
    id: 3,
    name: 'Data Analytics Engine',
    status: 'Published',
    version: '3.0.0',
    description: 'Advanced analytics API for processing and visualizing large datasets with machine learning capabilities.',
    created: '2023-06-20',
    updated: '2023-12-15',
    tags: ['analytics', 'ml', 'data'],
    purchaseStatus: 'Available for Purchase'
  },
]

export default function APIMarketplace() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(null)

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url("/placeholder.svg?height=400&width=1920")',
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            backgroundBlend: 'overlay'
          }}
        />
        <div className="relative z-10 mx-auto max-w-4xl px-4 py-16 text-center">
          <h1 className="mb-8 text-4xl font-bold text-white">
            Find the Perfect API for Your Project
          </h1>
          <div className="mx-auto mb-6 max-w-2xl">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                type="search"
                placeholder="Search APIs..."
                className="h-12 bg-white pl-10 text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <Button variant="outline" className="bg-white hover:bg-gray-100">
            <Upload className="mr-2 h-4 w-4" />
            Add API Documentation
          </Button>
        </div>
        <div className="relative z-10 mx-auto max-w-4xl px-4 pb-6">
          <div className="flex flex-wrap justify-center gap-2">
            {['Authentication', 'Payment', 'AI & ML', 'Data Analytics', 'Cloud Storage'].map((category) => (
              <Badge
                key={category}
                variant="secondary"
                className="cursor-pointer bg-white/90 px-4 py-2 text-sm hover:bg-white"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="flex gap-8">
          {/* Categories Sidebar */}
          <div className="w-64 flex-shrink-0">
            <h2 className="mb-4 text-xl font-semibold">Categories</h2>
            <div className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category.name}
                  className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left hover:bg-muted"
                  onClick={() => setSelectedCategory(category.name)}
                >
                  <span>{category.name}</span>
                  <span className="text-sm text-muted-foreground">({category.count})</span>
                </button>
              ))}
            </div>
          </div>

          {/* API Grid */}
          <div className="flex-1">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {apis.map((api) => (
                <Card key={api.id} className="flex flex-col">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-xl">
                          {api.name}
                        </CardTitle>
                        <div className="flex items-center gap-2">
                          <Badge variant={api.status === 'Published' ? 'default' : 'secondary'}>
                            {api.status}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            Version {api.version}
                          </span>
                        </div>
                      </div>
                    </div>
                    <CardDescription className="line-clamp-2">
                      {api.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Created: {api.created}</span>
                        <span>Updated: {api.updated}</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {api.tags.map((tag) => (
                          <Badge key={tag} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="mt-auto flex flex-col gap-3">
                    <Button variant="outline" className="w-full">
                      View Details
                    </Button>
                    <Button 
                      variant={api.purchaseStatus === 'Purchased' ? 'secondary' : 'default'}
                      className="w-full"
                      disabled={api.purchaseStatus === 'Purchased'}
                    >
                      {api.purchaseStatus}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

