"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface ProductImageGalleryProps {
  images: string[]
  productName: string
}

export function ProductImageGallery({ images, productName }: ProductImageGalleryProps) {
  const [currentImage, setCurrentImage] = useState(0)
  const [zoomOpen, setZoomOpen] = useState(false)

  const nextImage = () => {
    setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const prevImage = () => {
    setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const selectImage = (index: number) => {
    setCurrentImage(index)
  }

  return (
    <div className="space-y-4">
      <div className="relative aspect-square overflow-hidden rounded-lg border bg-white">
        <Image
          src={images[currentImage] || "/placeholder.svg"}
          alt={`${productName} - 画像 ${currentImage + 1}`}
          fill
          className="object-contain"
        />
        <Button
          variant="outline"
          size="icon"
          className="absolute right-4 top-4 rounded-full bg-white/80 backdrop-blur-sm"
          onClick={() => setZoomOpen(true)}
        >
          <ZoomIn className="h-4 w-4" />
          <span className="sr-only">拡大する</span>
        </Button>
        <div className="absolute inset-0 flex items-center justify-between p-2">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full bg-white/80 backdrop-blur-sm"
            onClick={prevImage}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">前の画像</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full bg-white/80 backdrop-blur-sm"
            onClick={nextImage}
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">次の画像</span>
          </Button>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {images.map((image, index) => (
          <button
            key={index}
            className={`relative aspect-square h-20 w-20 overflow-hidden rounded-md border ${
              currentImage === index ? "border-red-600" : "border-gray-200"
            }`}
            onClick={() => selectImage(index)}
          >
            <Image
              src={image || "/placeholder.svg"}
              alt={`${productName} - サムネイル ${index + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>

      <Dialog open={zoomOpen} onOpenChange={setZoomOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{productName}</DialogTitle>
            <DialogDescription>
              画像 {currentImage + 1} / {images.length}
            </DialogDescription>
          </DialogHeader>
          <div className="relative aspect-square w-full overflow-hidden">
            <Image
              src={images[currentImage] || "/placeholder.svg"}
              alt={`${productName} - 拡大画像 ${currentImage + 1}`}
              fill
              className="object-contain"
            />
          </div>
          <div className="flex justify-center gap-2">
            {images.map((image, index) => (
              <button
                key={index}
                className={`relative aspect-square h-16 w-16 overflow-hidden rounded-md border ${
                  currentImage === index ? "border-red-600" : "border-gray-200"
                }`}
                onClick={() => selectImage(index)}
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${productName} - サムネイル ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
