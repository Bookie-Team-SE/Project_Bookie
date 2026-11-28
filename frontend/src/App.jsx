import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Login from "./pages/login";
<<<<<<< HEAD
import Dashboard from "./dashboard/dashboard";
import Discover from "./discover/discover";
import BookDetail from "./bookdetail/bookdetail";
import Checkout from "./checkout/checkout";

function isAuthenticated() {
  return Boolean(
    localStorage.getItem("bookieToken") ||
    sessionStorage.getItem("bookieToken")
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Navigate
              to={isAuthenticated() ? "/dashboard" : "/login"}
              replace
            />
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            isAuthenticated() ? <Dashboard /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/discover"
          element={
            isAuthenticated() ? <Discover /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/book/:id"
          element={
            isAuthenticated() ? <BookDetail /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/checkout"
          element={
            isAuthenticated() ? <Checkout /> : <Navigate to="/login" replace />
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
=======
import Register from "./pages/register";
import Books from "./pages/Books";
import Settings from "./pages/Settings";

function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="loading-screen">Opening Bookie...</div>;
  return user ? children : <Navigate to="/login" replace/>;
>>>>>>> origin/update_backend
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
