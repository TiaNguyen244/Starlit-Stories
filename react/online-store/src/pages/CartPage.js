"use client"

import { Link } from "react-router-dom"
import { useCart } from "../context/CartContext"

const CartPage = () => {
  const { cartItems, cartTotal, updateCartItemQuantity, removeFromCart } = useCart()

  if (cartItems.length === 0) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <h2 className="mb-4">Your Cart is Empty</h2>
          <p className="mb-4">Looks like you haven't added any books to your cart yet.</p>
          <Link to="/books" className="btn btn-primary">
            Browse Books
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-5">
      <h2 className="mb-4">Your Shopping Cart</h2>

      <div className="card mb-4">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col" style={{ width: "50%" }}>
                    Book
                  </th>
                  <th scope="col" className="text-center">
                    Price
                  </th>
                  <th scope="col" className="text-center">
                    Quantity
                  </th>
                  <th scope="col" className="text-center">
                    Total
                  </th>
                  <th scope="col" className="text-center">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item._id || item.id}>
                    <td>
                      <div className="d-flex align-items-center">
                        <img
                          src={item.coverImage || "/placeholder.svg?height=80&width=60"}
                          alt={item.title}
                          className="me-3"
                          style={{ width: "60px", height: "80px", objectFit: "cover" }}
                        />
                        <div>
                          <h6 className="mb-0">{item.title}</h6>
                          <small className="text-muted">by {item.author}</small>
                        </div>
                      </div>
                    </td>
                    <td className="text-center align-middle">${item.price || "N/A"}</td>
                    <td className="text-center align-middle">
                      <select
                        className="form-select form-select-sm mx-auto"
                        style={{ width: "80px" }}
                        value={item.quantity}
                        onChange={(e) => updateCartItemQuantity(item._id || item.id, Number.parseInt(e.target.value))}
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                          <option key={num} value={num}>
                            {num}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="text-center align-middle">${((item.price || 0) * item.quantity).toFixed(2)}</td>
                    <td className="text-center align-middle">
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => removeFromCart(item._id || item.id)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 offset-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title mb-4">Order Summary</h5>
              <div className="d-flex justify-content-between mb-3">
                <span>Subtotal:</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span>Shipping:</span>
                <span>Free</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between mb-4">
                <strong>Total:</strong>
                <strong>${cartTotal.toFixed(2)}</strong>
              </div>
              <div className="d-grid">
                <Link to="/checkout" className="btn btn-primary">
                  Proceed to Checkout
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartPage

