import * as ProductService from "../Services/product.services.js"

export const getProductList = async (req, res) => {
  try {
    const { limit, page, query, sort } = req.query
    const products = await ProductService.findProduct(limit, page, query, sort)
    res.json({
      data: products,
      message: "Products List"
    })
  } catch (error) {
    console.error(error)
    res.json({
      error,
      message: "error",
    })
  }
}

export const getProductById = async (req, res) => {
  const { id } = req.params

  try {
    const product = await ProductService.getProductById(id)

    if (!product) {
      return res.status(404).json({ message: "Product not found" })
    }

    res.json({
      product,
      message: "Product found",
    })
  } catch (error) {
    console.error(error)
    res.json({
      error,
      message: "Error",
    })
  }
}

export const deleteProduct = async (req, res) => {
  const { id } = req.params
  try {
    await ProductService.deleteProduct(id)
    return res.status(200).json({ message: 'Product deleted successfully' })
  } catch (error) {
    return res.status(404).json({ error: error.message })
  }
}

export const createProduct = async (req, res) => {
  try {
    const product = await ProductService.createProduct(req.body)
    res.json({
      product,
      message: "Product created"
    })
  } catch (error) {
    console.error(error)
    res.json({
      error,
      message: "error"
    })
  }
}

export const updateProduct = async (req, res) => {
  try {
    const { pid } = req.params
    const product = await ProductService.updateProduct(pid, req.body)

    res.json({
      product,
      message: "Product updated"
    })
  } catch (error) {
    console.error(error)
    res.json({
      error,
      message: "error"
    })
  }
}
