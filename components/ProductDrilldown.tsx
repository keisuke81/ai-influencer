"use client"

import { useState, useEffect } from "react"
import type { GroupedData } from "@/lib/types"
import { getAllBrands, getProductsForBrand } from "@/lib/utils"
import ProductChart from "./ProductChart"
import ProductTable from "./ProductTable"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ProductDrilldownProps {
  data: GroupedData
}

export default function ProductDrilldown({ data }: ProductDrilldownProps) {
  const brands = getAllBrands(data)
  const [selectedBrand, setSelectedBrand] = useState<string>("")

  // データロード時に最初のブランドをデフォルトに設定
  useEffect(() => {
    if (brands.length > 0 && !selectedBrand) {
      setSelectedBrand(brands[0].brandCode)
    }
  }, [brands, selectedBrand])

  const products = selectedBrand ? getProductsForBrand(data, selectedBrand) : []
  const brandName = selectedBrand ? data.byBrand[selectedBrand]?.brandName : ""

  const handleBrandChange = (value: string) => {
    setSelectedBrand(value)
  }

  return (
    <div className="space-y-6">
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">ブランド選択</label>
        <Select value={selectedBrand} onValueChange={handleBrandChange}>
          <SelectTrigger className="w-full md:w-[300px]">
            <SelectValue placeholder="ブランドを選択" />
          </SelectTrigger>
          <SelectContent>
            {brands.map((brand) => (
              <SelectItem key={brand.brandCode} value={brand.brandCode}>
                {brand.brandName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {selectedBrand && (
        <>
          <div className="rounded-md border p-4">
            <h3 className="text-lg font-medium mb-4">{brandName}の商品別売上高</h3>
            <ProductChart products={products} />
          </div>

          <div className="rounded-md border p-4">
            <h3 className="text-lg font-medium mb-4">{brandName}の商品売上サマリー</h3>
            <ProductTable products={products} />
          </div>
        </>
      )}
    </div>
  )
}
