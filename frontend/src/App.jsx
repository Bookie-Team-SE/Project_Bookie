
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/register";
import Login from "./pages/login";
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
}

export default App;
