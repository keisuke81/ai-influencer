"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen overflow-hidden">
      {/* 大きい画面用のサイドバー */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-white p-4 shadow-lg transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">アロハ売上</h1>
          <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)} className="md:hidden">
            <X className="h-5 w-5" />
          </Button>
        </div>

        <nav className="mt-8">
          <ul className="space-y-2">
            <li>
              <a href="#" className="block rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">
                ダッシュボード
              </a>
            </li>
            <li>
              <a href="#" className="block rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">
                レポート
              </a>
            </li>
            <li>
              <a href="#" className="block rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">
                設定
              </a>
            </li>
          </ul>
        </nav>
      </div>

      {/* メインコンテンツ */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* ヘッダー */}
        <header className="flex h-16 items-center justify-between border-b bg-white px-4 md:px-6">
          <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(true)} className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold md:hidden">アロハ売上</h1>
          <div className="ml-auto"></div>
        </header>

        {/* メインコンテンツエリア */}
        <main className="flex-1 overflow-auto p-4 md:p-6">{children}</main>
      </div>

      {/* モバイルサイドバー用のオーバーレイ */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  )
}
