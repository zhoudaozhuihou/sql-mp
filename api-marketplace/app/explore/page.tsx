'use client'

import { useState } from "react"
import { CategoryTree } from "@/components/category-tree"
import { ApiGrid } from "@/components/api-grid"
import { Input } from "@/components/ui/input"
import { Search } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { ApiCard } from "@/components/api-card";

// 扩展分类数据，添加更多子类目
const categories = [
  {
    id: "data",
    name: "Data & Analytics",
    count: 150,
    subCategories: [
      { 
        id: "database", 
        name: "Database Services", 
        count: 50,
        subCategories: [
          { id: "sql", name: "SQL Databases", count: 20 },
          { id: "nosql", name: "NoSQL Databases", count: 15 },
          { id: "graph", name: "Graph Databases", count: 15 }
        ]
      },
      { 
        id: "analytics", 
        name: "Analytics Tools", 
        count: 45,
        subCategories: [
          { id: "bi", name: "Business Intelligence", count: 15 },
          { id: "metrics", name: "Metrics & Monitoring", count: 15 },
          { id: "reporting", name: "Reporting Tools", count: 15 }
        ]
      },
      { 
        id: "bigdata", 
        name: "Big Data Processing", 
        count: 55,
        subCategories: [
          { id: "streaming", name: "Stream Processing", count: 20 },
          { id: "batch", name: "Batch Processing", count: 20 },
          { id: "etl", name: "ETL Tools", count: 15 }
        ]
      }
    ]
  },
  {
    id: "cloud",
    name: "Cloud",
    count: 120,
    subCategories: [
      { id: "storage", name: "Storage", count: 40 },
      { id: "compute", name: "Compute", count: 35 },
      { id: "serverless", name: "Serverless", count: 45 }
    ]
  },
  {
    id: "application",
    name: "Application",
    count: 200,
    subCategories: [
      { id: "auth", name: "Authentication", count: 60 },
      { id: "payment", name: "Payment", count: 70 },
      { id: "messaging", name: "Messaging", count: 70 }
    ]
  },
  {
    id: "project",
    name: "Project",
    count: 100,
    subCategories: [
      { id: "management", name: "Management", count: 35 },
      { id: "monitoring", name: "Monitoring", count: 30 },
      { id: "deployment", name: "Deployment", count: 35 }
    ]
  }
]

// 模拟API数据
const apis = Array.from({ length: 30 }, (_, i) => ({
  id: `api-${i + 1}`,
  title: `${i % 2 === 0 ? 'Enterprise Analytics Platform API with Extended Capabilities' : 'API'} ${i + 1}`,
  description: "A powerful API that helps you build better applications faster and more efficiently with advanced features and comprehensive documentation.",
  category: categories[Math.floor(i / 8)].name,
  rating: 4 + Math.random(),
  price: ["Free", "$10/mo", "$20/mo", "Custom"][Math.floor(Math.random() * 4)],
  image: `/placeholder.svg?height=200&width=400`
}))

export default function ExplorePage() {
  const [selectedCategory, setSelectedCategory] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6 // 减少每页显示的数量
  
  const filteredApis = selectedCategory 
    ? apis.filter(api => {
        const category = categories.find(c => c.id === selectedCategory) ||
                        categories.find(c => c.subCategories?.some(sc => sc.id === selectedCategory))
        return api.category === category?.name
      })
    : apis

  const totalPages = Math.ceil(filteredApis.length / itemsPerPage)
  const currentApis = filteredApis.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  return (
    <div className="min-h-screen flex flex-col">
      {/* 头部背景区域 */}
      <div 
        className="relative bg-cover bg-center py-8"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.1)), url('/placeholder.svg?height=400&width=1920')`,
        }}
      >
        <div className="container relative">
          {/* 标题部分 - 居中显示 */}
          <div className="text-center mb-6">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2 text-white">
              API Catalog
            </h1>
            <p className="text-base md:text-lg text-white/90">
              Discover and connect with thousands of high-quality APIs
            </p>
          </div>

          {/* 搜索和标签部分 - 居中且宽度可控 */}
          <div className="max-w-2xl mx-auto bg-background/95 backdrop-blur-sm rounded-lg border shadow-lg">
            {/* 搜索框部分 */}
            <div className="relative p-3 border-b">
              <div className="max-w-lg mx-auto relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  className="pl-8 w-full bg-transparent border-none"
                  placeholder="Search for APIs..."
                  type="search"
                />
              </div>
            </div>
            
            {/* 标签部分 */}
            <div className="p-3 flex flex-wrap justify-center gap-2">
              {categories
                .filter(category => !category.id.includes('/'))
                .map((category) => (
                  <Badge
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                    onClick={() => {
                      setSelectedCategory(selectedCategory === category.id ? "" : category.id)
                      setCurrentPage(1)
                    }}
                  >
                    {category.name}
                  </Badge>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* 主要内容区域 - 使用 flex-1 确保填充剩余空间 */}
      <div className="flex-1 container py-4">
        <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-4 h-[calc(100vh-320px)]">
          {/* 左侧类目树 - 独立滚动 */}
          <aside className="border rounded-lg p-3 bg-background/50 backdrop-blur-sm overflow-y-auto">
            <h2 className="font-medium text-sm mb-3 text-muted-foreground uppercase sticky top-0 bg-background/50 backdrop-blur-sm py-1">
              Categories
            </h2>
            <CategoryTree
              categories={categories}
              selectedCategory={selectedCategory}
              onSelect={setSelectedCategory}
            />
          </aside>

          {/* 右侧API列表 - 独立滚动 */}
          <main className="overflow-y-auto pr-2">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 auto-rows-min">
              {currentApis.map((api) => (
                <ApiCard key={api.id} {...api} />
              ))}
            </div>
            
            {/* 分页控件 */}
            {totalPages > 1 && (
              <div className="mt-4 flex justify-center">
                {/* 您现有的分页组件 */}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}

