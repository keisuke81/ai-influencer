import Image from "next/image"
import Link from "next/link"
import { ChevronRight, Filter, SlidersHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProductCard } from "@/app/components/product-card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"

// カテゴリーデータを取得する関数（実際のアプリではデータベースから取得）
function getCategoryData(slug: string) {
  const categories: Record<string, any> = {
    limited: {
      title: "完全限定アロハ",
      description: "数量限定で販売される特別なデザインのアロハシャツです。コレクターズアイテムとしても人気があります。",
      image: "/tropical-threads-collectors-item.png",
      products: Array.from({ length: 12 }, (_, i) => ({
        id: `limited-${i + 1}`,
        name: `限定デザインアロハシャツ ${i + 1}`,
        brand: i % 2 === 0 ? "PARADISE FOUND" : "REYN SPOONER",
        price: 12800 + i * 500,
        imageUrl: `/placeholder.svg?height=300&width=300&query=limited edition hawaiian shirt ${i + 1}`,
        isNew: i < 3,
        isPopular: i >= 3 && i < 6,
      })),
    },
    "long-sleeve": {
      title: "長袖アロハシャツ",
      description:
        "涼しい季節にも着用できる長袖タイプのアロハシャツです。伝統的なデザインから現代的なものまで幅広く取り揃えています。",
      image: "/tropical-long-sleeve.png",
      products: Array.from({ length: 12 }, (_, i) => ({
        id: `long-sleeve-${i + 1}`,
        name: `長袖アロハシャツ ${i + 1}`,
        brand: i % 3 === 0 ? "PARADISE STYLE" : i % 3 === 1 ? "KAHALA" : "AVANTI",
        price: 9800 + i * 300,
        imageUrl: `/placeholder.svg?height=300&width=300&query=long sleeve hawaiian shirt ${i + 1}`,
        isNew: i < 4,
        isPopular: i >= 8 && i < 10,
      })),
    },
    women: {
      title: "レディースアロハ",
      description: "女性向けにデザインされたアロハシャツやワンピースです。鮮やかな色彩と洗練されたデザインが特徴です。",
      image: "/tropical-floral-woman.png",
      products: Array.from({ length: 12 }, (_, i) => ({
        id: `women-${i + 1}`,
        name: `レディースアロハ ${i + 1}`,
        brand: i % 4 === 0 ? "PARADISE STYLE" : i % 4 === 1 ? "KONA BAY" : i % 4 === 2 ? "AKIMI DESIGNS" : "AVANTI",
        price: 8800 + i * 400,
        imageUrl: `/placeholder.svg?height=300&width=300&query=womens hawaiian shirt dress ${i + 1}`,
        isNew: i < 2,
        isPopular: i >= 5 && i < 8,
      })),
    },
    kids: {
      title: "キッズアロハ",
      description: "お子様向けのかわいいアロハシャツです。家族でお揃いのデザインも多数ご用意しています。",
      image: "/placeholder.svg?key=s67bf",
      products: Array.from({ length: 12 }, (_, i) => ({
        id: `kids-${i + 1}`,
        name: `キッズアロハシャツ ${i + 1}`,
        brand: i % 2 === 0 ? "PARADISE STYLE" : "WAIMEA CASUALS",
        price: 5800 + i * 200,
        imageUrl: `/placeholder.svg?height=300&width=300&query=kids hawaiian shirt ${i + 1}`,
        isNew: i < 3,
        isPopular: i >= 6 && i < 9,
      })),
    },
    mens: {
      title: "メンズアロハシャツ",
      description: "男性向けの伝統的なアロハシャツです。カジュアルからフォーマルまで様々なシーンで活躍します。",
      image: "/tropical-getaway-shirt.png",
      products: Array.from({ length: 12 }, (_, i) => ({
        id: `mens-${i + 1}`,
        name: `メンズアロハシャツ ${i + 1}`,
        brand:
          i % 5 === 0
            ? "PARADISE FOUND"
            : i % 5 === 1
              ? "REYN SPOONER"
              : i % 5 === 2
                ? "KAHALA"
                : i % 5 === 3
                  ? "TORI RICHARD"
                  : "AVANTI",
        price: 8800 + i * 350,
        imageUrl: `/placeholder.svg?height=300&width=300&query=mens hawaiian shirt ${i + 1}`,
        isNew: i < 4,
        isPopular: i >= 7 && i < 10,
      })),
    },
  }

  return (
    categories[slug] || {
      title: "カテゴリーが見つかりません",
      description: "指定されたカテゴリーは存在しません。",
      image: "/placeholder.svg",
      products: [],
    }
  )
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const category = getCategoryData(params.slug)

  return (
    <div className="min-h-screen bg-yellow-50">
      {/* パンくずリスト */}
      <div className="bg-white py-3 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-red-600">
              ホーム
            </Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/category" className="hover:text-red-600">
              カテゴリー
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="truncate">{category.title}</span>
          </div>
        </div>
      </div>

      {/* カテゴリーヘッダー */}
      <div className="relative bg-gradient-to-r from-green-500 to-teal-500 py-12 text-white">
        <div className="absolute inset-0 z-0 opacity-20">
          <Image src={category.image || "/placeholder.svg"} alt={category.title} fill className="object-cover" />
        </div>
        <div className="container relative z-10 mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 text-3xl font-bold md:text-4xl">{category.title}</h1>
            <p className="text-lg">{category.description}</p>
          </div>
        </div>
      </div>

      {/* 商品リスト */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">{category.products.length}件の商品</span>
          </div>

          <div className="flex items-center gap-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <span className="hidden sm:inline">フィルター</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle>フィルター</SheetTitle>
                  <SheetDescription>商品を絞り込む</SheetDescription>
                </SheetHeader>
                <div className="grid gap-6 py-4">
                  <div>
                    <h3 className="mb-4 text-sm font-medium">価格</h3>
                    <div className="space-y-4">
                      <Slider defaultValue={[0, 100]} max={100} step={1} />
                      <div className="flex items-center justify-between">
                        <span className="text-sm">¥5,000</span>
                        <span className="text-sm">¥20,000</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="mb-4 text-sm font-medium">ブランド</h3>
                    <div className="space-y-2">
                      {["PARADISE FOUND", "REYN SPOONER", "KAHALA", "AVANTI", "PARADISE STYLE"].map((brand) => (
                        <div key={brand} className="flex items-center space-x-2">
                          <Checkbox id={`brand-${brand}`} />
                          <Label htmlFor={`brand-${brand}`} className="text-sm font-normal">
                            {brand}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="mb-4 text-sm font-medium">サイズ</h3>
                    <div className="space-y-2">
                      {["S", "M", "L", "XL", "XXL"].map((size) => (
                        <div key={size} className="flex items-center space-x-2">
                          <Checkbox id={`size-${size}`} />
                          <Label htmlFor={`size-${size}`} className="text-sm font-normal">
                            {size}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="mb-4 text-sm font-medium">カラー</h3>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "bg-red-500",
                        "bg-blue-500",
                        "bg-green-500",
                        "bg-yellow-500",
                        "bg-purple-500",
                        "bg-pink-500",
                        "bg-gray-500",
                        "bg-black",
                      ].map((color) => (
                        <div
                          key={color}
                          className={`h-8 w-8 cursor-pointer rounded-full ${color} border hover:ring-2 hover:ring-offset-2`}
                        ></div>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button className="flex-1">適用</Button>
                    <Button variant="outline" className="flex-1">
                      リセット
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <SlidersHorizontal className="h-4 w-4" />
                  <span className="hidden sm:inline">並び替え</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px]">
                <SheetHeader>
                  <SheetTitle>並び替え</SheetTitle>
                  <SheetDescription>商品の表示順を変更する</SheetDescription>
                </SheetHeader>
                <div className="py-4">
                  <RadioGroup defaultValue="recommended">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="recommended" id="recommended" />
                        <Label htmlFor="recommended">おすすめ順</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="newest" id="newest" />
                        <Label htmlFor="newest">新着順</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="price-asc" id="price-asc" />
                        <Label htmlFor="price-asc">価格の安い順</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="price-desc" id="price-desc" />
                        <Label htmlFor="price-desc">価格の高い順</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="popular" id="popular" />
                        <Label htmlFor="popular">人気順</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="review" id="review" />
                        <Label htmlFor="review">レビュー評価順</Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <Tabs defaultValue="grid" className="mb-6">
          <TabsList className="grid w-32 grid-cols-2">
            <TabsTrigger value="grid">
              <div className="grid grid-cols-2 gap-0.5">
                <div className="h-1 w-1 rounded-sm bg-current"></div>
                <div className="h-1 w-1 rounded-sm bg-current"></div>
                <div className="h-1 w-1 rounded-sm bg-current"></div>
                <div className="h-1 w-1 rounded-sm bg-current"></div>
              </div>
            </TabsTrigger>
            <TabsTrigger value="list">
              <div className="flex flex-col gap-0.5">
                <div className="h-0.5 w-3 rounded-sm bg-current"></div>
                <div className="h-0.5 w-3 rounded-sm bg-current"></div>
                <div className="h-0.5 w-3 rounded-sm bg-current"></div>
              </div>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="grid" className="mt-6">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {category.products.map((product: any) => (
                <ProductCard
                  key={product.id}
                  name={product.name}
                  brand={product.brand}
                  price={product.price}
                  imageUrl={product.imageUrl}
                  href={`/product/${product.id}`}
                  isNew={product.isNew}
                  isPopular={product.isPopular}
                  isSale={product.isSale}
                />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="list" className="mt-6">
            <div className="space-y-4">
              {category.products.map((product: any) => (
                <div
                  key={product.id}
                  className="flex flex-col overflow-hidden rounded-lg border bg-white shadow-sm sm:flex-row"
                >
                  <div className="relative aspect-square w-full sm:w-48">
                    <Image
                      src={product.imageUrl || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                    {product.isNew && (
                      <div className="absolute left-2 top-2 rounded-full bg-blue-600 px-2 py-1 text-xs font-semibold text-white">
                        新着
                      </div>
                    )}
                    {product.isPopular && (
                      <div className="absolute left-2 top-2 rounded-full bg-red-600 px-2 py-1 text-xs font-semibold text-white">
                        人気
                      </div>
                    )}
                    {product.isSale && (
                      <div className="absolute left-2 top-2 rounded-full bg-green-600 px-2 py-1 text-xs font-semibold text-white">
                        セール
                      </div>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col justify-between p-4">
                    <div>
                      <p className="mb-1 text-sm text-gray-500">{product.brand}</p>
                      <h3 className="mb-2 text-lg font-medium">{product.name}</h3>
                      <p className="mb-4 text-sm text-gray-600">
                        高品質な素材を使用した、着心地の良いアロハシャツです。鮮やかなデザインと伝統的なパターンが特徴です。
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-xl font-bold text-red-600">¥{product.price.toLocaleString()}</p>
                      <Link href={`/product/${product.id}`}>
                        <Button size="sm">詳細を見る</Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* ページネーション */}
        <div className="mt-8 flex justify-center">
          <div className="flex items-center gap-1">
            <Button variant="outline" size="icon" disabled>
              <ChevronRight className="h-4 w-4 rotate-180" />
            </Button>
            <Button variant="outline" size="sm" className="bg-red-600 text-white hover:bg-red-700">
              1
            </Button>
            <Button variant="outline" size="sm">
              2
            </Button>
            <Button variant="outline" size="sm">
              3
            </Button>
            <Button variant="outline" size="sm">
              4
            </Button>
            <Button variant="outline" size="sm">
              5
            </Button>
            <Button variant="outline" size="icon">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
