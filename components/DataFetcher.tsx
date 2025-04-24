"use client"

import type React from "react"

import { useState, useRef } from "react"
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
import { UploadIcon } from "./ui/icons"
import { sampleData } from "@/lib/sampleData"
import MonthlyTrends from "./MonthlyTrends"
import SampleCSVDownload from "./SampleCSVDownload"
import {
  Tabs as ImportTabs,
  TabsList as ImportTabsList,
  TabsTrigger as ImportTabsTrigger,
  TabsContent as ImportTabsContent,
} from "@/components/ui/tabs"

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
  const [importMethod, setImportMethod] = useState<"url" | "file">("file") // デフォルトでファイルアップロード
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [fileName, setFileName] = useState<string | null>(null)

  const fetchDataFromUrl = async (url: string) => {
    setLoading(true)
    setError(null)

    try {
      // サーバーサイドAPIを使用してCSVを取得
      const encodedUrl = encodeURIComponent(url)
      const response = await fetch(`/api/fetch-csv?url=${encodedUrl}`)

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `データの取得に失敗しました: ${response.statusText}`)
      }

      const csvText = await response.text()
      processCSVText(csvText)

      // URLをローカルストレージに保存
      if (typeof window !== "undefined") {
        localStorage.setItem("sheetUrl", url)
      }
    } catch (err) {
      setError(`エラー: ${err instanceof Error ? err.message : String(err)}`)
      setLoading(false)
    }
  }

  const processCSVText = (csvText: string) => {
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

        // 月次データを処理
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

        setLoading(false)
      },
      error: (error) => {
        setError(`CSVパースエラー: ${error.message}`)
        setLoading(false)
      },
    })
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null)
    const file = e.target.files?.[0]
    if (!file) {
      return
    }

    setFileName(file.name)
    setLoading(true)

    // ファイルを読み込む
    const reader = new FileReader()
    reader.onload = (event) => {
      const csvText = event.target?.result as string
      processCSVText(csvText)
    }
    reader.onerror = () => {
      setError("ファイルの読み込みに失敗しました")
      setLoading(false)
    }
    reader.readAsText(file)
  }

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    fetchDataFromUrl(sheetUrl)
  }

  const handleFileButtonClick = () => {
    fileInputRef.current?.click()
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
      setFileName(null)
    } else {
      // 実データに戻す
      if (fileName) {
        // 前回アップロードしたファイルがある場合
        setLoading(true)
        setTimeout(() => {
          setLoading(false)
        }, 500)
      } else if (importMethod === "url") {
        fetchDataFromUrl(sheetUrl)
      }
    }
  }

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6">
        <ImportTabs value={importMethod} onValueChange={(value) => setImportMethod(value as "url" | "file")}>
          <ImportTabsList className="mb-4">
            <ImportTabsTrigger value="file">CSVファイルをアップロード</ImportTabsTrigger>
            <ImportTabsTrigger value="url">スプレッドシートURLから取得</ImportTabsTrigger>
          </ImportTabsList>

          <ImportTabsContent value="file">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Button onClick={handleFileButtonClick} disabled={loading}>
                  {loading ? (
                    <>
                      <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                      読み込み中
                    </>
                  ) : (
                    <>
                      <UploadIcon className="mr-2 h-4 w-4" />
                      CSVファイルを選択
                    </>
                  )}
                </Button>
                <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept=".csv" className="hidden" />
                {fileName && <span className="text-sm text-muted-foreground">{fileName}</span>}
                <div className="ml-auto">
                  <SampleCSVDownload />
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                CSVファイルは「商品名」「商品管理番号」「商品番号」「平均単価」「売上個数」「売上」「売上件数」「受注日(オプション)」の列を含む必要があります。
              </p>
            </div>
          </ImportTabsContent>

          <ImportTabsContent value="url">
            <form onSubmit={handleUrlSubmit} className="flex flex-col md:flex-row gap-2">
              <Input
                type="text"
                value={sheetUrl}
                onChange={(e) => setSheetUrl(e.target.value)}
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
            </form>
            <p className="text-xs text-muted-foreground mt-2">
              注意:
              スプレッドシートは公開設定が必要です。セキュリティ上の理由から、可能な限りCSVファイルのアップロードをお勧めします。
            </p>
          </ImportTabsContent>
        </ImportTabs>
      </div>

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
