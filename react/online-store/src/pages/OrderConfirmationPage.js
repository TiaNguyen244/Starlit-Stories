"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"

const OrderConfirmationPage = () => {
  const { id } = useParams()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(`http://localhost:5000/order/${id}`)
        if (!response.ok) {
          throw new Error("Failed to fetch order details")
        }
        const data = await response.json()
        setOrder(data)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching order:", error)
        setError("Failed to load order details. Please try again later.")
        setLoading(false)
      }
    }

    fetchOrder()
  }, [id])

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading your order confirmation...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger">{error}</div>
        <Link to="/" className="btn btn-primary">
          Return to Home
        </Link>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="container py-5">
        <div className="alert alert-warning">Order not found</div>
        <Link to="/" className="btn btn-primary">
          Return to Home
        </Link>
      </div>
    )
  }

  // Format date
  const orderDate = new Date(order.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  // Calculate estimated delivery date (7 days from order date)
  const deliveryDate = new Date(order.createdAt)
  deliveryDate.setDate(deliveryDate.getDate() + 7)
  const formattedDeliveryDate = deliveryDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="container py-5">
      {/* Thank You Message Card */}
      <div className="card border-success mb-5">
        <div className="card-header bg-success text-white">
          <h2 className="mb-0 text-center">Thank You for Your Purchase!</h2>
        </div>
        <div className="card-body text-center p-5">
          <div className="mb-4">
            <i className="bi bi-check-circle-fill text-success" style={{ fontSize: "5rem" }}></i>
          </div>
          <h3 className="mb-3">Your order has been confirmed!</h3>
          <p className="lead mb-4">
            Dear {order.customer.firstName}, thank you for shopping with Starlit Stories. We're thrilled to have you as
            our customer!
          </p>
          <div className="alert alert-info mb-4">
            <strong>Order Number:</strong> {order._id}
          </div>
          <p className="mb-4">
            A confirmation email has been sent to <strong>{order.customer.email}</strong> with all the details of your
            purchase.
          </p>
          <div className="card bg-light mb-4">
            <div className="card-body">
              <h5 className="card-title">Special Offer</h5>
              <p className="card-text">
                As a thank you for your purchase, enjoy <strong>10% off</strong> your next order with code:{" "}
                <strong>THANKYOU10</strong>
              </p>
              <small className="text-muted">Valid for 30 days from today.</small>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-8">
          <div className="card mb-4">
            <div className="card-header bg-light">
              <h4 className="mb-0">Order Details</h4>
            </div>
            <div className="card-body">
              <div className="row mb-4">
                <div className="col-md-6">
                  <h5>Order Information</h5>
                  <p>
                    <strong>Order Date:</strong> {orderDate}
                  </p>
                  <p>
                    <strong>Order Number:</strong> {order._id}
                  </p>
                  <p>
                    <strong>Order Status:</strong> <span className="badge bg-info">Processing</span>
                  </p>
                  <p>
                    <strong>Estimated Delivery:</strong> {formattedDeliveryDate}
                  </p>
                </div>
                <div className="col-md-6">
                  <h5>Shipping Address</h5>
                  <p>
                    {order.customer.firstName} {order.customer.lastName}
                  </p>
                  <p>{order.customer.address}</p>
                  <p>
                    {order.customer.city}, {order.customer.state} {order.customer.zipCode}
                  </p>
                  <p>{order.customer.country}</p>
                </div>
              </div>

              <h5>Items Ordered</h5>
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th className="text-center">Quantity</th>
                      <th className="text-end">Price</th>
                      <th className="text-end">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.items.map((item, index) => (
                      <tr key={index}>
                        <td>{item.title}</td>
                        <td className="text-center">{item.quantity}</td>
                        <td className="text-end">${item.price.toFixed(2)}</td>
                        <td className="text-end">${(item.price * item.quantity).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <th colSpan="3" className="text-end">
                        Subtotal:
                      </th>
                      <th className="text-end">${order.totalAmount.toFixed(2)}</th>
                    </tr>
                    <tr>
                      <th colSpan="3" className="text-end">
                        Shipping:
                      </th>
                      <td className="text-end">Free</td>
                    </tr>
                    <tr>
                      <th colSpan="3" className="text-end">
                        Total:
                      </th>
                      <th className="text-end">${order.totalAmount.toFixed(2)}</th>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card mb-4">
            <div className="card-header bg-light">
              <h4 className="mb-0">What's Next?</h4>
            </div>
            <div className="card-body">
              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex">
                  <i className="bi bi-envelope me-3 text-primary" style={{ fontSize: "1.5rem" }}></i>
                  <div>
                    <h5>Check Your Email</h5>
                    <p className="mb-0">We've sent a confirmation to {order.customer.email}</p>
                  </div>
                </li>
                <li className="list-group-item d-flex">
                  <i className="bi bi-box-seam me-3 text-primary" style={{ fontSize: "1.5rem" }}></i>
                  <div>
                    <h5>Track Your Order</h5>
                    <p className="mb-0">You'll receive shipping updates via email</p>
                  </div>
                </li>
                <li className="list-group-item d-flex">
                  <i className="bi bi-book me-3 text-primary" style={{ fontSize: "1.5rem" }}></i>
                  <div>
                    <h5>Enjoy Your Books</h5>
                    <p className="mb-0">Your literary adventure awaits!</p>
                  </div>
                </li>
                <li className="list-group-item d-flex">
                  <i className="bi bi-question-circle me-3 text-primary" style={{ fontSize: "1.5rem" }}></i>
                  <div>
                    <h5>Need Help?</h5>
                    <p className="mb-0">Our customer service team is here for you</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="card mb-4 border-primary">
            <div className="card-header bg-primary text-white">
              <h4 className="mb-0">Join Our Community</h4>
            </div>
            <div className="card-body">
              <p>Share your reading journey with fellow book lovers!</p>
              <div className="d-flex justify-content-center gap-3 mb-3">
                <a href="#" className="btn btn-outline-primary rounded-circle">
                  <i className="bi bi-facebook"></i>
                </a>
                <a href="#" className="btn btn-outline-primary rounded-circle">
                  <i className="bi bi-twitter"></i>
                </a>
                <a href="#" className="btn btn-outline-primary rounded-circle">
                  <i className="bi bi-instagram"></i>
                </a>
              </div>
              <div className="input-group">
                <input type="email" className="form-control" placeholder="Enter email for newsletter" />
                <button className="btn btn-primary" type="button">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          <div className="d-grid gap-2">
            <Link to="/books" className="btn btn-primary">
              Continue Shopping
            </Link>
            <Link to="/" className="btn btn-outline-secondary">
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderConfirmationPage

