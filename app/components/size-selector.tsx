"use client"

import { useState } from "react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface SizeSelectorProps {
  sizes: string[]
}

export function SizeSelector({ sizes }: SizeSelectorProps) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null)

  return (
    <div>
      <RadioGroup value={selectedSize || ""} onValueChange={setSelectedSize} className="flex flex-wrap gap-2">
        {sizes.map((size) => (
          <div key={size} className="flex items-center">
            <RadioGroupItem value={size} id={`size-${size}`} className="peer sr-only" aria-label={`サイズ ${size}`} />
            <Label
              htmlFor={`size-${size}`}
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-md border bg-white text-sm font-medium transition-colors hover:bg-gray-100 peer-data-[state=checked]:border-red-600 peer-data-[state=checked]:bg-red-50 peer-data-[state=checked]:text-red-600"
            >
              {size}
            </Label>
          </div>
        ))}
      </RadioGroup>
      <div className="mt-2">
        <a href="#" className="text-xs text-gray-500 hover:text-red-600 hover:underline">
          サイズガイドを見る
        </a>
      </div>
    </div>
  )
}
