import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"

const Product = ({ id, slug, image, name, variants }) => {
  const [firstVariant] = variants

  return (
    <Link to={`/products/${slug}`} key={id} className="w-1/2 md:w-1/3 p-6">
      <article className="group md:p-6 md:rounded-lg md:hover:shadow-2xl transition-all duration-300">
        <div className="flex">
          {image && (
            <Img
              style={{ width: 250 }}
              fluid={image.childImageSharp.fluid}
              alt={name}
              title={name}
              className="m-auto transform transition-all duration-300 group-hover:scale-105"
            />
          )}
        </div>

        <div className="pt-3 text-center">
          <h4 className="text-black group-hover:text-pink-700 font-medium text-lg">
            {name}
          </h4>
          <p className="text-gray-700">from {firstVariant.formattedPrice}</p>
        </div>
      </article>
    </Link>
  )
}

export default Product
