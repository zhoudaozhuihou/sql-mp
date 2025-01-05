export interface Api {
  id: string
  title: string
  version: string
  description: string
  category: string
  createdAt: string
  updatedAt: string
  creator: string
  team: string
  isPurchased: boolean
  isExternal?: boolean
  price: string | number | 'Custom'
}

export interface Category {
  id: string
  name: string
  count: number
  subCategories?: Category[]
}

export interface ApiResponse {
  apis: Api[]
  totalPages: number
  currentPage: number
}

export interface ApiGridProps {
  apis?: Api[]
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  isLoading?: boolean
  error?: string | null
}

export interface CategoryTreeProps {
  categories?: Category[]
  onSelect: (categoryId: string) => void
  selectedCategory?: string
}

