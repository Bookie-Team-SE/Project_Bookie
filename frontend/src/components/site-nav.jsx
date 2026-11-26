import { Link } from "react-router-dom";
import "./site-nav.css";

function getSavedUserName() {
  const savedUser =
    localStorage.getItem("bookieUser") ||
    sessionStorage.getItem("bookieUser");

  if (!savedUser) {
    return "Reader";
  }

  try {
    return JSON.parse(savedUser)?.username || "Reader";
  } catch (error) {
    console.error("Could not read the saved user profile:", error);
    return "Reader";
  }
}

function SiteNav({ activePage, userName = getSavedUserName() }) {
  return (
    <header className="site-nav">
      <Link className="site-nav__brand" to="/dashboard">
        bookie<span>.</span>
      </Link>
      <nav className="site-nav__links" aria-label="Main navigation">
        <Link
          className={`site-nav__link${activePage === "discover" ? " is-active" : ""}`}
          to="/discover"
          aria-current={activePage === "discover" ? "page" : undefined}
        >
          Discover
        </Link>
        <Link
          className={`site-nav__link${activePage === "library" ? " is-active" : ""}`}
          to="/dashboard"
          aria-current={activePage === "library" ? "page" : undefined}
        >
          My library
        </Link>
      </nav>
      <div className="site-nav__profile">
        <div className="site-nav__avatar" aria-hidden="true">
          {userName.slice(0, 2).toUpperCase()}
        </div>
        <span>{userName}</span>
      </div>
    </header>
  );
}

export default SiteNav;
