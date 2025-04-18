import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {/* 商品画像スケルトン */}
        <div className="lg:col-span-2">
          <Skeleton className="aspect-square w-full rounded-lg" />
          <div className="mt-4 flex gap-2">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="aspect-square h-20 w-20 rounded-md" />
            ))}
          </div>
        </div>

        {/* 商品情報スケルトン */}
        <div className="flex flex-col gap-6">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-6 w-1/4" />
          <Skeleton className="h-10 w-full rounded-lg" />
          <Skeleton className="h-40 w-full rounded-lg" />
        </div>
      </div>
    </div>
  )
}
