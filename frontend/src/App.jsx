import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Login from "./pages/login";
import Register from "./pages/register";
import Books from "./pages/Books";
import Settings from "./pages/Settings";

function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="loading-screen">Opening Bookie...</div>;
  return user ? children : <Navigate to="/login" replace/>;
}

export default function App() {
  const { user } = useAuth();
  return <Routes>
    <Route path="/" element={<Navigate to={user ? "/books" : "/login"} replace/>}/>
    <Route path="/login" element={user ? <Navigate to="/books" replace/> : <Login/>}/>
    <Route path="/register" element={user ? <Navigate to="/books" replace/> : <Register/>}/>
    <Route path="/books" element={<PrivateRoute><Books/></PrivateRoute>}/>
    <Route path="/settings" element={<PrivateRoute><Settings/></PrivateRoute>}/>
    <Route path="*" element={<Navigate to="/" replace/>}/>
  </Routes>;
}
