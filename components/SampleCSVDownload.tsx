"use client"

import { Button } from "@/components/ui/button"
import { DownloadIcon } from "@radix-ui/react-icons"
import { sampleData } from "@/lib/sampleData"
import Papa from "papaparse"

export default function SampleCSVDownload() {
  const handleDownload = () => {
    // サンプルデータをCSV形式に変換
    const csv = Papa.unparse(sampleData)

    // CSVファイルをダウンロード
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", "sample_sales_data.csv")
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <Button variant="outline" size="sm" onClick={handleDownload}>
      <DownloadIcon className="mr-2 h-4 w-4" />
      サンプルCSVをダウンロード
    </Button>
  )
}
