import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

import type {
  RawSalesRow,
  ProcessedSalesRow,
  GroupedData,
  BrandData,
  ProductData,
  MonthlyGroupedData,
  MonthlyData,
} from "./types"
import brandMap from "./brandMap"

// 日本円でフォーマット
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("ja-JP", {
    style: "currency",
    currency: "JPY",
  }).format(value)
}

// 数値をカンマ区切りでフォーマット
export const formatNumber = (value: number): string => {
  return new Intl.NumberFormat("ja-JP").format(value)
}

// ブランドコードを抽出する関数
export const extractBrandCode = (productCode: string): string => {
  // アルファベット部分を抽出
  const match = productCode.match(/^[a-zA-Z]+/)
  return match ? match[0].toLowerCase() : "unknown"
}

// CSVデータを処理
export const processData = (data: RawSalesRow[]): GroupedData => {
  const processedRows: ProcessedSalesRow[] = data.map((row) => {
    // B列（商品管理番号）からブランドコードを抽出
    const brandCode = extractBrandCode(row.商品管理番号)

    // 商品番号部分を抽出（数字部分）
    const productCodeMatch = row.商品管理番号.match(/\d+/)
    const productCode = productCodeMatch ? productCodeMatch[0] : "unknown"

    // 文字列を数値に変換
    const averagePrice = Number.parseFloat(row.平均単価.replace(/,/g, "")) || 0
    const units = Number.parseInt(row.売上個数.replace(/,/g, ""), 10) || 0
    const revenue = Number.parseFloat(row.売上.replace(/,/g, "")) || 0
    const orders = Number.parseInt(row.売上件数.replace(/,/g, ""), 10) || 0

    // 注文日があれば解析
    let orderDate: Date | undefined
    if (row.受注日) {
      try {
        orderDate = new Date(row.受注日)
      } catch (e) {
        // 無効な日付は無視
      }
    }

    return {
      ...row,
      brandCode,
      productCode,
      averagePrice,
      units,
      revenue,
      orders,
      orderDate,
    }
  })

  // ブランド別にデータをグループ化
  const byBrand: Record<string, BrandData> = {}
  const byProduct: Record<string, Record<string, ProductData>> = {}

  processedRows.forEach((row) => {
    // ブランドデータを集計
    if (!byBrand[row.brandCode]) {
      byBrand[row.brandCode] = {
        brandCode: row.brandCode,
        brandName: brandMap[row.brandCode] || `不明 (${row.brandCode})`,
        units: 0,
        revenue: 0,
        orders: 0,
      }
    }

    byBrand[row.brandCode].units += row.units
    byBrand[row.brandCode].revenue += row.revenue
    byBrand[row.brandCode].orders += row.orders

    // 商品データを集計
    if (!byProduct[row.brandCode]) {
      byProduct[row.brandCode] = {}
    }

    if (!byProduct[row.brandCode][row.productCode]) {
      byProduct[row.brandCode][row.productCode] = {
        productCode: row.productCode,
        units: 0,
        revenue: 0,
        averagePrice: 0,
      }
    }

    byProduct[row.brandCode][row.productCode].units += row.units
    byProduct[row.brandCode][row.productCode].revenue += row.revenue
  })

  // 各商品の平均価格を計算
  Object.keys(byProduct).forEach((brandCode) => {
    Object.keys(byProduct[brandCode]).forEach((productCode) => {
      const product = byProduct[brandCode][productCode]
      product.averagePrice = product.units > 0 ? product.revenue / product.units : 0
    })
  })

  return {
    byBrand,
    byProduct,
    lastUpdated: new Date(),
  }
}

// 売上高でブランドをソート（降順）
export const sortBrandsByRevenue = (brands: BrandData[]): BrandData[] => {
  return [...brands].sort((a, b) => b.revenue - a.revenue)
}

// 売上高で商品をソート（降順）
export const sortProductsByRevenue = (products: ProductData[]): ProductData[] => {
  return [...products].sort((a, b) => b.revenue - a.revenue)
}

// 特定のブランドの商品を取得
export const getProductsForBrand = (groupedData: GroupedData, brandCode: string): ProductData[] => {
  const brandProducts = groupedData.byProduct[brandCode] || {}
  return sortProductsByRevenue(Object.values(brandProducts))
}

// すべてのブランドを取得
export const getAllBrands = (groupedData: GroupedData): BrandData[] => {
  return sortBrandsByRevenue(Object.values(groupedData.byBrand))
}

// 月次データを処理する関数
export const processMonthlyData = (data: ProcessedSalesRow[]): MonthlyGroupedData => {
  const byMonth: Record<string, Record<string, MonthlyData>> = {}

  data.forEach((row) => {
    if (!row.orderDate) return

    // YYYY-MM形式の日付を取得
    const date = row.orderDate.toISOString().substring(0, 7)
    const brandCode = row.brandCode

    // 月ごとのデータを初期化
    if (!byMonth[date]) {
      byMonth[date] = {}
    }

    // ブランドごとのデータを初期化
    if (!byMonth[date][brandCode]) {
      byMonth[date][brandCode] = {
        date,
        brandCode,
        brandName: brandMap[brandCode] || `不明 (${brandCode})`,
        units: 0,
        revenue: 0,
      }
    }

    // データを集計
    byMonth[date][brandCode].units += row.units
    byMonth[date][brandCode].revenue += row.revenue
  })

  return { byMonth }
}

// 月次データを取得する関数
export const getMonthlyDataForBrands = (
  monthlyData: MonthlyGroupedData,
  brandCodes: string[],
): { date: string; [key: string]: string | number }[] => {
  const result: { date: string; [key: string]: string | number }[] = []
  const months = Object.keys(monthlyData.byMonth).sort()

  months.forEach((month) => {
    const monthData: { date: string; [key: string]: string | number } = { date: month }

    brandCodes.forEach((brandCode) => {
      const brandData = monthlyData.byMonth[month]?.[brandCode]
      monthData[brandCode] = brandData ? brandData.units : 0
      // ブランド名も追加
      if (brandData) {
        monthData[`${brandCode}_name`] = brandData.brandName
      }
    })

    result.push(monthData)
  })

  return result
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
