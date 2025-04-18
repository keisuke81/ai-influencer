"use client"

import type React from "react"

import { useState } from "react"
import { Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface QuantitySelectorProps {
  max: number
  defaultValue?: number
}

export function QuantitySelector({ max, defaultValue = 1 }: QuantitySelectorProps) {
  const [quantity, setQuantity] = useState(defaultValue)

  const increment = () => {
    if (quantity < max) {
      setQuantity(quantity + 1)
    }
  }

  const decrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value)
    if (!isNaN(value) && value >= 1 && value <= max) {
      setQuantity(value)
    }
  }

  return (
    <div className="flex w-32 items-center">
      <Button
        variant="outline"
        size="icon"
        className="h-10 w-10 rounded-r-none"
        onClick={decrement}
        disabled={quantity <= 1}
      >
        <Minus className="h-4 w-4" />
        <span className="sr-only">減らす</span>
      </Button>
      <Input
        type="text"
        inputMode="numeric"
        value={quantity}
        onChange={handleChange}
        className="h-10 w-12 rounded-none border-x-0 p-0 text-center"
        aria-label="数量"
      />
      <Button
        variant="outline"
        size="icon"
        className="h-10 w-10 rounded-l-none"
        onClick={increment}
        disabled={quantity >= max}
      >
        <Plus className="h-4 w-4" />
        <span className="sr-only">増やす</span>
      </Button>
    </div>
  )
}
