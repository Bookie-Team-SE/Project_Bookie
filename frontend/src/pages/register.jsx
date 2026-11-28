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
<<<<<<< HEAD
  const [loading, setLoading] = useState(false);
  const [registered, setRegistered] = useState(false);
=======
  const [busy, setBusy] = useState(false);
>>>>>>> origin/update_backend

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
<<<<<<< HEAD

      setRegistered(true);
=======
      login(data);
      navigate("/books", { replace: true });
>>>>>>> origin/update_backend
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
<<<<<<< HEAD

        {registered ? (
          <div className="register-success" role="status" aria-live="polite">
            <div className="register-success-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="m6 12.5 4 4L18.5 8"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <p className="register-success-eyebrow">Account created</p>
            <h2>Welcome to Bookie, {formData.username.trim()}!</h2>
            <p className="register-success-description">
              Your account is ready. Sign in to explore, borrow, and manage your
              favorite books.
            </p>
            <p className="register-success-email">
              Confirmation for <strong>{formData.email.trim()}</strong>
            </p>
            <button
              type="button"
              className="auth-button register-success-button"
              onClick={() => navigate("/login")}
            >
              Continue to login
            </button>
          </div>
        ) : (
          <>
        {/* TITLE */}
        <h2>Create Account</h2>

        <p className="auth-description">
          Join Bookie and discover your next favorite book.
        </p>

        {/* ERROR */}
        {error && (
          <p className="error">
            {error}
          </p>
        )}

        {/* REGISTER FORM */}
        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              placeholder="Enter username"
              value={formData.username}
              onChange={handleChange}
              autoComplete="username"
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              minLength={8}
              autoComplete="new-password"
              required
            />
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={handleChange}
              minLength={8}
              autoComplete="new-password"
              required
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="auth-button"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Register"}
          </button>

        </form>

        {/* LOGIN */}
        <p className="auth-footer">
          Already have an account?
          <Link to="/login"> Login</Link>
        </p>
          </>
        )}

      </div>

    </div>
=======
      </section>
    </main>
>>>>>>> origin/update_backend
  );
}
