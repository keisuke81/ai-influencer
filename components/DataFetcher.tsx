"use client"

import type React from "react"

import { useState, useRef } from "react"
import Papa from "papaparse"
import type { RawSalesRow, GroupedData, MonthlyGroupedData, ProcessedSalesRow } from "@/lib/types"
import { processData, extractBrandCode, processMonthlyData } from "@/lib/utils"
import BrandOverview from "./BrandOverview"
import ProductDrilldown from "./ProductDrilldown"
import { sampleData } from "@/lib/sampleData"
import MonthlyTrends from "./MonthlyTrends"
import SampleCSVDownload from "./SampleCSVDownload"

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
  const [activeTab, setActiveTab] = useState("brand-overview")

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
        {/* インポート方法の切り替えタブ */}
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setImportMethod("file")}
              className={`py-2 px-4 text-sm font-medium ${
                importMethod === "file"
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              CSVファイルをアップロード
            </button>
            <button
              onClick={() => setImportMethod("url")}
              className={`ml-4 py-2 px-4 text-sm font-medium ${
                importMethod === "url"
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              スプレッドシートURLから取得
            </button>
          </nav>
        </div>

        <div className="mt-4">
          {importMethod === "file" ? (
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleFileButtonClick}
                  disabled={loading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  {loading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      読み込み中
                    </>
                  ) : (
                    <>
                      <svg
                        className="mr-2 h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                        />
                      </svg>
                      CSVファイルを選択
                    </>
                  )}
                </button>
                <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept=".csv" className="hidden" />
                {fileName && <span className="text-sm text-gray-500">{fileName}</span>}
                <div className="ml-auto">
                  <SampleCSVDownload />
                </div>
              </div>
              <p className="text-xs text-gray-500">
                CSVファイルは「商品名」「商品管理番号」「商品番号」「平均単価」「売上個数」「売上」「売上件数」「受注日(オプション)」の列を含む必要があります。
              </p>
            </div>
          ) : (
            <form onSubmit={handleUrlSubmit} className="flex flex-col md:flex-row gap-2">
              <input
                type="text"
                value={sheetUrl}
                onChange={(e) => setSheetUrl(e.target.value)}
                placeholder="Google スプレッドシートURL"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    読み込み中
                  </>
                ) : (
                  "データ取得"
                )}
              </button>
            </form>
          )}
          {importMethod === "url" && (
            <p className="text-xs text-gray-500 mt-2">
              注意:
              スプレッドシートは公開設定が必要です。セキュリティ上の理由から、可能な限りCSVファイルのアップロードをお勧めします。
            </p>
          )}
        </div>
      </div>

      <div className="mb-4">
        <button
          onClick={toggleSampleData}
          className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {useSampleData ? "実データを使用" : "サンプルデータを使用"}
        </button>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">エラー</h3>
              <div className="mt-2 text-sm text-red-700">{error}</div>
            </div>
          </div>
        </div>
      )}

      {data && (
        <>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">売上ダッシュボード</h2>
            <p className="text-sm text-gray-500">最終更新: {data.lastUpdated.toLocaleString("ja-JP")}</p>
          </div>

          {/* タブナビゲーション */}
          <div className="border-b border-gray-200 mb-4">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab("brand-overview")}
                className={`py-2 px-4 text-sm font-medium ${
                  activeTab === "brand-overview"
                    ? "border-b-2 border-blue-500 text-blue-600"
                    : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                ブランド概要
              </button>
              <button
                onClick={() => setActiveTab("product-drilldown")}
                className={`ml-4 py-2 px-4 text-sm font-medium ${
                  activeTab === "product-drilldown"
                    ? "border-b-2 border-blue-500 text-blue-600"
                    : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                商品詳細
              </button>
              <button
                onClick={() => setActiveTab("monthly-trends")}
                className={`ml-4 py-2 px-4 text-sm font-medium ${
                  activeTab === "monthly-trends"
                    ? "border-b-2 border-blue-500 text-blue-600"
                    : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                月次推移
              </button>
            </nav>
          </div>

          {/* タブコンテンツ */}
          <div>
            {activeTab === "brand-overview" && <BrandOverview data={data} />}
            {activeTab === "product-drilldown" && <ProductDrilldown data={data} />}
            {activeTab === "monthly-trends" && monthlyData && <MonthlyTrends data={data} monthlyData={monthlyData} />}
          </div>
        </>
      )}
    </div>
  )
}
