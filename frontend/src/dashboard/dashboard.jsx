import React from "react";
import { useNavigate } from "react-router-dom";
import SiteNav from "../components/site-nav";
import "./dashboard.css";

const borrowedBooks = [
  {
    title: "Jane Eyre",
    author: "Charlotte Bronte",
    due: "Due November 14, 2026",
    daysLeft: "8 days left",
    tone: "rose",
  },
  {
    title: "Frankenstein",
    author: "Mary Shelley",
    due: "Due November 19, 2026",
    daysLeft: "14 days left",
    tone: "green",
  },
];

const recommendations = [
  {
    title: "The Secret History",
    author: "Donna Tartt",
    category: "Literary fiction",
    tone: "navy",
  },
  {
    title: "Pride and Prejudice",
    author: "Jane Austen",
    category: "Classics",
    tone: "gold",
  },
  {
    title: "The Picture of Dorian Gray",
    author: "Oscar Wilde",
    category: "Gothic fiction",
    tone: "plum",
  },
];

const accountLinks = [
  ["▦", "Overview", true],
  ["◷", "Borrow history", false],
  ["▤", "Purchases", false],
  ["♡", "Saved books", false],
  ["♙", "Profile", false],
  ["♧", "Notifications", false],
];

function getCurrentUser() {
  const savedUser =
    localStorage.getItem("bookieUser") ||
    sessionStorage.getItem("bookieUser");

  if (!savedUser) {
    return null;
  }

  try {
    return JSON.parse(savedUser);
  } catch (error) {
    console.error("Could not read the saved user profile:", error);
    return null;
  }
}

function BookCover({ title, author, tone, compact = false }) {
  return (
    <div
      className={`book-cover book-cover--${tone}${compact ? " book-cover--compact" : ""}`}
      aria-label={`${title} by ${author}`}
      role="img"
    >
      <span className="book-cover-mark">B</span>
      <span className="book-cover-title">{title}</span>
      <span className="book-cover-author">{author}</span>
    </div>
  );
}

function Dashboard() {
  const navigate = useNavigate();
  const userName = getCurrentUser()?.username || "Reader";

  const handleSignOut = () => {
    localStorage.removeItem("bookieToken");
    localStorage.removeItem("bookieUser");
    sessionStorage.removeItem("bookieToken");
    sessionStorage.removeItem("bookieUser");
    navigate("/login", { replace: true });
  };

  return (
    <div className="dashboard">
      <SiteNav activePage="library" userName={userName} />

      <div className="dashboard-layout">
        <aside className="dashboard-sidebar">
          <p className="dashboard-sidebar__label">Your account</p>
          <nav aria-label="Account navigation">
            {accountLinks.map(([icon, label, active]) => (
              <div
                className={`dashboard-sidebar__link${active ? " is-active" : ""}`}
                key={label}
                aria-current={active ? "page" : undefined}
              >
                <span aria-hidden="true">{icon}</span>
                {label}
              </div>
            ))}
          </nav>
          <button
            className="dashboard-signout"
            type="button"
            onClick={handleSignOut}
          >
            <span aria-hidden="true">↪</span>
            Sign out
          </button>
        </aside>

        <main className="dashboard-content">
          <section className="dashboard-welcome">
            <div>
              <p className="dashboard-eyebrow">Your reading life, all in one place</p>
              <h1>Welcome back, {userName}.</h1>
              <p className="dashboard-welcome__copy">
                Your next chapter starts here. Make yourself at home.
              </p>
            </div>
            <div className="dashboard-welcome__decoration" aria-hidden="true">
              <span>BOOKS</span>
              <strong>Find your<br />next favorite.</strong>
              <i>✦</i>
            </div>
          </section>

          <section className="dashboard-stats" aria-label="Reading activity">
            <article className="dashboard-stat">
              <span className="dashboard-stat__icon dashboard-stat__icon--blue">▣</span>
              <div>
                <strong>2</strong>
                <span>Currently borrowed</span>
              </div>
              <small>Keep turning pages</small>
            </article>
            <article className="dashboard-stat">
              <span className="dashboard-stat__icon dashboard-stat__icon--gold">◷</span>
              <div>
                <strong>1</strong>
                <span>Pending request</span>
              </div>
              <small>Your next read is close</small>
            </article>
            <article className="dashboard-stat">
              <span className="dashboard-stat__icon dashboard-stat__icon--green">✓</span>
              <div>
                <strong>9</strong>
                <span>Books returned</span>
              </div>
              <small>A year of good stories</small>
            </article>
          </section>

          <section className="dashboard-notice">
            <span className="dashboard-notice__icon" aria-hidden="true">!</span>
            <p>
              <strong>Coming up:</strong> Jane Eyre is due November 14. Enjoying
              the story? Remember to renew your loan.
            </p>
            <span className="dashboard-notice__arrow" aria-hidden="true">→</span>
          </section>

          <section className="dashboard-reading">
            <div className="dashboard-section-heading">
              <div>
                <p className="dashboard-eyebrow">Currently on loan</p>
                <h2>On your bedside table</h2>
              </div>
              <span className="dashboard-text-link">Your loans <b>→</b></span>
            </div>
            <div className="dashboard-reading__grid">
              <div className="dashboard-borrowed-list">
                {borrowedBooks.map((book) => (
                  <article className="dashboard-borrowed-book" key={book.title}>
                    <BookCover {...book} compact />
                    <div className="dashboard-borrowed-book__details">
                      <h3>{book.title}</h3>
                      <p>{book.author}</p>
                      <span>{book.due}</span>
                      <small>{book.daysLeft}</small>
                    </div>
                    <span className="dashboard-book-arrow" aria-hidden="true">↗</span>
                  </article>
                ))}
              </div>

              <article className="dashboard-goal">
                <p className="dashboard-goal__eyebrow">A little every day</p>
                <div className="dashboard-goal__count">
                  <strong>9</strong><span> / 12 books</span>
                </div>
                <div
                  className="dashboard-goal__track"
                  role="progressbar"
                  aria-label="2026 reading goal"
                  aria-valuemin="0"
                  aria-valuemax="12"
                  aria-valuenow="9"
                >
                  <span />
                </div>
                <p>Three more stories to reach your goal.</p>
                <small>Your 2026 reading goal is 75% complete.</small>
              </article>
            </div>
          </section>

          <section className="dashboard-next">
            <div className="dashboard-next__copy">
              <p className="dashboard-eyebrow">Up next</p>
              <h2>Your next chapter</h2>
              <p>Wuthering Heights</p>
              <span><i /> Preparing your book</span>
            </div>
            <BookCover
              title="Wuthering Heights"
              author="Emily Bronte"
              tone="plum"
              compact
            />
            <span className="dashboard-next__status">Request in progress</span>
          </section>

          <section className="dashboard-recommendations">
            <div className="dashboard-section-heading">
              <div>
                <p className="dashboard-eyebrow">Selected for you</p>
                <h2>Picked for your next chapter</h2>
              </div>
              <span className="dashboard-text-link">Explore books <b>→</b></span>
            </div>
            <div className="dashboard-recommendations__grid">
              {recommendations.map((book) => (
                <article className="dashboard-recommendation" key={book.title}>
                  <BookCover {...book} />
                  <div className="dashboard-recommendation__details">
                    <p>{book.category}</p>
                    <h3>{book.title}</h3>
                    <span>{book.author}</span>
                    <span className="dashboard-recommendation__arrow" aria-hidden="true">↗</span>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </main>
      </div>

      <footer className="dashboard-footer">
        <span>© 2026 Bookie. A good book deserves another chapter.</span>
        <span>Made for readers, wherever their next chapter takes them.</span>
      </footer>
    </div>
  );
}

export default Dashboard;
