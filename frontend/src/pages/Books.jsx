import { useEffect, useState } from "react";
import { Search, BookOpen, SlidersHorizontal } from "lucide-react";
import Navbar from "../components/Navbar";
import api from "../services/api";

export default function Books() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/books/categories").then(({data})=>setCategories(data.categories)).catch(()=>{});
  }, []);

  useEffect(() => {
    let active = true;
    setLoading(true); setError("");
    api.get("/books", { params: { search, category } })
      .then(({data}) => { if (active) setBooks(data.books); })
      .catch((err) => { if (active) setError(err.response?.data?.message || "Could not load books. Check your backend and database."); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [search, category]);

  const colors = ["cover-peach", "cover-lilac", "cover-mint", "cover-yellow", "cover-blue", "cover-pink"];
  return <><Navbar/><main className="app-main">
    <section className="hero-banner"><div><span className="eyebrow">THE BOOKIE BOOKSHELF</span><h1>Find your next<br/><em>favorite chapter.</em></h1><p>Explore stories, discover new ideas, and let your curiosity lead the way.</p></div><div className="hero-emoji">📚<span>✦</span></div></section>
    <section className="library-section">
      <div className="section-heading"><div><span className="section-kicker">CURATED FOR YOU</span><h2>Explore the bookshelf</h2></div><span className="book-count"><BookOpen size={16}/> {books.length} books</span></div>
      <div className="search-toolbar"><div className="search-box"><Search size={19}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search by title, author, or category..."/></div><div className="category-box"><SlidersHorizontal size={17}/><select value={category} onChange={e=>setCategory(e.target.value)}><option>All</option>{categories.map(c=><option key={c}>{c}</option>)}</select></div></div>
      {error && <div className="alert error-alert">{error}</div>}
      {loading ? <div className="empty-state">Loading your bookshelf...</div> : books.length === 0 ? <div className="empty-state"><span>🔎</span><h3>No books found</h3><p>Try another title, author, or category.</p></div> :
        <div className="book-grid">{books.map((book, i)=><article className="book-card" key={book.id}>
          <div className={`book-cover ${colors[i % colors.length]}`}>
            {book.cover_url ? <img src={book.cover_url} alt={`${book.title} cover`} onError={e=>{e.currentTarget.style.display="none";}}/> : null}
            <div className="cover-fallback"><BookOpen size={34}/><span>{book.title}</span></div>
          </div>
          <div className="book-info"><span className="category-tag">{book.category}</span><h3>{book.title}</h3><p>by {book.author}</p><small>{book.published_year || "Year not listed"}</small></div>
        </article>)}</div>}
    </section>
  </main></>;
}
