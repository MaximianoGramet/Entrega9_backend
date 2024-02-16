import * as CartService from "../Services/cart.services.js"

export const getCartController = async (req, res) => {
    try {
        const carts = await CartService.findCart()
        res.json({
            data: carts,
            message: "Carts list"
        })
    } catch (error) {
        console.error(error)
        res.json({
            error,
            message: "Error"
        })
    }
}

export const getCartByIdController = async (req, res) => {
    const { cid } = req.params
    try {
        const cart = await CartService.findById(cid)

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" })
        }

        res.json({
            cart,
            message: "Cart found",
        })
    } catch (error) {
        console.error(error)
        res.json({
            error,
            message: "Error",
        })
    }
}

export const createCartController = async (req, res) => {
    try {
        const cart = await CartService.createCart(req.body)
        res.json({
            cart,
            message: "Cart created"
        })
    } catch (error) {
        console.error(error)
        res.json({
            error,
            message: "Error"
        })
    }
}

export const updateCartController = async (req, res) => {
    const { cid } = req.params
    try {
        const cart = await CartService.updateProducts(cid, req.body)
        res.json({
            cart,
            message: "Cart updated"
        })
    } catch (error) {
        console.error(error)
        res.json({
            error,
            message: "Error"
        })
    }
}

export const deleteCartController = async (req, res) => {
    const { cid } = req.params
    try {
        const cart = await CartService.deleteCart(cid)
        res.json({
            cart,
            message: "Cart deleted"
        })
    } catch (error) {
        console.error(error)
        res.json({
            error,
            message: "Error"
        })
    }
}

export const clearCartController = async (req, res) => {
    const { cid } = req.params
    try {
        const result = await CartService.clearCart(cid)
        res.json({
            result,
            message: "Cart cleared"
        })
    } catch (error) {
        console.error(error)
        res.json({
            error,
            message: "Error"
        })
    }
}

export const deleteProductFromCartController = async (req, res) => {
    const { cid, pid } = req.params
    try {
        const result = await CartService.deleteProductFromCart(cid, pid)
        res.json({
            result,
            message: "Product deleted from cart"
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: error.message })
    }
}

export const setProductQuantityController = async (req, res) => {
    const { cid, pid } = req.params
    const { quantity } = req.body
    try {
        const result = await CartService.setProductQuantity(cid, pid, quantity)
        res.json({
            result,
            message: "Product quantity updated"
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: error.message })
    }
}

export const addProductCartController = async (req, res) => {
    const { cid, pid } = req.params
    try {
        const result = await CartService.addProductCart(cid, pid)
        res.json({
            result,
            message: "Product added"
        })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}
