import { BookOpen, Search, Settings, LogOut, Sparkles } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const signOut = () => { logout(); navigate("/login"); };
  return (
    <header className="topbar">
      <NavLink to="/books" className="brand"><span className="brand-mark"><BookOpen size={22}/></span><span>bookie<span className="brand-dot">.</span></span></NavLink>
      <nav className="nav-links">
        <NavLink to="/books"><Search size={17}/> Discover books</NavLink>
        <NavLink to="/settings"><Settings size={17}/> Settings</NavLink>
      </nav>
      <div className="nav-user"><span className="avatar">{user?.username?.charAt(0)?.toUpperCase() || "B"}</span><span className="nav-username">{user?.username}</span><button className="icon-button" onClick={signOut} title="Log out"><LogOut size={18}/></button></div>
    </header>
  );
}
