import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ProductIndexPage() {
  return (
    <div className="container mx-auto flex min-h-[70vh] flex-col items-center justify-center px-4 py-12 text-center">
      <h1 className="mb-6 text-3xl font-bold">商品一覧ページ</h1>
      <p className="mb-8 text-lg text-gray-600">
        このページは商品一覧のルートページです。通常は特定の商品IDを含むURLにアクセスします。
      </p>
      <div className="grid gap-4 md:grid-cols-2">
        <Link href="/product/hawaiian-1">
          <Button variant="outline" className="w-full">
            ハワイアンデザインアロハシャツ 1
          </Button>
        </Link>
        <Link href="/product/tropical-1">
          <Button variant="outline" className="w-full">
            トロピカルデザインアロハシャツ 1
          </Button>
        </Link>
        <Link href="/product/hawaiian-2">
          <Button variant="outline" className="w-full">
            ハワイアンデザインアロハシャツ 2
          </Button>
        </Link>
        <Link href="/product/tropical-2">
          <Button variant="outline" className="w-full">
            トロピカルデザインアロハシャツ 2
          </Button>
        </Link>
      </div>
    </div>
  )
}
