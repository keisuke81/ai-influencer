import Image from "next/image"
import Link from "next/link"

interface BrandCardProps {
  name: string
  imageUrl: string
  href: string
}

export function BrandCard({ name, imageUrl, href }: BrandCardProps) {
  return (
    <Link
      href={href}
      className="group overflow-hidden rounded-lg border bg-white p-4 shadow-sm transition-all hover:shadow-md"
    >
      <div className="relative mx-auto mb-3 aspect-square h-24 w-24 overflow-hidden">
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt={name}
          fill
          className="object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="text-center">
        <h3 className="font-medium">{name}</h3>
      </div>
    </Link>
  )
}
