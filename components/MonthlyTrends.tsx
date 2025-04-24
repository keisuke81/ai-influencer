"use client"

import { useState, useEffect } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import type { GroupedData, MonthlyGroupedData } from "@/lib/types"
import { getAllBrands, getMonthlyDataForBrands } from "@/lib/utils"

// 色のリスト
const COLORS = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff8042",
  "#0088fe",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#a4de6c",
  "#d0ed57",
]

interface MonthlyTrendsProps {
  data: GroupedData
  monthlyData: MonthlyGroupedData
}

export default function MonthlyTrends({ data, monthlyData }: MonthlyTrendsProps) {
  const brands = getAllBrands(data)
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])

  // 初期状態では上位5ブランドを選択
  useEffect(() => {
    if (brands.length > 0 && selectedBrands.length === 0) {
      setSelectedBrands(brands.slice(0, Math.min(5, brands.length)).map((brand) => brand.brandCode))
    }
  }, [brands, selectedBrands.length])

  const handleBrandToggle = (brandCode: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brandCode) ? prev.filter((code) => code !== brandCode) : [...prev, brandCode],
    )
  }

  // 選択されたブランドの月次データを取得
  const chartData = getMonthlyDataForBrands(monthlyData, selectedBrands)

  // デバッグ用にデータを表示
  console.log("Monthly chart data:", chartData)

  // 日本語の月表示に変換
  const formatXAxis = (tickItem: string) => {
    try {
      const date = new Date(tickItem)
      return `${date.getFullYear()}年${date.getMonth() + 1}月`
    } catch (e) {
      return tickItem
    }
  }

  return (
    <div className="space-y-6">
      <div className="rounded-md border p-4">
        <h3 className="text-lg font-medium mb-4">ブランド選択</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {brands.map((brand, index) => (
            <div key={brand.brandCode} className="flex items-center space-x-2">
              <Checkbox
                id={`brand-${brand.brandCode}`}
                checked={selectedBrands.includes(brand.brandCode)}
                onCheckedChange={() => handleBrandToggle(brand.brandCode)}
              />
              <Label htmlFor={`brand-${brand.brandCode}`} className="flex items-center">
                <div
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                ></div>
                {brand.brandName}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-md border p-4">
        <h3 className="text-lg font-medium mb-4">月次売上数推移</h3>
        {chartData.length > 0 ? (
          <div className="w-full h-[500px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tickFormatter={formatXAxis} />
                <YAxis />
                <Tooltip
                  formatter={(value, name) => {
                    // nameからブランド名を取得
                    const brandName = chartData[0]?.[`${name}_name`]
                    return [value, brandName || name]
                  }}
                  labelFormatter={formatXAxis}
                />
                <Legend
                  formatter={(value) => {
                    // valueからブランド名を取得
                    const brandName = data.byBrand[value]?.brandName
                    return brandName || value
                  }}
                />
                {selectedBrands.map((brandCode, index) => (
                  <Line
                    key={brandCode}
                    type="monotone"
                    dataKey={brandCode}
                    name={brandCode}
                    stroke={COLORS[index % COLORS.length]}
                    activeDot={{ r: 8 }}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="text-center p-4">データがありません</div>
        )}
      </div>
    </div>
  )
}
