import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

interface ProductCardProps {
  name: string
  brand: string
  price: number
  imageUrl: string
  href: string
  isNew?: boolean
  isPopular?: boolean
  isSale?: boolean
}

export function ProductCard({ name, brand, price, imageUrl, href, isNew, isPopular, isSale }: ProductCardProps) {
  return (
    <Link
      href={href}
      className="group overflow-hidden rounded-lg border bg-white shadow-sm transition-all hover:shadow-md"
    >
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt={name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {isNew && <Badge className="absolute left-2 top-2 bg-blue-600">新着</Badge>}
        {isPopular && <Badge className="absolute left-2 top-2 bg-red-600">人気</Badge>}
        {isSale && <Badge className="absolute left-2 top-2 bg-green-600">セール</Badge>}
      </div>
      <div className="p-3">
        <p className="mb-1 text-xs text-gray-500">{brand}</p>
        <h3 className="mb-2 line-clamp-2 text-sm font-medium">{name}</h3>
        <p className="font-bold text-red-600">¥{price.toLocaleString()}</p>
      </div>
    </Link>
  )
}
