import { ChevronRight, ChevronDown } from 'lucide-react'
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface Category {
  id: string
  name: string
  count: number
  subCategories?: Category[]
}

interface CategoryTreeProps {
  categories: Category[]
  onSelect: (categoryId: string) => void
  selectedCategory: string
}

export function CategoryTree({ categories, onSelect, selectedCategory }: CategoryTreeProps) {
  const [openCategories, setOpenCategories] = useState<string[]>([])

  useEffect(() => {
    if (selectedCategory) {
      // 展开所有父类目
      const expandParents = (cats: Category[]): boolean => {
        for (const cat of cats) {
          if (cat.id === selectedCategory) return true;
          if (cat.subCategories) {
            if (expandParents(cat.subCategories)) {
              setOpenCategories(prev => prev.includes(cat.id) ? prev : [...prev, cat.id]);
              return true;
            }
          }
        }
        return false;
      };
      expandParents(categories);
    }
  }, [selectedCategory, categories])

  const toggleCategory = (categoryId: string) => {
    setOpenCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    )
  }

  const renderCategory = (category: Category, level: number = 0) => {
    const hasSubCategories = category.subCategories && category.subCategories.length > 0
    const isOpen = openCategories.includes(category.id)
    const isSelected = selectedCategory === category.id

    return (
      <div key={category.id} className="w-full">
        <div
          className={cn(
            "flex items-center gap-2 px-2 py-1.5 text-sm rounded-md cursor-pointer",
            "hover:bg-accent hover:text-accent-foreground",
            isSelected && "bg-accent text-accent-foreground",
          )}
          style={{ paddingLeft: `${level * 12 + 8}px` }}
          onClick={() => onSelect(category.id)}
        >
          {hasSubCategories && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                toggleCategory(category.id)
              }}
              className="p-1 hover:bg-muted rounded"
            >
              {isOpen ? (
                <ChevronDown className="h-3 w-3" />
              ) : (
                <ChevronRight className="h-3 w-3" />
              )}
            </button>
          )}
          <span className="flex-1 truncate">{category.name}</span>
          <span className="text-muted-foreground text-xs shrink-0">({category.count})</span>
        </div>
        {hasSubCategories && isOpen && (
          <div className="ml-2">
            {category.subCategories.map(subCategory =>
              renderCategory(subCategory, level + 1)
            )}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="w-full space-y-1 overflow-y-auto">
      {categories.map(category => renderCategory(category))}
    </div>
  )
}

