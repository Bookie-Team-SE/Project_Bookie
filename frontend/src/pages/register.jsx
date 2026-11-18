import { useState } from "react";
import { BookOpen, LockKeyhole, Mail, Sparkles, UserRound } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

export default function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setBusy(true);
    try {
      const { data } = await api.post("/users/register", {
        username: form.username,
        email: form.email,
        password: form.password,
      });
      login(data);
      navigate("/books", { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Could not create your account. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-shell register-shell">
        <aside className="auth-art register-art">
          <div className="art-top">
            <Link to="/register" className="mini-brand"><BookOpen size={22} /> bookie.</Link>
            <span className="art-pill"><Sparkles size={14} /> A WORLD OF STORIES</span>
          </div>
          <div className="art-copy">
            <span className="section-kicker">MAKE YOURSELF AT HOME</span>
            <h1>Your next<br /><em>favorite begins here.</em></h1>
            <p className="art-description">Create your account and start building a bookshelf that feels like yours.</p>
          </div>
          <div className="register-illustration" aria-hidden="true">📚<span>✦</span></div>
          <p className="art-footer">Every reader has a story. Start yours here.</p>
        </aside>

        <div className="auth-panel">
          <Link to="/register" className="mobile-brand"><BookOpen size={22} /> bookie.</Link>
          <div className="auth-content">
            <span className="section-kicker">JOIN THE BOOKIE COMMUNITY</span>
            <h2>Create your <span>account.</span></h2>
            <p className="muted">A cozy corner for discovering your next favorite book.</p>

            {error && <div className="alert error-alert" role="alert">{error}</div>}

            <form className="auth-form" onSubmit={submit}>
              <label htmlFor="register-username">Username</label>
              <div className="input-wrap">
                <UserRound size={18} aria-hidden="true" />
                <input
                  id="register-username"
                  name="username"
                  value={form.username}
                  onChange={(event) => setForm({ ...form, username: event.target.value })}
                  placeholder="Choose a username"
                  autoComplete="username"
                  minLength={2}
                  maxLength={60}
                  required
                />
              </div>

              <label htmlFor="register-email">Email address</label>
              <div className="input-wrap">
                <Mail size={18} aria-hidden="true" />
                <input
                  id="register-email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={(event) => setForm({ ...form, email: event.target.value })}
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                />
              </div>

              <label htmlFor="register-password">Password</label>
              <div className="input-wrap">
                <LockKeyhole size={18} aria-hidden="true" />
                <input
                  id="register-password"
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={(event) => setForm({ ...form, password: event.target.value })}
                  placeholder="At least 8 characters"
                  autoComplete="new-password"
                  minLength={8}
                  required
                />
              </div>

              <label htmlFor="register-confirm-password">Confirm password</label>
              <div className="input-wrap">
                <LockKeyhole size={18} aria-hidden="true" />
                <input
                  id="register-confirm-password"
                  name="confirmPassword"
                  type="password"
                  value={form.confirmPassword}
                  onChange={(event) => setForm({ ...form, confirmPassword: event.target.value })}
                  placeholder="Enter your password again"
                  autoComplete="new-password"
                  minLength={8}
                  required
                />
              </div>

              <button className="primary-button" disabled={busy}>
                {busy ? "Creating account..." : "Create account"} <BookOpen size={17} />
              </button>
            </form>

            <p className="auth-switch">Already have an account? <Link to="/login">Sign in</Link></p>
          </div>
          <p className="panel-foot">Made for people who love a good story.</p>
        </div>
      </section>
    </main>
  );
}
