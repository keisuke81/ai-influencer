"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import type { BrandData } from "@/lib/types"
import { formatCurrency } from "@/lib/utils"

interface BrandChartProps {
  brands: BrandData[]
}

export default function BrandChart({ brands }: BrandChartProps) {
  // チャート用のデータを準備
  const chartData = brands.map((brand) => ({
    name: brand.brandName,
    revenue: brand.revenue,
  }))

  // データが空の場合のメッセージ
  if (chartData.length === 0) {
    return <div className="text-center p-4">データがありません</div>
  }

  // デバッグ用にデータを表示
  console.log("Chart data:", chartData)

  return (
    <div className="w-full h-[400px]">
      {/* データの状態を表示 */}
      <div className="text-xs text-gray-500 mb-2">データ件数: {chartData.length}件</div>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 70 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" angle={-45} textAnchor="end" height={70} interval={0} />
          <YAxis tickFormatter={(value) => formatCurrency(value).replace("¥", "")} />
          <Tooltip formatter={(value) => [formatCurrency(value as number), "売上高"]} />
          <Bar dataKey="revenue" fill="#8884d8" animationDuration={1000} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
