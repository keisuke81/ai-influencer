"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import type { ProductData } from "@/lib/types"
import { formatCurrency } from "@/lib/utils"

interface ProductChartProps {
  products: ProductData[]
}

export default function ProductChart({ products }: ProductChartProps) {
  // チャート用のデータを準備
  const chartData = products.map((product) => ({
    name: product.productCode,
    revenue: product.revenue,
  }))

  return (
    <div className="w-full h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} layout="vertical" margin={{ top: 20, right: 30, left: 50, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" tickFormatter={(value) => formatCurrency(value).replace("¥", "")} />
          <YAxis dataKey="name" type="category" interval={0} />
          <Tooltip formatter={(value) => [formatCurrency(value as number), "売上高"]} />
          <Bar dataKey="revenue" fill="#82ca9d" animationDuration={1000} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
