"use client"

import { createContext, useContext, useState, useEffect } from "react"

const CartContext = createContext()

export const useCart = () => useContext(CartContext)

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([])
  const [cartCount, setCartCount] = useState(0)
  const [cartTotal, setCartTotal] = useState(0)

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart)
        setCartItems(parsedCart)
      } catch (error) {
        console.error("Error parsing cart from localStorage:", error)
      }
    }
  }, [])

  // Update localStorage and cart totals whenever cartItems changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems))

    // Calculate cart count and total
    const count = cartItems.reduce((total, item) => total += item.quantity, 0)
    const total = cartItems.reduce((sum, item) => {
      // Handle price formats like "$24.99"
      const price = Number.parseFloat(item.price?.replace("$", "")) || 0
      return sum + price * item.quantity
    }, 0)

    setCartCount(count)
    setCartTotal(total)
  }, [cartItems])

  const addToCart = (item) => {
    setCartItems((prevItems) => {
      // Check if item already exists in cart
      const existingItemIndex = prevItems.findIndex(
        (cartItem) =>
          (cartItem._id && item._id && cartItem._id === item._id) ||
          (cartItem.id && item.id && cartItem.id === item.id),
      )

      if (existingItemIndex >= 0) {
        // Item exists, update quantity
        const updatedItems = [...prevItems]
        updatedItems[existingItemIndex].quantity += item.quantity
        return updatedItems
      } else {
        // Item doesn't exist, add to cart
        return [...prevItems, item]
      }
    })
  }

  const updateCartItemQuantity = (itemId, quantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if ((item._id && item._id === itemId) || (item.id && item.id === itemId)) {
          return { ...item, quantity }
        }
        return item
      }),
    )
  }

  const removeFromCart = (itemId) => {
    setCartItems((prevItems) =>
      prevItems.filter(
        (item) => (item._id !== itemId || item._id === undefined) && (item.id !== itemId || item.id === undefined),
      ),
    )
  }

  const clearCart = () => {
    setCartItems([])
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        cartTotal,
        addToCart,
        updateCartItemQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

