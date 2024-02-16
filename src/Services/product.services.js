import { postModel } from "../models/product.model.js"

export async function findProduct(limit, page, query, sort) {
  const options = {
    limit: parseInt(limit) || 10,
    skip: parseInt(page - 1) * parseInt(limit) || 0,
    sort: sort || { createdAt: -1 }
  }

  return await postModel.find(query || {}, null, options)
}

export async function getProductById(id) {
  return await postModel.findById(id)
}

export async function createProduct(productData) {
  return await postModel.create(productData)
}

export async function updateProduct(id, productData) {
  return await postModel.findByIdAndUpdate(id, productData, { new: true })
}

export async function deleteProduct(id) {
  return await postModel.findByIdAndDelete(id)
}