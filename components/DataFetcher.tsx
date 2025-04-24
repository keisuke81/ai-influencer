"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Papa from "papaparse"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { RawSalesRow, GroupedData, MonthlyGroupedData, ProcessedSalesRow } from "@/lib/types"
import { processData, extractBrandCode, processMonthlyData } from "@/lib/utils"
import BrandOverview from "./BrandOverview"
import ProductDrilldown from "./ProductDrilldown"
import { ReloadIcon } from "@radix-ui/react-icons"
import { sampleData } from "@/lib/sampleData"
import MonthlyTrends from "./MonthlyTrends"

const DEFAULT_SHEET_URL =
  "https://docs.google.com/sheets/d/1zNj-bCw_tfzw4g6DzX1tvRRXouIM8HTMS3YT6bX2zbU/edit?gid=0#gid=0"

export default function DataFetcher() {
  const [sheetUrl, setSheetUrl] = useState(() => {
    // ローカルストレージからURLを取得
    if (typeof window !== "undefined") {
      return localStorage.getItem("sheetUrl") || DEFAULT_SHEET_URL
    }
    return DEFAULT_SHEET_URL
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [data, setData] = useState<GroupedData | null>(null)
  const [useSampleData, setUseSampleData] = useState(false)
  const [monthlyData, setMonthlyData] = useState<MonthlyGroupedData | null>(null)

  const fetchData = async (url: string) => {
    setLoading(true)
    setError(null)

    try {
      // サンプルデータを使用する場合
      if (useSampleData) {
        setTimeout(() => {
          const processedData = processData(sampleData)
          setData(processedData)

          // 月次データを処理（サンプルデータの場合は日付を生成）
          if (useSampleData) {
            // サンプルデータの場合、ダミーの月次データを生成
            const processedRows = sampleData.map((row, index) => {
              const today = new Date()
              const orderDate = new Date(today.getFullYear(), today.getMonth() - (index % 6), 15)
              return {
                ...row,
                brandCode: extractBrandCode(row.商品管理番号),
                productCode: row.商品番号,
                averagePrice: Number.parseFloat(row.平均単価.replace(/,/g, "")) || 0,
                units: Number.parseInt(row.売上個数.replace(/,/g, ""), 10) || 0,
                revenue: Number.parseFloat(row.売上.replace(/,/g, "")) || 0,
                orders: Number.parseInt(row.売上件数.replace(/,/g, ""), 10) || 0,
                orderDate,
              } as ProcessedSalesRow
            })
            const monthlyProcessedData = processMonthlyData(processedRows)
            setMonthlyData(monthlyProcessedData)
          }

          setLoading(false)
        }, 500) // 読み込み感を出すために少し遅延
        return
      }

      // サーバーサイドAPIを使用してCSVを取得
      const encodedUrl = encodeURIComponent(url)
      const response = await fetch(`/api/fetch-csv?url=${encodedUrl}`)

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `データの取得に失敗しました: ${response.statusText}`)
      }

      const csvText = await response.text()

      // CSVをパース
      Papa.parse<RawSalesRow>(csvText, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          if (results.errors.length > 0) {
            setError(`CSVパースエラー: ${results.errors[0].message}`)
            setLoading(false)
            return
          }

          // データを処理
          const processedData = processData(results.data)
          setData(processedData)

          // 月次データを処理（サンプルデータの場合は日付を生成）
          if (useSampleData) {
            // サンプルデータの場合、ダミーの月次データを生成
            const processedRows = sampleData.map((row, index) => {
              const today = new Date()
              const orderDate = new Date(today.getFullYear(), today.getMonth() - (index % 6), 15)
              return {
                ...row,
                brandCode: extractBrandCode(row.商品管理番号),
                productCode: row.商品番号,
                averagePrice: Number.parseFloat(row.平均単価.replace(/,/g, "")) || 0,
                units: Number.parseInt(row.売上個数.replace(/,/g, ""), 10) || 0,
                revenue: Number.parseFloat(row.売上.replace(/,/g, "")) || 0,
                orders: Number.parseInt(row.売上件数.replace(/,/g, ""), 10) || 0,
                orderDate,
              } as ProcessedSalesRow
            })
            const monthlyProcessedData = processMonthlyData(processedRows)
            setMonthlyData(monthlyProcessedData)
          } else {
            // 実データの場合、CSVから日付情報を取得
            const processedRows = results.data.map((row) => {
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
                brandCode: extractBrandCode(row.商品管理番号),
                productCode: row.商品番号,
                averagePrice: Number.parseFloat(row.平均単価.replace(/,/g, "")) || 0,
                units: Number.parseInt(row.売上個数.replace(/,/g, ""), 10) || 0,
                revenue: Number.parseFloat(row.売上.replace(/,/g, "")) || 0,
                orders: Number.parseInt(row.売上件数.replace(/,/g, ""), 10) || 0,
                orderDate,
              } as ProcessedSalesRow
            })

            const monthlyProcessedData = processMonthlyData(processedRows)
            setMonthlyData(monthlyProcessedData)
          }

          // URLをローカルストレージに保存
          if (typeof window !== "undefined") {
            localStorage.setItem("sheetUrl", url)
          }

          setLoading(false)
        },
        error: (error) => {
          setError(`CSVパースエラー: ${error.message}`)
          setLoading(false)
        },
      })
    } catch (err) {
      setError(`エラー: ${err instanceof Error ? err.message : String(err)}`)
      setLoading(false)
    }
  }

  // 初回ロード時にデータを取得
  useEffect(() => {
    fetchData(sheetUrl)
  }, [])

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSheetUrl(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    fetchData(sheetUrl)
  }

  // サンプルデータに切り替え
  const toggleSampleData = () => {
    setUseSampleData(!useSampleData)
    if (!useSampleData) {
      // サンプルデータに切り替え
      const processedData = processData(sampleData)
      setData(processedData)
      console.log("Processed sample data:", processedData)

      // 月次データを処理（サンプルデータの場合は日付を生成）
      const processedRows = sampleData.map((row, index) => {
        const today = new Date()
        const orderDate = new Date(today.getFullYear(), today.getMonth() - (index % 6), 15)
        return {
          ...row,
          brandCode: extractBrandCode(row.商品管理番号),
          productCode: row.商品番号,
          averagePrice: Number.parseFloat(row.平均単価.replace(/,/g, "")) || 0,
          units: Number.parseInt(row.売上個数.replace(/,/g, ""), 10) || 0,
          revenue: Number.parseFloat(row.売上.replace(/,/g, "")) || 0,
          orders: Number.parseInt(row.売上件数.replace(/,/g, ""), 10) || 0,
          orderDate,
        } as ProcessedSalesRow
      })
      const monthlyProcessedData = processMonthlyData(processedRows)
      setMonthlyData(monthlyProcessedData)
    } else {
      // 実データに戻す
      fetchData(sheetUrl)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex flex-col md:flex-row gap-2">
          <Input
            type="text"
            value={sheetUrl}
            onChange={handleUrlChange}
            placeholder="Google スプレッドシートURL"
            className="flex-1"
          />
          <Button type="submit" disabled={loading}>
            {loading ? (
              <>
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                読み込み中
              </>
            ) : (
              "データ取得"
            )}
          </Button>
        </div>
      </form>

      <div className="mb-4">
        <Button variant="outline" onClick={toggleSampleData}>
          {useSampleData ? "実データを使用" : "サンプルデータを使用"}
        </Button>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertTitle>エラー</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {data && (
        <>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">売上ダッシュボード</h2>
            <p className="text-sm text-muted-foreground">最終更新: {data.lastUpdated.toLocaleString("ja-JP")}</p>
          </div>

          <Tabs defaultValue="brand-overview" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="brand-overview">ブランド概要</TabsTrigger>
              <TabsTrigger value="product-drilldown">商品詳細</TabsTrigger>
              <TabsTrigger value="monthly-trends">月次推移</TabsTrigger>
            </TabsList>

            <TabsContent value="brand-overview">
              <BrandOverview data={data} />
            </TabsContent>

            <TabsContent value="product-drilldown">
              <ProductDrilldown data={data} />
            </TabsContent>

            <TabsContent value="monthly-trends">
              {monthlyData && <MonthlyTrends data={data} monthlyData={monthlyData} />}
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  )
}
