import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

import { CategoryCard } from "../components/category-card"

export default function CategoryIndexPage() {
  const categories = [
    {
      title: "メンズアロハシャツ",
      slug: "mens",
      description: "男性向けの伝統的なアロハシャツです。カジュアルからフォーマルまで様々なシーンで活躍します。",
      imageUrl: "/tropical-getaway-shirt.png",
    },
    {
      title: "レディースアロハ",
      slug: "women",
      description: "女性向けにデザインされたアロハシャツやワンピースです。鮮やかな色彩と洗練されたデザインが特徴です。",
      imageUrl: "/tropical-floral-woman.png",
    },
    {
      title: "キッズアロハ",
      slug: "kids",
      description: "お子様向けのかわいいアロハシャツです。家族でお揃いのデザインも多数ご用意しています。",
      imageUrl: "/placeholder.svg?key=0zao0",
    },
    {
      title: "長袖アロハシャツ",
      slug: "long-sleeve",
      description:
        "涼しい季節にも着用できる長袖タイプのアロハシャツです。伝統的なデザインから現代的なものまで幅広く取り揃えています。",
      imageUrl: "/tropical-long-sleeve.png",
    },
    {
      title: "完全限定アロハ",
      slug: "limited",
      description: "数量限定で販売される特別なデザインのアロハシャツです。コレクターズアイテムとしても人気があります。",
      imageUrl: "/tropical-threads-collectors-item.png",
    },
  ]

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
            <span>カテゴリー</span>
          </div>
        </div>
      </div>

      {/* カテゴリーヘッダー */}
      <div className="bg-gradient-to-r from-green-500 to-teal-500 py-12 text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 text-3xl font-bold md:text-4xl">商品カテゴリー</h1>
            <p className="text-lg">
              WAKU・WAKUのアロハシャツは、ハワイの伝統と日本の品質にこだわって作られています。
              様々なカテゴリーから、あなたにぴったりのアロハシャツをお選びください。
            </p>
          </div>
        </div>
      </div>

      {/* カテゴリーリスト */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <div key={category.slug} className="overflow-hidden rounded-lg border bg-white shadow-sm">
              <Link href={`/category/${category.slug}`} className="group block">
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={category.imageUrl || "/placeholder.svg"}
                    alt={category.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h2 className="mb-2 text-xl font-bold">{category.title}</h2>
                  <p className="mb-4 text-gray-600">{category.description}</p>
                  <div className="flex items-center text-red-600">
                    <span className="font-medium">商品を見る</span>
                    <ChevronRight className="h-4 w-4" />
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* 特集セクション */}
      <div className="bg-white py-12">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center text-2xl font-bold">特集カテゴリー</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="relative overflow-hidden rounded-lg">
              <Image
                src="/tropical-wedding-celebration.png"
                alt="ウェディングアロハ"
                width={600}
                height={400}
                className="w-full object-cover"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 p-6 text-center text-white">
                <h3 className="mb-2 text-xl font-bold">ウェディングアロハ</h3>
                <p className="mb-4">ハワイアンウェディングにぴったりのフォーマルアロハシャツ</p>
                <Link
                  href="/category/wedding"
                  className="rounded-full bg-white px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-yellow-100"
                >
                  詳細を見る
                </Link>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg">
              <Image
                src="/placeholder.svg?key=owzpq"
                alt="ファミリーアロハ"
                width={600}
                height={400}
                className="w-full object-cover"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 p-6 text-center text-white">
                <h3 className="mb-2 text-xl font-bold">ファミリーアロハ</h3>
                <p className="mb-4">家族でお揃いのアロハシャツを楽しもう</p>
                <Link
                  href="/category/family"
                  className="rounded-full bg-white px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-yellow-100"
                >
                  詳細を見る
                </Link>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg">
              <Image
                src="/vintage-aloha-shirts.png"
                alt="ヴィンテージアロハ"
                width={600}
                height={400}
                className="w-full object-cover"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 p-6 text-center text-white">
                <h3 className="mb-2 text-xl font-bold">ヴィンテージアロハ</h3>
                <p className="mb-4">クラシックなデザインの復刻版アロハシャツ</p>
                <Link
                  href="/category/vintage"
                  className="rounded-full bg-white px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-yellow-100"
                >
                  詳細を見る
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ブランド別カテゴリー */}
      <div className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center text-2xl font-bold">ブランド別カテゴリー</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            <CategoryCard
              title="PARADISE FOUND"
              imageUrl="/placeholder.svg?height=300&width=300&query=PARADISE FOUND brand logo"
              href="/brand/paradise-found"
            />
            <CategoryCard
              title="REYN SPOONER"
              imageUrl="/placeholder.svg?height=300&width=300&query=REYN SPOONER brand logo"
              href="/brand/reyn-spooner"
            />
            <CategoryCard
              title="KAHALA"
              imageUrl="/placeholder.svg?height=300&width=300&query=KAHALA brand logo"
              href="/brand/kahala"
            />
            <CategoryCard
              title="AVANTI"
              imageUrl="/placeholder.svg?height=300&width=300&query=AVANTI brand logo"
              href="/brand/avanti"
            />
            <CategoryCard
              title="PARADISE STYLE"
              imageUrl="/placeholder.svg?height=300&width=300&query=PARADISE STYLE brand logo"
              href="/brand/paradise-style"
            />
            <CategoryCard
              title="KONA BAY"
              imageUrl="/placeholder.svg?height=300&width=300&query=KONA BAY brand logo"
              href="/brand/kona-bay"
            />
            <CategoryCard
              title="AKIMI DESIGNS"
              imageUrl="/placeholder.svg?height=300&width=300&query=AKIMI DESIGNS brand logo"
              href="/brand/akimi"
            />
            <CategoryCard
              title="TORI RICHARD"
              imageUrl="/placeholder.svg?height=300&width=300&query=TORI RICHARD brand logo"
              href="/brand/tori-richard"
            />
            <CategoryCard title="WAIMEA CASUALS" imageUrl="/waimea-casuals-logo.png" href="/brand/waimea" />
            <CategoryCard title="GO BAREFOOT" imageUrl="/minimalist-barefoot-logo.png" href="/brand/go-barefoot" />
          </div>
        </div>
      </div>
    </div>
  )
}
