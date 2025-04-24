"use client"

import type { GroupedData } from "@/lib/types"
import { getAllBrands } from "@/lib/utils"
import BrandChart from "./BrandChart"
import BrandTable from "./BrandTable"

interface BrandOverviewProps {
  data: GroupedData
}

export default function BrandOverview({ data }: BrandOverviewProps) {
  const brands = getAllBrands(data)

  // デバッグ用にブランドデータを表示
  console.log("Brands data:", brands)

  return (
    <div className="space-y-6">
      <div className="rounded-md border p-4">
        <h3 className="text-lg font-medium mb-4">ブランド別売上高</h3>
        {brands.length > 0 ? (
          <BrandChart brands={brands} />
        ) : (
          <div className="text-center p-4">ブランドデータがありません</div>
        )}
      </div>

      <div className="rounded-md border p-4">
        <h3 className="text-lg font-medium mb-4">ブランド売上サマリー</h3>
        <BrandTable brands={brands} />
      </div>
    </div>
  )
}
