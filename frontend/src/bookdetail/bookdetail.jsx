import React, { useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import SiteNav from "../components/site-nav";
import { books } from "../data/books";
import "./bookdetail.css";

function BookDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const book = books.find((item) => item.id === Number(id));
  const [favorited, setFavorited] = useState(false);

  if (!book) {
    return <Navigate to="/discover" replace />;
  }

  const metadata = [
    ["ISBN", book.isbn],
    ["Category", book.category],
    ["Language", book.language],
    ["Format", book.format],
    ["Pages", book.pages],
    ["Publisher", book.publisher],
  ].filter(([, value]) => value);

  const handleBorrow = () => {
    alert(`Borrowing ${book.title} for 21 days...`);
  };

  const handleBuy = () => {
    navigate(`/checkout`, { state: { book, from: `/book/${book.id}` } });
  };

  return (
    <div className="book-detail-page">
      <SiteNav activePage="discover" />

      <nav className="book-detail-breadcrumb" aria-label="Breadcrumb">
        <ol className="breadcrumb-list">
          <li className="breadcrumb-item">
            <Link to="/discover">Discover</Link>
            <span className="breadcrumb-separator">›</span>
          </li>
          <li className="breadcrumb-item">
            <Link to="/discover">{book.category}</Link>
            <span className="breadcrumb-separator">›</span>
          </li>
          <li className="breadcrumb-item" aria-current="page">
            <span>{book.title}</span>
          </li>
        </ol>
      </nav>

      <main className="book-detail-main">
        <div className="book-detail-container">
          <div className="book-detail-left">
            <div className="book-cover-wrapper">
              <button
                className={`book-detail-favorite${favorited ? " is-active" : ""}`}
                type="button"
                onClick={() => setFavorited(!favorited)}
                aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
                aria-pressed={favorited}
              >
                {favorited ? "♥" : "♡"}
              </button>
              <div className={`book-cover book-cover--${book.tone}`}>
                <span className="book-cover-mark">B</span>
                <span className="book-cover-title">{book.title}</span>
                <span className="book-cover-author">{book.author}</span>
              </div>
              <div className="book-collection-label">
                THE BOOKIE CLASSICS COLLECTION
              </div>
            </div>

            <div className="book-detail-features">
              <div className="feature-item">
                <span className="feature-icon">📦</span>
                <span>Carefully delivered</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">✒️</span>
                <span>Thoughtfully curated</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">🛡️</span>
                <span>Quality checked</span>
              </div>
            </div>
          </div>

          <div className="book-detail-right">
            <div className="book-detail-badges">
              {book.available && (
                <span className="badge available">✓ Available to borrow</span>
              )}
              {book.editorPick && (
                <span className="badge editor-pick">Editor's pick</span>
              )}
            </div>

            <h1 className="book-detail-title">{book.title}</h1>
            <p className="book-detail-author">by {book.author}</p>

            {book.rating && (
              <div className="book-detail-rating">
                <span className="rating-stars">★★★★★</span>
                <span className="rating-value">{book.rating}</span>
                <span className="rating-count">{book.reviews}</span>
              </div>
            )}

            <p className="book-detail-description">
              {book.description || "More details about this title are coming soon."}
            </p>

            {metadata.length > 0 && (
              <div className="book-detail-meta">
                {metadata.map(([label, value]) => (
                  <div className="meta-row" key={label}>
                    <span className="meta-label">{label}</span>
                    <span className="meta-value">{value}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="book-detail-price-section">
              <div className="price-ownership">
                <p className="price-eyebrow">Yours to keep</p>
                <span className="price-value">{book.price}</span>
              </div>
              <span className="stock-status">
                {book.available ? "In stock - Ships in 1-2 business days" : "Unavailable"}
              </span>
            </div>

            <div className="book-detail-actions">
              <button
                className="btn-borrow"
                type="button"
                onClick={handleBorrow}
                disabled={!book.available}
              >
                <span>📖</span> Borrow for 21 days
              </button>
              <button className="btn-buy" type="button" onClick={handleBuy}>
                <span>🛒</span> Buy for {book.price}
              </button>
            </div>

            <div className="book-detail-loan-note">
              <span role="img" aria-label="info">ℹ️</span>
              Borrow at no cost with your membership. Return in 21 days, or renew
              if no one is waiting.
            </div>
          </div>
        </div>

        {book.editorNote && (
          <section className="book-detail-note">
            <div className="note-container">
              <div className="note-left">
                <p className="note-eyebrow">Why we love it</p>
                <h3>A note from Bookie</h3>
              </div>
              <div className="note-right">
                <p className="note-quote">"{book.editorNote.quote}"</p>
                <p className="note-copy">{book.editorNote.copy}</p>
              </div>
            </div>
          </section>
        )}
      </main>

      <footer className="book-detail-footer">
        <span>© 2026 Bookie. A good book deserves another chapter.</span>
        <div className="footer-links">
          <span>Help &amp; support</span>
          <span>Privacy</span>
          <span>Terms</span>
        </div>
      </footer>
    </div>
  );
}

export default BookDetail;
