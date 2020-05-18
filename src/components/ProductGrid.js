import React from "react"

import Product from "./Product"

const ProductGrid = ({ products }) => {
  if (!products) return <p>No products available</p>

  return <div className="flex flex-wrap -mx-6">{products.map(Product)}</div>
}

export default ProductGrid
