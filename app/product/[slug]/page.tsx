import Image from "next/image"
import Link from "next/link"
import { Truck, RotateCcw, ShieldCheck, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProductCard } from "@/app/components/product-card"
import { SizeSelector } from "@/app/components/size-selector"
import { QuantitySelector } from "@/app/components/quantity-selector"
import { ProductImageGallery } from "@/app/components/product-image-gallery"
import { ReviewStars } from "@/app/components/review-stars"

// この関数は実際のデータベースからデータを取得する代わりに使用します
function getProductData(slug: string) {
  // 実際のアプリケーションではデータベースからデータを取得します
  return {
    id: "1",
    slug: slug,
    name: "パラダイスフラワー アロハシャツ",
    brand: "PARADISE STYLE",
    price: 8800,
    description:
      "ハワイの伝統的なデザインをモチーフにした鮮やかなアロハシャツです。高品質なコットン100%素材を使用し、着心地の良さと耐久性を兼ね備えています。リゾートスタイルからカジュアルな日常着まで幅広く活躍します。",
    features: [
      "コットン100%素材",
      "ハワイ伝統のデザイン",
      "ココナッツボタン使用",
      "左胸にポケット付き",
      "サイドベント（裾の両脇に入ったスリット）",
    ],
    careInstructions: [
      "洗濯機で洗えます（冷水）",
      "漂白剤は使用しないでください",
      "アイロンは中温で",
      "ドライクリーニング可能",
    ],
    images: [
      "/tropical-bloom-shirt.png",
      "/vibrant-floral-shirt.png",
      "/vibrant-floral-back.png",
      "/tropical-floral-closeup.png",
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["ブルー", "レッド", "グリーン"],
    rating: 4.5,
    reviewCount: 28,
    inStock: true,
    isNew: true,
    relatedProducts: [1, 2, 3, 4],
  }
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProductData(params.slug)

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
            <Link href="/category/mens" className="hover:text-red-600">
              メンズアロハシャツ
            </Link>
            <ChevronRight className="h-3 w-3" />
            <Link href={`/brand/${product.brand.toLowerCase().replace(" ", "-")}`} className="hover:text-red-600">
              {product.brand}
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="truncate">{product.name}</span>
          </div>
        </div>
      </div>

      {/* 商品詳細 */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* 商品画像 */}
          <div className="lg:col-span-2">
            <ProductImageGallery images={product.images} productName={product.name} />
          </div>

          {/* 商品情報と購入オプション */}
          <div className="flex flex-col gap-6">
            {product.isNew && (
              <div className="inline-block rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">
                新着商品
              </div>
            )}
            <div>
              <h1 className="mb-2 text-2xl font-bold md:text-3xl">{product.name}</h1>
              <Link
                href={`/brand/${product.brand.toLowerCase().replace(" ", "-")}`}
                className="text-lg text-gray-600 hover:text-red-600"
              >
                {product.brand}
              </Link>
            </div>

            <div className="flex items-center gap-2">
              <ReviewStars rating={product.rating} />
              <span className="text-sm text-gray-500">({product.reviewCount}件のレビュー)</span>
            </div>

            <div className="text-2xl font-bold text-red-600">¥{product.price.toLocaleString()}</div>

            <div className="rounded-lg bg-white p-6 shadow-sm">
              {/* サイズ選択 */}
              <div className="mb-6">
                <h3 className="mb-2 font-medium">サイズ</h3>
                <SizeSelector sizes={product.sizes} />
              </div>

              {/* 数量選択 */}
              <div className="mb-6">
                <h3 className="mb-2 font-medium">数量</h3>
                <QuantitySelector max={10} />
              </div>

              {/* カートに追加ボタン */}
              <Button className="mb-4 w-full bg-red-600 hover:bg-red-700">カートに追加</Button>

              {/* 在庫状況 */}
              <div className="mb-4 rounded-md bg-green-50 p-3 text-sm text-green-800">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  <span>在庫あり - 2〜3日以内に発送</span>
                </div>
              </div>

              {/* 配送・返品情報 */}
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <Truck className="h-4 w-4 text-gray-500" />
                  <span>5,000円以上のご注文で送料無料</span>
                </div>
                <div className="flex items-center gap-2">
                  <RotateCcw className="h-4 w-4 text-gray-500" />
                  <span>30日間返品可能</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-gray-500" />
                  <span>安心の品質保証</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 商品詳細タブ */}
        <div className="mt-12">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3 md:w-auto">
              <TabsTrigger value="description">商品詳細</TabsTrigger>
              <TabsTrigger value="features">特徴・素材</TabsTrigger>
              <TabsTrigger value="reviews">レビュー</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="rounded-lg border bg-white p-6">
              <h2 className="mb-4 text-xl font-bold">商品説明</h2>
              <p className="mb-4 leading-relaxed">{product.description}</p>
              <div className="grid gap-4 md:grid-cols-2">
                <Image
                  src="/beach-hawaiian-shirt.png"
                  alt="着用イメージ"
                  width={500}
                  height={300}
                  className="rounded-lg"
                />
                <Image
                  src="/placeholder.svg?height=300&width=500&query=hawaiian shirt fabric detail"
                  alt="生地の詳細"
                  width={500}
                  height={300}
                  className="rounded-lg"
                />
              </div>
            </TabsContent>
            <TabsContent value="features" className="rounded-lg border bg-white p-6">
              <div className="grid gap-8 md:grid-cols-2">
                <div>
                  <h2 className="mb-4 text-xl font-bold">特徴</h2>
                  <ul className="list-inside list-disc space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h2 className="mb-4 text-xl font-bold">お手入れ方法</h2>
                  <ul className="list-inside list-disc space-y-2">
                    {product.careInstructions.map((instruction, index) => (
                      <li key={index}>{instruction}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="rounded-lg border bg-white p-6">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-bold">カスタマーレビュー</h2>
                <Button>レビューを書く</Button>
              </div>

              <div className="mb-8 flex flex-col gap-6 md:flex-row">
                <div className="flex flex-col items-center justify-center rounded-lg bg-gray-50 p-6 text-center md:w-1/3">
                  <div className="mb-2 text-5xl font-bold">{product.rating}</div>
                  <div className="mb-4">
                    <ReviewStars rating={product.rating} />
                  </div>
                  <p className="text-sm text-gray-500">{product.reviewCount}件のレビュー</p>
                </div>

                <div className="md:w-2/3">
                  <div className="space-y-4">
                    {[5, 4, 3, 2, 1].map((star) => (
                      <div key={star} className="flex items-center gap-4">
                        <div className="w-12 text-sm">{star}星</div>
                        <div className="flex-1">
                          <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                            <div
                              className="h-full bg-yellow-400"
                              style={{
                                width: `${
                                  star === 5 ? "70" : star === 4 ? "20" : star === 3 ? "5" : star === 2 ? "3" : "2"
                                }%`,
                              }}
                            ></div>
                          </div>
                        </div>
                        <div className="w-12 text-right text-sm text-gray-500">
                          {star === 5 ? "70" : star === 4 ? "20" : star === 3 ? "5" : star === 2 ? "3" : "2"}%
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                {[
                  {
                    name: "田中太郎",
                    rating: 5,
                    date: "2023年8月15日",
                    title: "最高の一枚です！",
                    comment:
                      "色鮮やかなデザインと着心地の良さに大満足です。夏のリゾートだけでなく、普段使いにも重宝しています。サイズ感も丁度良く、洗濯後も色落ちせず形も崩れませんでした。",
                  },
                  {
                    name: "鈴木花子",
                    rating: 4,
                    date: "2023年7月23日",
                    title: "デザインが素敵",
                    comment:
                      "デザインがとても気に入りました。生地も良質で着心地も良いです。ただ、少し大きめのサイズ感なので、普段Mサイズの方はSでも良いかもしれません。",
                  },
                  {
                    name: "佐藤健",
                    rating: 5,
                    date: "2023年6月10日",
                    title: "リピート購入しました",
                    comment:
                      "2枚目の購入です。前回購入したものが気に入ったので色違いで購入しました。やはり着心地が良く、周りからの評判も上々です。",
                  },
                ].map((review, index) => (
                  <div key={index} className="border-b pb-6">
                    <div className="mb-2 flex items-center justify-between">
                      <div className="font-medium">{review.name}</div>
                      <div className="text-sm text-gray-500">{review.date}</div>
                    </div>
                    <div className="mb-2">
                      <ReviewStars rating={review.rating} />
                    </div>
                    <h3 className="mb-2 font-medium">{review.title}</h3>
                    <p className="text-gray-600">{review.comment}</p>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* 関連商品 */}
        <div className="mt-12">
          <h2 className="mb-6 text-2xl font-bold">関連商品</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <ProductCard
                key={i}
                name={`トロピカルデザインアロハシャツ ${i}`}
                brand="PARADISE STYLE"
                price={8800}
                imageUrl={`/placeholder.svg?height=300&width=300&query=tropical hawaiian shirt style ${i}`}
                href={`/product/tropical-${i}`}
              />
            ))}
          </div>
        </div>

        {/* 最近チェックした商品 */}
        <div className="mt-12">
          <h2 className="mb-6 text-2xl font-bold">最近チェックした商品</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <ProductCard
                key={i}
                name={`ハワイアンデザインアロハシャツ ${i}`}
                brand="REYN SPOONER"
                price={9800}
                imageUrl={`/placeholder.svg?height=300&width=300&query=hawaiian shirt design ${i}`}
                href={`/product/hawaiian-${i}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
