'use client'

import { useState, useEffect } from 'react'
import { Container, Grid, styled } from '@mui/material'
import { CategoryTree } from '../components/category-tree'
import { ApiGrid } from '../components/api-grid'
import type { Category, Api, ApiResponse } from './types'

const Root = styled('div')(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  minHeight: '100vh',
  backgroundColor: theme.palette.grey[100],
}))

const StyledPaper = styled('div')(({ theme }) => ({
  padding: theme.spacing(2),
  height: '100%',
}))

const Sidebar = styled(StyledPaper)(({ theme }) => ({
  position: 'sticky',
  top: theme.spacing(3),
  maxHeight: `calc(100vh - ${theme.spacing(6)})`,
  overflowY: 'auto',
}))

// Sample data remains the same
const sampleCategories: Category[] = [
  {
    id: '1',
    name: 'Analytics',
    count: 15,
    subCategories: [
      { id: '1-1', name: 'Business Intelligence', count: 8 },
      { id: '1-2', name: 'Data Mining', count: 7 },
    ],
  },
  {
    id: '2',
    name: 'Authentication',
    count: 12,
    subCategories: [
      { id: '2-1', name: 'OAuth', count: 5 },
      { id: '2-2', name: 'SSO', count: 4 },
      { id: '2-3', name: 'Multi-factor', count: 3 },
    ],
  },
  {
    id: '3',
    name: 'Communication',
    count: 20,
    subCategories: [
      { id: '3-1', name: 'Email', count: 8 },
      { id: '3-2', name: 'SMS', count: 6 },
      { id: '3-3', name: 'Voice', count: 6 },
    ],
  },
]

const sampleApis: Api[] = [
  {
    id: '1',
    title: 'Analytics Dashboard API',
    version: 'v2.1.0',
    description: 'Comprehensive analytics API for business intelligence and data visualization',
    category: 'Analytics',
    createdAt: '2023-01-15T10:00:00Z',
    updatedAt: '2023-12-01T15:30:00Z',
    creator: 'Analytics Team',
    team: 'Data Science',
    isPurchased: false,
    price: 299,
  },
  {
    id: '2',
    title: 'OAuth Integration API',
    version: 'v1.5.0',
    description: 'Secure authentication API supporting multiple OAuth providers',
    category: 'Authentication',
    createdAt: '2023-03-20T09:00:00Z',
    updatedAt: '2023-11-15T14:20:00Z',
    creator: 'Security Team',
    team: 'IAM',
    isPurchased: true,
    price: 199,
  },
  {
    id: '3',
    title: 'Email Service API',
    version: 'v3.0.0',
    description: 'High-performance email delivery and tracking API',
    category: 'Communication',
    createdAt: '2023-02-10T11:00:00Z',
    updatedAt: '2023-12-05T16:45:00Z',
    creator: 'Messaging Team',
    team: 'Communications',
    isPurchased: false,
    isExternal: true,
    price: 'Custom',
  },
]

export default function Page() {
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [currentPage, setCurrentPage] = useState(1)
  const [apiData, setApiData] = useState<ApiResponse>({
    apis: [],
    totalPages: 0,
    currentPage: 1,
  })
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Simulate API fetch
    const fetchApis = async () => {
      setIsLoading(true)
      setError(null)
      
      try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Filter APIs by selected category if needed
        const filteredApis = selectedCategory 
          ? sampleApis.filter(api => api.category === selectedCategory)
          : sampleApis

        setApiData({
          apis: filteredApis,
          totalPages: Math.ceil(filteredApis.length / 6),
          currentPage: 1,
        })
      } catch (err) {
        setError('Failed to fetch APIs. Please try again later.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchApis()
  }, [selectedCategory])

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId)
    setCurrentPage(1)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <Root>
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <Sidebar>
              <CategoryTree
                categories={sampleCategories}
                onSelect={handleCategorySelect}
                selectedCategory={selectedCategory}
              />
            </Sidebar>
          </Grid>
          <Grid item xs={12} md={9}>
            <StyledPaper>
              <ApiGrid
                apis={apiData.apis}
                currentPage={currentPage}
                totalPages={apiData.totalPages}
                onPageChange={handlePageChange}
                isLoading={isLoading}
                error={error}
              />
            </StyledPaper>
          </Grid>
        </Grid>
      </Container>
    </Root>
  )
}

