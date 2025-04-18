"use client"

import { useState } from "react"
import Link from "next/link"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function MobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">メニュー</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <div className="grid gap-6 py-6">
          <div className="grid gap-3">
            <h3 className="text-lg font-bold">カテゴリー</h3>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="mens">
                <AccordionTrigger>メンズ</AccordionTrigger>
                <AccordionContent>
                  <div className="grid gap-2 pl-4">
                    <Link href="#" className="text-sm hover:underline">
                      半袖アロハシャツ
                    </Link>
                    <Link href="#" className="text-sm hover:underline">
                      長袖アロハシャツ
                    </Link>
                    <Link href="#" className="text-sm hover:underline">
                      限定アロハシャツ
                    </Link>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="womens">
                <AccordionTrigger>レディース</AccordionTrigger>
                <AccordionContent>
                  <div className="grid gap-2 pl-4">
                    <Link href="#" className="text-sm hover:underline">
                      半袖アロハシャツ
                    </Link>
                    <Link href="#" className="text-sm hover:underline">
                      長袖アロハシャツ
                    </Link>
                    <Link href="#" className="text-sm hover:underline">
                      ワンピース
                    </Link>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="kids">
                <AccordionTrigger>キッズ</AccordionTrigger>
                <AccordionContent>
                  <div className="grid gap-2 pl-4">
                    <Link href="#" className="text-sm hover:underline">
                      ボーイズ
                    </Link>
                    <Link href="#" className="text-sm hover:underline">
                      ガールズ
                    </Link>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          <div className="grid gap-3">
            <h3 className="text-lg font-bold">ブランド</h3>
            <div className="grid grid-cols-2 gap-2">
              <Link href="#" className="text-sm hover:underline">
                PARADISE FOUND
              </Link>
              <Link href="#" className="text-sm hover:underline">
                REYN SPOONER
              </Link>
              <Link href="#" className="text-sm hover:underline">
                WAIMEA CASUALS
              </Link>
              <Link href="#" className="text-sm hover:underline">
                PARADISE STYLE
              </Link>
              <Link href="#" className="text-sm hover:underline">
                KONA BAY
              </Link>
              <Link href="#" className="text-sm hover:underline">
                AKIMI DESIGNS
              </Link>
              <Link href="#" className="text-sm hover:underline">
                AVANTI
              </Link>
              <Link href="#" className="text-sm hover:underline">
                KAHALA
              </Link>
            </div>
          </div>
          <div className="grid gap-3">
            <h3 className="text-lg font-bold">お客様サポート</h3>
            <div className="grid gap-2">
              <Link href="#" className="text-sm hover:underline">
                お問い合わせ
              </Link>
              <Link href="#" className="text-sm hover:underline">
                配送について
              </Link>
              <Link href="#" className="text-sm hover:underline">
                返品・交換について
              </Link>
              <Link href="#" className="text-sm hover:underline">
                サイズガイド
              </Link>
            </div>
          </div>
          <div className="grid gap-2">
            <Button className="w-full">ログイン</Button>
            <Button variant="outline" className="w-full">
              新規登録
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
