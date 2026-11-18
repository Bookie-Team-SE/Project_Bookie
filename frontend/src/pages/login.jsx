import { useState } from "react";
import { BookOpen, LockKeyhole, Mail, Sparkles } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setError("");
    setBusy(true);

    try {
      const { data } = await api.post("/users/login", form);
      login(data);
      navigate("/books", { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Could not log in. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-shell">
        <aside className="auth-art">
          <div className="art-top">
            <Link to="/login" className="mini-brand"><BookOpen size={22} /> bookie.</Link>
            <span className="art-pill"><Sparkles size={14} /> YOUR NEXT CHAPTER</span>
          </div>
          <div className="art-copy">
            <span className="eyebrow">WELCOME TO BOOKIE</span>
            <h1>Stories that<br /><em>stay with you.</em></h1>
            <p className="art-description">A little space for big ideas, new worlds, and the books you love.</p>
          </div>
          <div className="book-stack" aria-hidden="true">
            <span className="sparkle sparkle-one">✦</span>
            <span className="book book-one">Read<br />more</span>
            <span className="book book-two">Find<br />wonder</span>
            <span className="book book-three">Your<br />story</span>
            <span className="sparkle sparkle-two">✦</span>
          </div>
          <p className="art-footer">A good book makes room for possibility.</p>
        </aside>

        <div className="auth-panel">
          <Link to="/login" className="mobile-brand"><BookOpen size={22} /> bookie.</Link>
          <div className="auth-content">
            <span className="section-kicker">YOUR BOOKSHELF IS WAITING</span>
            <h2>Welcome <span>back.</span></h2>
            <p className="muted">Sign in to pick up where your next great read begins.</p>

            {error && <div className="alert error-alert" role="alert">{error}</div>}

            <form className="auth-form" onSubmit={submit}>
              <label htmlFor="login-email">Email address</label>
              <div className="input-wrap">
                <Mail size={18} aria-hidden="true" />
                <input
                  id="login-email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={(event) => setForm({ ...form, email: event.target.value })}
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                />
              </div>

              <label htmlFor="login-password">Password</label>
              <div className="input-wrap">
                <LockKeyhole size={18} aria-hidden="true" />
                <input
                  id="login-password"
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={(event) => setForm({ ...form, password: event.target.value })}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                />
              </div>

              <button className="primary-button" disabled={busy}>
                {busy ? "Signing in..." : "Sign in"} <BookOpen size={17} />
              </button>
            </form>

            <p className="auth-switch">New to Bookie? <Link to="/register">Create an account</Link></p>
          </div>
          <p className="panel-foot">Made for people who love a good story.</p>
        </div>
      </section>
    </main>
  );
}
