"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { ProductData } from "@/lib/types"
import { formatCurrency, formatNumber } from "@/lib/utils"

interface ProductTableProps {
  products: ProductData[]
}

export default function ProductTable({ products }: ProductTableProps) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>商品コード</TableHead>
            <TableHead className="text-right">販売数</TableHead>
            <TableHead className="text-right">売上高</TableHead>
            <TableHead className="text-right">平均単価</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.productCode}>
              <TableCell className="font-medium">{product.productCode}</TableCell>
              <TableCell className="text-right">{formatNumber(product.units)}</TableCell>
              <TableCell className="text-right">{formatCurrency(product.revenue)}</TableCell>
              <TableCell className="text-right">{formatCurrency(product.averagePrice)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
