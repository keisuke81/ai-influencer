// Raw CSV row type
export interface RawSalesRow {
  商品名: string
  商品管理番号: string
  商品番号: string
  平均単価: string
  売上個数: string
  売上: string
  売上件数: string
  受注日?: string // Optional date column for future use
}

// Processed sales data type
export interface ProcessedSalesRow extends RawSalesRow {
  brandCode: string
  productCode: string
  averagePrice: number
  units: number
  revenue: number
  orders: number
  orderDate?: Date
}

// Aggregated brand data
export interface BrandData {
  brandCode: string
  brandName: string
  units: number
  revenue: number
  orders: number
}

// Aggregated product data
export interface ProductData {
  productCode: string
  units: number
  revenue: number
  averagePrice: number
}

// Grouped data by brand and product
export interface GroupedData {
  byBrand: Record<string, BrandData>
  byProduct: Record<string, Record<string, ProductData>>
  lastUpdated: Date
}

// 月次データ用の型
export interface MonthlyData {
  date: string // YYYY-MM形式
  brandCode: string
  brandName: string
  units: number
  revenue: number
}

// 月次データのグループ
export interface MonthlyGroupedData {
  byMonth: Record<string, Record<string, MonthlyData>>
}
