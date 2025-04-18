import Image from "next/image"
import Link from "next/link"
import { Instagram, Facebook, Twitter, Mail, ShoppingCart, Search, Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CategoryCard } from "./components/category-card"
import { BrandCard } from "./components/brand-card"
import { ProductCard } from "./components/product-card"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-yellow-100">
      {/* ヘッダー */}
      <header className="sticky top-0 z-50 w-full border-b bg-yellow-100 shadow-sm">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2 md:gap-6">
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">メニュー</span>
            </Button>
            <Link href="/" className="flex items-center gap-2">
              <Image src="/tropical-vibrant-logo.png" alt="WAKU・WAKU" width={40} height={40} className="h-10 w-10" />
              <span className="text-xl font-bold text-red-600">WAKU・WAKU</span>
            </Link>
          </div>

          <div className="hidden md:flex md:flex-1 md:items-center md:justify-center">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input type="search" placeholder="アロハシャツを検索..." className="w-full bg-white pl-8 pr-4" />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/cart" className="relative">
              <ShoppingCart className="h-6 w-6" />
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                0
              </span>
            </Link>
            <div className="hidden md:flex md:items-center md:gap-4">
              <Link href="/account" className="text-sm font-medium">
                マイページ
              </Link>
              <Button size="sm" className="bg-red-600 hover:bg-red-700">
                新規登録
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* ヒーローセクション */}
      <section className="relative overflow-hidden bg-gradient-to-r from-green-500 to-teal-500 py-12 text-white">
        <div className="absolute inset-0 z-0 opacity-20">
          <Image src="/tropical-palm-fronds.png" alt="背景" fill className="object-cover" />
        </div>
        <div className="container relative z-10 mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl">
              <span className="text-yellow-300">アロハシャツ</span>の専門店 WAKU・WAKU
            </h1>
            <p className="mb-8 text-lg md:text-xl">全国送料・手数料無料でお届け！5000円以上お買い上げで翌日配送！</p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" className="bg-yellow-400 text-black hover:bg-yellow-500">
                新着アイテムを見る
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                人気ブランドから探す
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* カテゴリーナビゲーション */}
      <section className="bg-white py-8">
        <div className="container mx-auto px-4">
          <h2 className="mb-6 text-center text-2xl font-bold">ジャンル別オススメコーナー</h2>
          <Tabs defaultValue="popular" className="w-full">
            <TabsList className="mb-6 grid w-full grid-cols-2 md:grid-cols-4">
              <TabsTrigger value="popular">人気アイテム</TabsTrigger>
              <TabsTrigger value="cost">コストパフォーマンス</TabsTrigger>
              <TabsTrigger value="brand">人気ブランド</TabsTrigger>
              <TabsTrigger value="hawaii">ハワイの老舗</TabsTrigger>
            </TabsList>
            <TabsContent value="popular" className="grid grid-cols-2 gap-4 md:grid-cols-4">
              <CategoryCard title="完全限定アロハ" imageUrl="/tropical-threads-collectors-item.png" href="/category/limited" />
              <CategoryCard
                title="長袖アロハシャツ"
                imageUrl="/tropical-long-sleeve.png"
                href="/category/long-sleeve"
              />
              <CategoryCard title="レディースアロハ" imageUrl="/tropical-floral-woman.png" href="/category/women" />
              <CategoryCard
                title="キッズアロハ"
                imageUrl="/placeholder.svg?height=200&width=200&query=kids hawaiian shirt"
                href="/category/kids"
              />
            </TabsContent>
            <TabsContent value="cost" className="grid grid-cols-2 gap-4 md:grid-cols-4">
              <BrandCard
                name="RJC"
                imageUrl="/placeholder.svg?height=200&width=200&query=RJC brand logo"
                href="/brand/rjc"
              />
              <BrandCard
                name="WAIMEA CASUALS"
                imageUrl="/placeholder.svg?height=200&width=200&query=WAIMEA CASUALS brand logo"
                href="/brand/waimea"
              />
              <BrandCard
                name="TWO PALMS"
                imageUrl="/placeholder.svg?height=200&width=200&query=TWO PALMS brand logo"
                href="/brand/two-palms"
              />
              <BrandCard
                name="GO BAREFOOT"
                imageUrl="/placeholder.svg?height=200&width=200&query=GO BAREFOOT brand logo"
                href="/brand/go-barefoot"
              />
            </TabsContent>
            <TabsContent value="brand" className="grid grid-cols-2 gap-4 md:grid-cols-4">
              <BrandCard
                name="REYN SPOONER"
                imageUrl="/placeholder.svg?height=200&width=200&query=REYN SPOONER brand logo"
                href="/brand/reyn-spooner"
              />
              <BrandCard
                name="AKIMI DESIGNS"
                imageUrl="/placeholder.svg?height=200&width=200&query=AKIMI DESIGNS brand logo"
                href="/brand/akimi"
              />
              <BrandCard
                name="KONA BAY"
                imageUrl="/placeholder.svg?height=200&width=200&query=KONA BAY brand logo"
                href="/brand/kona-bay"
              />
              <BrandCard
                name="PARADISE STYLE"
                imageUrl="/placeholder.svg?height=200&width=200&query=PARADISE STYLE brand logo"
                href="/brand/paradise-style"
              />
            </TabsContent>
            <TabsContent value="hawaii" className="grid grid-cols-2 gap-4 md:grid-cols-4">
              <BrandCard
                name="PARADISE FOUND"
                imageUrl="/placeholder.svg?height=200&width=200&query=PARADISE FOUND brand logo"
                href="/brand/paradise-found"
              />
              <BrandCard
                name="AVANTI"
                imageUrl="/placeholder.svg?height=200&width=200&query=AVANTI brand logo"
                href="/brand/avanti"
              />
              <BrandCard
                name="KAHALA"
                imageUrl="/placeholder.svg?height=200&width=200&query=KAHALA brand logo"
                href="/brand/kahala"
              />
              <BrandCard
                name="TORI RICHARD"
                imageUrl="/placeholder.svg?height=200&width=200&query=TORI RICHARD brand logo"
                href="/brand/tori-richard"
              />
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* 新着商品 */}
      <section className="bg-yellow-50 py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold">新着アロハシャツ</h2>
            <Link href="/new-arrivals" className="text-red-600 hover:underline">
              すべて見る
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
            {[1, 2, 3, 4, 5].map((i) => (
              <ProductCard
                key={i}
                name={`ハワイアンデザインアロハシャツ ${i}`}
                brand="PARADISE STYLE"
                price={7800}
                imageUrl={`/placeholder.svg?height=300&width=300&query=colorful hawaiian shirt ${i}`}
                href={`/product/hawaiian-${i}`}
                isNew={true}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 人気商品 */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold">人気アロハシャツ</h2>
            <Link href="/popular" className="text-red-600 hover:underline">
              すべて見る
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
            {[1, 2, 3, 4, 5].map((i) => (
              <ProductCard
                key={i}
                name={`トロピカルデザインアロハシャツ ${i}`}
                brand="REYN SPOONER"
                price={9800}
                imageUrl={`/placeholder.svg?height=300&width=300&query=tropical hawaiian shirt ${i}`}
                href={`/product/tropical-${i}`}
                isPopular={true}
              />
            ))}
          </div>
        </div>
      </section>

      {/* お知らせ */}
      <section className="bg-red-600 py-8 text-white">
        <div className="container mx-auto px-4">
          <div className="rounded-lg bg-white/10 p-6">
            <h2 className="mb-4 text-xl font-bold">お知らせ</h2>
            <div className="space-y-4">
              <div className="rounded-md bg-white/20 p-4">
                <p className="text-sm font-medium">
                  アロハシャツの最低価格に送料無料＆2枚一枚いただきません。（5000円以上お買い上げの場合）
                </p>
              </div>
              <div className="rounded-md bg-white/20 p-4">
                <p className="text-sm font-medium">
                  特別にお届け日のご指定がない場合、出荷は翌日、到着は翌日～3日のいずれかになります。
                </p>
              </div>
              <div className="rounded-md bg-white/20 p-4">
                <p className="text-sm font-medium">
                  火、水、土、日曜日は休業です。 次の日を除き2～3日以内の出荷となりますのでご了承ください。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* メールマガジン登録 */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 py-12 text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-xl text-center">
            <h2 className="mb-4 text-2xl font-bold">メールマガジンで最新情報GET！</h2>
            <p className="mb-6">新商品情報やセール情報をいち早くお届けします！</p>
            <form className="flex flex-col gap-3 sm:flex-row">
              <Input
                type="email"
                placeholder="メールアドレス"
                className="flex-1 bg-white/20 text-white placeholder:text-white/70"
              />
              <Button className="bg-yellow-400 text-black hover:bg-yellow-500">登録する</Button>
            </form>
          </div>
        </div>
      </section>

      {/* フッター */}
      <footer className="bg-gray-900 py-12 text-gray-300">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <h3 className="mb-4 text-lg font-bold text-white">WAKU・WAKU</h3>
              <p className="mb-4 text-sm">アロハシャツの専門店 Since 1997</p>
              <div className="flex gap-4">
                <Link href="#" className="text-gray-400 hover:text-white">
                  <Twitter className="h-5 w-5" />
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white">
                  <Instagram className="h-5 w-5" />
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white">
                  <Facebook className="h-5 w-5" />
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white">
                  <Mail className="h-5 w-5" />
                </Link>
              </div>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-bold text-white">カテゴリー</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="hover:text-white">
                    メンズアロハシャツ
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    レディースアロハシャツ
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    キッズアロハシャツ
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    長袖アロハシャツ
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    限定アロハシャツ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-bold text-white">ブランド</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="hover:text-white">
                    PARADISE FOUND
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    REYN SPOONER
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    WAIMEA CASUALS
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    PARADISE STYLE
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    すべてのブランド
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-bold text-white">お客様サポート</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="hover:text-white">
                    お問い合わせ
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    配送について
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    返品・交換について
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    サイズガイド
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    プライバシーポリシー
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-gray-800 pt-8 text-center text-sm">
            <p>© 2025 WAKU・WAKU All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
