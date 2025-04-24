"use client"

import { useState, useEffect } from "react"
import type { GroupedData } from "@/lib/types"
import { getAllBrands, getProductsForBrand } from "@/lib/utils"
import ProductChart from "./ProductChart"
import ProductTable from "./ProductTable"

interface ProductDrilldownProps {
  data: GroupedData
}

export default function ProductDrilldown({ data }: ProductDrilldownProps) {
  const brands = getAllBrands(data)
  const [selectedBrand, setSelectedBrand] = useState<string>("")
  const [isSelectOpen, setIsSelectOpen] = useState(false)

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
    setIsSelectOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">ブランド選択</label>
        <div className="relative">
          <button
            type="button"
            className="relative w-full md:w-[300px] bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onClick={() => setIsSelectOpen(!isSelectOpen)}
          >
            <span className="block truncate">
              {selectedBrand ? brands.find((b) => b.brandCode === selectedBrand)?.brandName : "ブランドを選択"}
            </span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </button>

          {isSelectOpen && (
            <div className="absolute z-10 mt-1 w-full md:w-[300px] bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
              {brands.map((brand) => (
                <div
                  key={brand.brandCode}
                  className={`cursor-default select-none relative py-2 pl-3 pr-9 hover:bg-blue-100 ${
                    selectedBrand === brand.brandCode ? "bg-blue-50 text-blue-900" : "text-gray-900"
                  }`}
                  onClick={() => handleBrandChange(brand.brandCode)}
                >
                  <span
                    className={`block truncate ${selectedBrand === brand.brandCode ? "font-medium" : "font-normal"}`}
                  >
                    {brand.brandName}
                  </span>
                  {selectedBrand === brand.brandCode && (
                    <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-blue-600">
                      <svg
                        className="h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
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
