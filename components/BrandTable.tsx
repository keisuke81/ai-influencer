"use client"

import { useState } from "react"
import type { BrandData } from "@/lib/types"
import { formatCurrency, formatNumber } from "@/lib/utils"

interface BrandTableProps {
  brands: BrandData[]
}

export default function BrandTable({ brands }: BrandTableProps) {
  const [sortField, setSortField] = useState<"units" | "revenue">("revenue")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")

  const sortedBrands = [...brands].sort((a, b) => {
    const multiplier = sortDirection === "asc" ? 1 : -1
    return (a[sortField] - b[sortField]) * multiplier
  })

  const toggleSort = (field: "units" | "revenue") => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("desc")
    }
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ブランド
            </th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              <button
                onClick={() => toggleSort("units")}
                className="flex items-center justify-end w-full focus:outline-none"
              >
                販売数
                <svg
                  className="ml-2 h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                  />
                </svg>
              </button>
            </th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              <button
                onClick={() => toggleSort("revenue")}
                className="flex items-center justify-end w-full focus:outline-none"
              >
                売上高
                <svg
                  className="ml-2 h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                  />
                </svg>
              </button>
            </th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              注文数
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sortedBrands.map((brand) => (
            <tr key={brand.brandCode} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{brand.brandName}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                {formatNumber(brand.units)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                {formatCurrency(brand.revenue)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                {formatNumber(brand.orders)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
