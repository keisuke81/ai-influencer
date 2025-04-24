"use client"

import type { ProductData } from "@/lib/types"
import { formatCurrency, formatNumber } from "@/lib/utils"

interface ProductTableProps {
  products: ProductData[]
}

export default function ProductTable({ products }: ProductTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              商品コード
            </th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              販売数
            </th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              売上高
            </th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              平均単価
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {products.map((product) => (
            <tr key={product.productCode} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.productCode}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                {formatNumber(product.units)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                {formatCurrency(product.revenue)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                {formatCurrency(product.averagePrice)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
