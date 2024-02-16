import { CartModel } from "../models/cart.model.js"

export async function findCart() {
  return await CartModel.find()
}

export async function findById(_id) {
  return await CartModel.findById(_id)
}

export async function createCart(cart) {
  return await CartModel.create(cart)
}

export async function updateProducts(cid, cart) {
  return await CartModel.findByIdAndUpdate(cid, cart)
}

export async function deleteProductFromCart(cid, pid) {
  try {
    const cart = await CartModel.findById(cid);

    if (!cart) {
      throw new Error('Carrito no encontrado')
    }

    const initialProductCount = cart.products.length;

    cart.products = cart.products.filter(p => !p._id.equals(pid))

    if (cart.products.length === initialProductCount) {
      throw new Error('Producto no encontrado en el carrito')
    }

    await cart.save()

    return cart
  } catch (error) {
    throw error
  }
}

export async function clearCart(cid) {
  try {
    const cart = await CartModel.findById(cid)

    if (!cart) {
      throw new Error('Carrito no encontrado')
    }

    cart.products = []

    await cart.save()

    return cart
  } catch (error) {
    throw error
  }
}

export async function setProductQuantity(cid, pid, quantity) {
  try {
    const cart = await CartModel.findById(cid)

    if (!cart) {
      throw new Error('Carrito no encontrado');
    }

    const product = cart.products.find(p => p._id.equals(pid))

    if (!product) {
      throw new Error('Producto no encontrado en el carrito')
    }

    product.quantity = quantity;

    await cart.save()

    return cart
  } catch (error) {
    throw error
  }
}

export async function addProductCart(cid, pid) {
  try {
    const cart = await CartModel.findById(cid)

    if (!cart) {
      throw new Error('Carrito no encontrado')
    }

    const product = cart.products.find(p => p._id.equals(pid))

    if (product) {
      throw new Error('El producto ya está en el carrito')
    }

    cart.products.push(pid)

    await cart.save()

    return cart
  } catch (error) {
    throw error
  }
}