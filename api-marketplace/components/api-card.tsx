import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star } from 'lucide-react'

interface ApiCardProps {
  title: string
  description: string
  category: string
  rating: number
  price: string
}

export function ApiCard({ title, description, category, rating, price }: ApiCardProps) {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="space-y-1.5 p-4">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-base line-clamp-2 leading-tight">
            {title}
          </CardTitle>
          <Badge variant="secondary" className="shrink-0">
            {category}
          </Badge>
        </div>
        <CardDescription className="line-clamp-2 text-xs">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-primary text-primary" />
            <span className="text-sm">{rating.toFixed(1)}</span>
          </div>
          <span className="text-sm font-medium">{price}</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 mt-auto">
        <Button size="sm" className="w-full">
          View Details
        </Button>
      </CardFooter>
    </Card>
  )
}

