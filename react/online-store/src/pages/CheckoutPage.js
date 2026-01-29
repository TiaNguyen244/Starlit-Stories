"use client"

import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useCart } from "../context/CartContext"

const CheckoutPage = () => {
  const navigate = useNavigate()
  const { cartItems, cartTotal, clearCart } = useCart()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
    cardName: "",
    cardNumber: "",
    expMonth: "",
    expYear: "",
    cvv: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const validateForm = () => {
    const newErrors = {}

    // Basic validation
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required"
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = "Email is invalid"
    if (!formData.address.trim()) newErrors.address = "Address is required"
    if (!formData.city.trim()) newErrors.city = "City is required"
    if (!formData.state.trim()) newErrors.state = "State is required"
    if (!formData.zipCode.trim()) newErrors.zipCode = "ZIP code is required"
    if (!formData.cardName.trim()) newErrors.cardName = "Name on card is required"
    if (!formData.cardNumber.trim()) newErrors.cardNumber = "Card number is required"
    if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ""))) newErrors.cardNumber = "Card number must be 16 digits"
    if (!formData.expMonth.trim()) newErrors.expMonth = "Expiration month is required"
    if (!formData.expYear.trim()) newErrors.expYear = "Expiration year is required"
    if (!formData.cvv.trim()) newErrors.cvv = "CVV is required"
    if (!/^\d{3,4}$/.test(formData.cvv)) newErrors.cvv = "CVV must be 3 or 4 digits"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Create order object
      const order = {
        customer: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          country: formData.country,
        },
        items: cartItems.map((item) => ({
          bookId: item._id || item.id,
          title: item.title,
          price:
            typeof item.price === "string"
              ? Number.parseFloat(item.price.replace("$", "")) || 0
              : typeof item.price === "number"
              ? item.price
              : 0,
          quantity: Number(item.quantity) || 0,
        })),
        totalAmount: cartTotal,
        status: "pending",
        createdAt: new Date(),
      }

      // Send order to API
      const response = await fetch("http://localhost:5000/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      })

      if (!response.ok) {
        throw new Error("Failed to create order")
      }

      const data = await response.json()

      // Clear cart
      clearCart()

      // Redirect to order confirmation
      navigate(`/order-confirmation/${data._id}`)
    } catch (error) {
      console.error("Error creating order:", error)
      setErrors({ submit: "Failed to process your order. Please try again." })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (cartItems.length === 0) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <h2 className="mb-4">Your Cart is Empty</h2>
          <p className="mb-4">You need to add items to your cart before checking out.</p>
          <Link to="/books" className="btn btn-primary">
            Browse Books
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-5">
      <h2 className="mb-4">Checkout</h2>

      {errors.submit && <div className="alert alert-danger mb-4">{errors.submit}</div>}

      <div className="row">
        <div className="col-md-8">
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title mb-4">Shipping Information</h5>
              <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="firstName" className="form-label">
                      First Name
                    </label>
                    <input
                      type="text"
                      className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                    {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="lastName" className="form-label">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                    {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className={`form-control ${errors.email ? "is-invalid" : ""}`}
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>

                <div className="mb-3">
                  <label htmlFor="address" className="form-label">
                    Address
                  </label>
                  <input
                    type="text"
                    className={`form-control ${errors.address ? "is-invalid" : ""}`}
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                  />
                  {errors.address && <div className="invalid-feedback">{errors.address}</div>}
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="city" className="form-label">
                      City
                    </label>
                    <input
                      type="text"
                      className={`form-control ${errors.city ? "is-invalid" : ""}`}
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                    />
                    {errors.city && <div className="invalid-feedback">{errors.city}</div>}
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="state" className="form-label">
                      State
                    </label>
                    <input
                      type="text"
                      className={`form-control ${errors.state ? "is-invalid" : ""}`}
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                    />
                    {errors.state && <div className="invalid-feedback">{errors.state}</div>}
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="zipCode" className="form-label">
                      ZIP Code
                    </label>
                    <input
                      type="text"
                      className={`form-control ${errors.zipCode ? "is-invalid" : ""}`}
                      id="zipCode"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                    />
                    {errors.zipCode && <div className="invalid-feedback">{errors.zipCode}</div>}
                  </div>
                </div>

                <div className="mb-4">
                  <label htmlFor="country" className="form-label">
                    Country
                  </label>
                  <select
                    className="form-select"
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                  >
                    <option value="United States">United States</option>
                    <option value="Canada">Canada</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Australia">Australia</option>
                    <option value="Germany">Germany</option>
                    <option value="France">France</option>
                  </select>
                </div>

                <h5 className="card-title mb-4">Payment Information</h5>

                <div className="mb-3">
                  <label htmlFor="cardName" className="form-label">
                    Name on Card
                  </label>
                  <input
                    type="text"
                    className={`form-control ${errors.cardName ? "is-invalid" : ""}`}
                    id="cardName"
                    name="cardName"
                    value={formData.cardName}
                    onChange={handleChange}
                  />
                  {errors.cardName && <div className="invalid-feedback">{errors.cardName}</div>}
                </div>

                <div className="mb-3">
                  <label htmlFor="cardNumber" className="form-label">
                    Card Number
                  </label>
                  <input
                    type="text"
                    className={`form-control ${errors.cardNumber ? "is-invalid" : ""}`}
                    id="cardNumber"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    placeholder="XXXX XXXX XXXX XXXX"
                  />
                  {errors.cardNumber && <div className="invalid-feedback">{errors.cardNumber}</div>}
                </div>

                <div className="row mb-3">
                  <div className="col-md-4">
                    <label htmlFor="expMonth" className="form-label">
                      Expiration Month
                    </label>
                    <select
                      className={`form-select ${errors.expMonth ? "is-invalid" : ""}`}
                      id="expMonth"
                      name="expMonth"
                      value={formData.expMonth}
                      onChange={handleChange}
                    >
                      <option value="">Month</option>
                      {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                        <option key={month} value={month.toString().padStart(2, "0")}>
                          {month.toString().padStart(2, "0")}
                        </option>
                      ))}
                    </select>
                    {errors.expMonth && <div className="invalid-feedback">{errors.expMonth}</div>}
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="expYear" className="form-label">
                      Expiration Year
                    </label>
                    <select
                      className={`form-select ${errors.expYear ? "is-invalid" : ""}`}
                      id="expYear"
                      name="expYear"
                      value={formData.expYear}
                      onChange={handleChange}
                    >
                      <option value="">Year</option>
                      {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i).map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                    {errors.expYear && <div className="invalid-feedback">{errors.expYear}</div>}
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="cvv" className="form-label">
                      CVV
                    </label>
                    <input
                      type="text"
                      className={`form-control ${errors.cvv ? "is-invalid" : ""}`}
                      id="cvv"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleChange}
                      placeholder="XXX"
                    />
                    {errors.cvv && <div className="invalid-feedback">{errors.cvv}</div>}
                  </div>
                </div>

                <div className="d-grid mt-4">
                  <button type="submit" className="btn btn-primary btn-lg" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Processing...
                      </>
                    ) : (
                      `Complete Order - $${cartTotal.toFixed(2)}`
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title mb-4">Order Summary</h5>
              <div className="d-flex justify-content-between mb-3">
                <span>Items ({cartItems.reduce((total, item) => total + item.quantity, 0)}):</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span>Shipping:</span>
                <span>Free</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between mb-4">
                <strong>Order Total:</strong>
                <strong>${cartTotal.toFixed(2)}</strong>
              </div>

              <div className="card mb-3">
                <div className="card-header bg-light">
                  <h6 className="mb-0">Items in Cart</h6>
                </div>
                <ul className="list-group list-group-flush">
                  {cartItems.map((item) => (
                    <li
                      key={item._id || item.id}
                      className="list-group-item d-flex justify-content-between align-items-center"
                    >
                      <div>
                        <div className="fw-bold">{item.title}</div>
                        <small className="text-muted">Qty: {item.quantity}</small>
                      </div>
                      <span>{
                        '$' + (
                          ((typeof item.price === 'string')
                            ? (Number.parseFloat(item.price.replace('$', '')) || 0)
                            : (typeof item.price === 'number' ? item.price : 0)) * (Number(item.quantity) || 0)
                        ).toFixed(2)
                      }</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link to="/cart" className="btn btn-outline-secondary d-block">
                Edit Cart
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage

