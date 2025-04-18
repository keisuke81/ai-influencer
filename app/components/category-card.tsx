import Image from "next/image"
import Link from "next/link"

interface CategoryCardProps {
  title: string
  imageUrl: string
  href: string
}

export function CategoryCard({ title, imageUrl, href }: CategoryCardProps) {
  return (
    <Link
      href={href}
      className="group overflow-hidden rounded-lg border bg-white shadow-sm transition-all hover:shadow-md"
    >
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-3 text-center">
        <h3 className="font-medium">{title}</h3>
      </div>
    </Link>
  )
}
