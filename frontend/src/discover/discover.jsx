import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import SiteNav from "../components/site-nav";
import { books } from "../data/books";
import "./discover.css";

const filterPills = [
  { label: "Available to Borrow", active: true },
  { label: "For Sale", active: false },
  { label: "Category", active: false, isDropdown: true },
];

const sidebarLinks = [
  ["⌕", "Discover", true],
  ["▦", "Overview", false],
  ["◷", "Borrow history", false],
  ["▤", "Purchases", false],
  ["♡", "Saved books", false],
  ["♙", "Profile", false],
  ["♧", "Notifications", false],
  ["♜", "Security", false],
];

function Discover() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 6;

  const handleBorrow = (book) => {
    console.log("Borrowing:", book.title);
    // Add your borrow logic here
  };

  const handleBuy = (book) => {
    navigate("/checkout", { state: { book, from: "/discover" } });
  };

  const handleSignOut = () => {
    localStorage.removeItem("bookieToken");
    localStorage.removeItem("bookieUser");
    sessionStorage.removeItem("bookieToken");
    sessionStorage.removeItem("bookieUser");
    navigate("/login", { replace: true });
  };

  const paginatedBooks = books.slice(
    (currentPage - 1) * booksPerPage,
    currentPage * booksPerPage
  );

  const totalPages = Math.ceil(books.length / booksPerPage);

  return (
    <div className="discover-page">
      <SiteNav activePage="discover" />
      <div className="discover-layout">
        <aside className="discover-sidebar">
          <p className="discover-sidebar__label">Explore &amp; your account</p>
          <nav aria-label="Discover and account navigation">
            {sidebarLinks.map(([icon, label, active]) => (
              label === "Discover" ? (
                <Link
                  className="discover-sidebar__link is-active"
                  key={label}
                  to="/discover"
                  aria-current={active ? "page" : undefined}
                >
                  <span aria-hidden="true">{icon}</span>
                  {label}
                </Link>
              ) : label === "Overview" ? (
                <Link
                  className="discover-sidebar__link"
                  key={label}
                  to="/dashboard"
                >
                  <span aria-hidden="true">{icon}</span>
                  {label}
                </Link>
              ) : (
                <div
                  className="discover-sidebar__link"
                  key={label}
                >
                  <span aria-hidden="true">{icon}</span>
                  {label}
                </div>
              )
            ))}
          </nav>
          <button
            className="discover-sidebar__signout"
            type="button"
            onClick={handleSignOut}
          >
            <span aria-hidden="true">↪</span>
            Sign out
          </button>
        </aside>

        <main className="discover-main">
      {/* Banner */}
      <header className="discover-banner">
        <div className="banner-content">
          <div className="banner-text">
            <p className="banner-eyebrow">The Bookie Edit · Timeless Stories</p>
            <h1>Some stories stay with you.</h1>
            <p className="banner-copy">
              Discover books to borrow for a while, or keep for a lifetime.
            </p>
          </div>
          <div className="banner-sidebar">
            <p className="banner-eyebrow">Curated for the curious</p>
            <h3>Old souls. New perspectives.</h3>
            <button
              className="banner-text-link"
              type="button"
              onClick={() => navigate("/dashboard")}
            >
              Back to my library <span>→</span>
            </button>
          </div>
        </div>
      </header>

      {/* Search & Filters */}
      <section className="discover-toolbar">
        <div className="toolbar-search">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search by title, author, or ISBN"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="search-clear">×</button>
        </div>

        <div className="toolbar-filters">
          {filterPills.map((pill, i) => (
            <button
              key={i}
              className={`toolbar-pill ${pill.active ? "is-active" : ""}`}
            >
              {pill.isDropdown ? (
                <>
                  {pill.label} <span>▾</span>
                </>
              ) : (
                <>
                  <span role="img" aria-label="check">
                    {pill.active ? "✓" : ""}
                  </span>
                  {pill.label}
                </>
              )}
            </button>
          ))}
        </div>
      </section>

      {/* Bookshelf Header */}
      <section className="discover-header">
        <div>
          <h2>The bookshelf</h2>
          <p>48 books to discover</p>
        </div>
        <div className="discover-sort">
          <span>Sort by:</span>
          <select defaultValue="Editor's picks">
            <option>Editor's picks</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Newest Arrivals</option>
          </select>
        </div>
      </section>

      {/* Book Grid */}
      <section className="discover-grid">
        {paginatedBooks.map((book) => (
          <article key={book.id} className="book-card">
            <div className="book-card__topline">
              <div className="book-card__badge">
                <span role="img" aria-label="available">✓</span> Available
              </div>
              <button
                className="book-card__fav"
                aria-label={`Favorite ${book.title}`}
                onClick={(e) => {
                  e.stopPropagation();
                  console.log("Toggle favorite:", book.title);
                }}
              >
                ♡
              </button>
            </div>
            <Link to={`/book/${book.id}`} className="book-card__cover-link">
              <div className={`book-cover book-cover--${book.tone}`}>
                <span className="book-cover-mark">B</span>
                <span className="book-cover-title">{book.title}</span>
                <span className="book-cover-author">{book.author}</span>
              </div>
            </Link>
            <div className="book-card__info">
              <div className="book-card__meta">
                <span className="book-card__category">{book.category}</span>
                <span className="book-card__price">{book.price}</span>
              </div>
              <Link
                to={`/book/${book.id}`}
                className="book-card__title"
              >
                {book.title}
              </Link>
              <p className="book-card__author">{book.author}</p>
              <div className="book-card__actions">
                <button
                  className="btn-borrow"
                  onClick={(e) => {
                    e.preventDefault();
                    handleBorrow(book);
                  }}
                >
                  Borrow
                </button>
                <button
                  className="btn-buy"
                  onClick={(e) => {
                    e.preventDefault();
                    handleBuy(book);
                  }}
                >
                  Buy
                </button>
              </div>
            </div>
          </article>
        ))}
      </section>

      {/* Pagination & Count */}
      <section className="discover-pagination">
        <span className="pagination-count">
          Showing {1}-{paginatedBooks.length} of 48 books
        </span>
        <div className="pagination-controls">
          <button disabled={currentPage === 1} onClick={() => setCurrentPage(1)}>
            ←
          </button>
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            ‹
          </button>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((page) => (
            <button
              key={page}
              className={currentPage === page ? "is-active" : ""}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            ›
          </button>
          <button
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
          >
            →
          </button>
        </div>
      </section>

      <footer className="discover-footer">
        <span>© 2026 Bookie. A good book deserves another chapter.</span>
        <div style={{ display: "flex", gap: "20px", fontSize: "12px", color: "#788487" }}>
          <span>Help & support</span>
          <span>Privacy</span>
          <span>Terms</span>
        </div>
      </footer>
        </main>
      </div>
    </div>
  );
}

export default Discover;