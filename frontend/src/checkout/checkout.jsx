import React, { useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import SiteNav from "../components/site-nav";
import { books } from "../data/books";
import "./checkout.css";

function Checkout() {
  const location = useLocation();
  const [orderNotice, setOrderNotice] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("khqr");
  const bookId = location.state?.book?.id;
  const book = books.find((item) => item.id === Number(bookId));
  const backTo = location.state?.from || "/discover";
  const subtotal = book
    ? Number(book.price.replace(/[^\d.]/g, ""))
    : 0;
  const shipping = 4;
  const tax = Math.round(subtotal * 0.1 * 100) / 100;
  const total = subtotal + shipping + tax;
  const formatPrice = (amount) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setOrderNotice(
      "This checkout is a demo. No order was submitted and no payment was processed."
    );
  };

  if (!book) {
    return <Navigate to="/discover" replace />;
  }

  return (
    <div className="checkout-page">
      <SiteNav activePage="checkout" />

      <main className="checkout-main">
        <div className="checkout-container">
          {/* Breadcrumb */}
          <nav className="checkout-breadcrumb" aria-label="Breadcrumb">
            <Link to={backTo} className="breadcrumb-link">
              {backTo.startsWith("/book/") ? "Back to book" : "Back to discover"}
            </Link>
          </nav>

          {/* Page Header */}
          <div className="checkout-header">
            <h1>Make it yours.</h1>
            <p className="checkout-header__copy">
              Your new book, your new world. Delivered to your door.
            </p>
          </div>

          <div className="checkout-grid">
            {/* Left Column */}
            <div className="checkout-left">
              {/* Shipping Details */}
              <section className="checkout-section">
                <div className="section-header">
                  <span className="section-step">1</span>
                  <h2 className="section-title">Shipping details</h2>
                </div>
                <form className="checkout-form" noValidate>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">First name</label>
                      <input className="form-control" type="text" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Last name</label>
                      <input className="form-control" type="text" />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Email address</label>
                    <input
                      className="form-control"
                      type="email"
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Street address</label>
                      <input className="form-control" type="text" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Apartment, suite (optional)</label>
                      <input className="form-control" type="text" />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">City</label>
                      <input className="form-control" type="text" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">State</label>
                      <select className="form-control" defaultValue="">
                        <option value="" disabled>Select a state</option>
                        <option>New York</option>
                        <option>California</option>
                        <option>Texas</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">ZIP code</label>
                      <input className="form-control" type="text" />
                    </div>
                  </div>

                  <div className="delivery-option">
                    <label className="radio-label">
                      <input type="radio" name="delivery" defaultChecked />
                      <span className="radio-check"></span>
                      <span className="radio-text">Standard delivery</span>
                    </label>
                    <span className="delivery-meta">Arrives in 3-5 business days</span>
                    <span className="delivery-price">$4.00</span>
                  </div>
                </form>
              </section>

              {/* Payment Details */}
              <section className="checkout-section">
                <div className="section-header">
                  <span className="section-step">2</span>
                  <h2 className="section-title">Pay with QR</h2>
                </div>
                <div className="qr-payment">
                  <p className="qr-payment__intro">
                    Choose your preferred Cambodian QR payment method.
                  </p>
                  <div className="qr-payment__methods" role="group" aria-label="Payment method">
                    <button
                      type="button"
                      className={`qr-payment__method${paymentMethod === "khqr" ? " is-selected" : ""}`}
                      aria-pressed={paymentMethod === "khqr"}
                      onClick={() => setPaymentMethod("khqr")}
                    >
                      <strong>KHQR</strong>
                      <span>Scan with a supported banking app</span>
                    </button>
                    <button
                      type="button"
                      className={`qr-payment__method${paymentMethod === "aba" ? " is-selected" : ""}`}
                      aria-pressed={paymentMethod === "aba"}
                      onClick={() => setPaymentMethod("aba")}
                    >
                      <strong>ABA PAY</strong>
                      <span>Pay using the ABA mobile app</span>
                    </button>
                  </div>
                  <div className="qr-payment__panel">
                    <div className={`qr-payment__brand qr-payment__brand--${paymentMethod}`}>
                      {paymentMethod === "khqr" ? "KHQR" : "ABA PAY"}
                    </div>
                    <div className="qr-payment__placeholder" role="img" aria-label="Merchant payment QR code is not configured">
                      <span aria-hidden="true">▦</span>
                      <strong>Merchant QR not connected</strong>
                      <small>This demo cannot accept a payment yet.</small>
                    </div>
                    <p className="qr-payment__instructions">
                      {paymentMethod === "khqr"
                        ? "A real KHQR code from your business account will appear here. Scan it with a KHQR-compatible banking app."
                        : "A real ABA merchant QR code will appear here. Scan it with the ABA mobile app."}
                    </p>
                    <div className="qr-payment__amount">
                      <span>Amount due</span>
                      <strong>{formatPrice(total)}</strong>
                    </div>
                  </div>
                  <p className="qr-payment__note">
                    Payments are not enabled. Add your official merchant QR or
                    payment gateway before accepting orders.
                  </p>
                </div>
              </section>
            </div>

            {/* Right Column */}
            <div className="checkout-right">
              <section className="order-summary">
                <div className="summary-header">
                  <h2>Order summary</h2>
                  <span className="summary-count">1 item</span>
                </div>

                <div className="summary-item">
                  <div className="summary-item__cover">
                    <div className={`checkout-book-cover checkout-book-cover--${book.tone}`}>
                      <span>{book.title}</span>
                      <small>{book.author}</small>
                    </div>
                  </div>
                  <div className="summary-item__info">
                    <span className="summary-item__badge">YOURS TO KEEP</span>
                    <h3 className="summary-item__title">{book.title}</h3>
                    <p className="summary-item__author">{book.author}</p>
                    <p className="summary-item__format">{book.format || "Paperback"} · Qty 1</p>
                    <p className="summary-item__price">{formatPrice(subtotal)}</p>
                  </div>
                </div>

                <div className="summary-promo">
                  <input
                    className="promo-input"
                    type="text"
                    placeholder="Gift card or promo code"
                  />
                  <button className="promo-btn">Apply</button>
                </div>

                <div className="summary-breakdown">
                  <div className="breakdown-row">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="breakdown-row">
                    <span>Shipping</span>
                    <span>{formatPrice(shipping)}</span>
                  </div>
                  <div className="breakdown-row">
                    <span>Estimated tax</span>
                    <span>{formatPrice(tax)}</span>
                  </div>
                </div>

                <div className="summary-total">
                  <span>Total</span>
                  <span className="total-value">{formatPrice(total)}</span>
                </div>

                <form onSubmit={handlePlaceOrder} className="summary-actions">
                  {orderNotice && (
                    <p className="checkout-notice" role="status">
                      {orderNotice}
                    </p>
                  )}
                  <button type="submit" className="btn-place-order">
                    <span>🛒</span> Place order · {formatPrice(total)}
                  </button>
                </form>

                <p className="summary-terms">
                  By placing your order, you agree to our terms.{" "}
                  <Link to="/">Terms of Service</Link> and{" "}
                  <Link to="/">returns policy</Link>.
                </p>

                <span className="summary-help">
                  A question before your next chapter? Get in touch.
                </span>
              </section>
            </div>
          </div>
        </div>
      </main>

      <footer className="checkout-footer">
        <span>© 2026 Bookie. A good book deserves another chapter.</span>
        <div className="footer-links">
          <span>Help & support</span>
          <span>Privacy</span>
          <span>Terms</span>
        </div>
      </footer>
    </div>
  );
}

export default Checkout;