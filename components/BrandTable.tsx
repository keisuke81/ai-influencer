"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { BrandData } from "@/lib/types"
import { formatCurrency, formatNumber } from "@/lib/utils"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"

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
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ブランド</TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => toggleSort("units")}
                className="flex items-center justify-end w-full"
              >
                販売数
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => toggleSort("revenue")}
                className="flex items-center justify-end w-full"
              >
                売上高
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead className="text-right">注文数</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedBrands.map((brand) => (
            <TableRow key={brand.brandCode}>
              <TableCell className="font-medium">{brand.brandName}</TableCell>
              <TableCell className="text-right">{formatNumber(brand.units)}</TableCell>
              <TableCell className="text-right">{formatCurrency(brand.revenue)}</TableCell>
              <TableCell className="text-right">{formatNumber(brand.orders)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
