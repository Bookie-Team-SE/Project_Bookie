import { useState } from "react";
import { UserRound, Mail, Lock, Save, ShieldCheck } from "lucide-react";
import Navbar from "../components/Navbar";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function Settings() {
  const { user, updateUser } = useAuth();
  const [form, setForm] = useState({ username: user?.username || "", email: user?.email || "", currentPassword: "", newPassword: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const change = e => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async e => {
    e.preventDefault(); setMessage(""); setError(""); setBusy(true);
    try {
      const { data } = await api.put("/settings", form);
      updateUser(data.user);
      setForm({ ...form, currentPassword: "", newPassword: "" });
      setMessage(data.message);
    } catch (err) {
      setError(err.response?.data?.message || "Could not save settings.");
    } finally { setBusy(false); }
  };

  return <><Navbar/><main className="app-main settings-main">
    <div className="settings-heading"><span className="section-kicker">YOUR SPACE</span><h1>Account <em>settings.</em></h1><p>Keep your Bookie profile up to date.</p></div>
    <section className="settings-card"><div className="settings-card-title"><div className="settings-icon"><UserRound/></div><div><h2>Personal information</h2><p>Update the details connected to your account.</p></div></div>
      {message && <div className="alert success-alert">{message}</div>}{error && <div className="alert error-alert">{error}</div>}
      <form className="settings-form" onSubmit={submit}>
        <label>Username</label><div className="input-wrap"><UserRound size={18}/><input name="username" value={form.username} onChange={change} minLength="2" maxLength="60" required/></div>
        <label>Email address</label><div className="input-wrap"><Mail size={18}/><input name="email" type="email" value={form.email} onChange={change} required/></div>
        <div className="settings-divider"></div><div className="settings-card-title compact"><div className="settings-icon pale"><ShieldCheck/></div><div><h2>Change password</h2><p>Leave these fields blank if you do not want to change it.</p></div></div>
        <label>Current password</label><div className="input-wrap"><Lock size={18}/><input name="currentPassword" type="password" value={form.currentPassword} onChange={change} placeholder="Required to set a new password"/></div>
        <label>New password</label><div className="input-wrap"><Lock size={18}/><input name="newPassword" type="password" value={form.newPassword} onChange={change} minLength="8" placeholder="At least 8 characters"/></div>
        <button className="primary-button save-button" disabled={busy}>{busy ? "Saving..." : "Save changes"} <Save size={17}/></button>
      </form>
    </section>
  </main></>;
}
