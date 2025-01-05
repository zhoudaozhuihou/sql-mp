'use client'

import { useState, useEffect } from "react"
import { Typography, IconButton, Collapse, styled } from '@mui/material'
import { ChevronRight, ChevronDown } from 'lucide-react'

const CategoryItem = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0.5, 1),
  cursor: 'pointer',
  borderRadius: theme.shape.borderRadius,
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}))

const CategoryName = styled(Typography)(({ theme }) => ({
  flex: 1,
  marginLeft: theme.spacing(1),
  fontSize: '0.875rem',
}))

const CategoryCount = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: '0.75rem',
}))

const SubCategories = styled('div')(({ theme }) => ({
  marginLeft: theme.spacing(4),
}))

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  padding: 4,
}))

export function CategoryTree({ categories = [], onSelect, selectedCategory }) {
  const [openCategories, setOpenCategories] = useState([])

  useEffect(() => {
    if (selectedCategory && categories) {
      const expandParents = (cats) => {
        for (const cat of cats) {
          if (cat.id === selectedCategory) return true
          if (cat.subCategories) {
            if (expandParents(cat.subCategories)) {
              setOpenCategories(prev => prev.includes(cat.id) ? prev : [...prev, cat.id])
              return true
            }
          }
        }
        return false
      }
      expandParents(categories)
    }
  }, [selectedCategory, categories])

  const toggleCategory = (categoryId, event) => {
    event.stopPropagation()
    setOpenCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    )
  }

  const renderCategory = (category, level = 0) => {
    const hasSubCategories = category.subCategories && category.subCategories.length > 0
    const isOpen = openCategories.includes(category.id)
    const isSelected = selectedCategory === category.id

    return (
      <div key={category.id}>
        <CategoryItem
          onClick={() => onSelect(category.id)}
          sx={{ 
            paddingLeft: `${(level * 12) + 8}px`,
            backgroundColor: isSelected ? 'rgba(0, 0, 0, 0.08)' : 'transparent',
          }}
        >
          {hasSubCategories && (
            <StyledIconButton
              size="small"
              onClick={(e) => toggleCategory(category.id, e)}
            >
              {isOpen ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </StyledIconButton>
          )}
          <CategoryName noWrap>
            {category.name}
          </CategoryName>
          <CategoryCount>
            ({category.count})
          </CategoryCount>
        </CategoryItem>
        {hasSubCategories && (
          <Collapse in={isOpen}>
            <SubCategories>
              {category.subCategories.map(subCategory =>
                renderCategory(subCategory, level + 1)
              )}
            </SubCategories>
          </Collapse>
        )}
      </div>
    )
  }

  if (!categories || categories.length === 0) {
    return <div>No categories available</div>
  }

  return (
    <div>
      {categories.map(category => renderCategory(category, 0))}
    </div>
  )
}

export default CategoryTree

