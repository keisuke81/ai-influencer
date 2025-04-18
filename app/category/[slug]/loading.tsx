import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="min-h-screen bg-yellow-50">
      {/* パンくずリストのスケルトン */}
      <div className="bg-white py-3 shadow-sm">
        <div className="container mx-auto px-4">
          <Skeleton className="h-5 w-64" />
        </div>
      </div>

      {/* カテゴリーヘッダーのスケルトン */}
      <div className="bg-gradient-to-r from-green-500 to-teal-500 py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <Skeleton className="mx-auto mb-4 h-10 w-64" />
            <Skeleton className="mx-auto h-6 w-full max-w-lg" />
          </div>
        </div>
      </div>

      {/* 商品リストのスケルトン */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <Skeleton className="h-6 w-32" />
          <div className="flex items-center gap-4">
            <Skeleton className="h-9 w-24" />
            <Skeleton className="h-9 w-24" />
          </div>
        </div>

        <div className="mb-6">
          <Skeleton className="h-10 w-32" />
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="overflow-hidden rounded-lg border bg-white shadow-sm">
              <Skeleton className="aspect-square w-full" />
              <div className="p-3">
                <Skeleton className="mb-1 h-4 w-16" />
                <Skeleton className="mb-2 h-5 w-full" />
                <Skeleton className="h-6 w-24" />
              </div>
            </div>
          ))}
        </div>

        {/* ページネーションのスケルトン */}
        <div className="mt-8 flex justify-center">
          <Skeleton className="h-10 w-64" />
        </div>
      </div>
    </div>
  )
}
