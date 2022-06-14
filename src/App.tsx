import React, { useEffect } from "react";
import './App.css';
import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { NavBar } from "./components/NavBar";
import Login from "./pages/auth/Login";
import Books from "./pages/Books";
import Book from "./pages/Book";
import Favorites from "./pages/Favorites";
import AddBook from "./pages/AddBook";
import UpdateBook from "./pages/UpdateBook";

const App = () => (
  <Routes>
    <Route path="/" element={<MainLayout />}>
      <Route path="" element={<Redirector />} caseSensitive />
      <Route path="books" element={<Books />} caseSensitive />
      <Route path="book/:id" element={<Book />} caseSensitive />
      <Route path="add-book" element={<AddBook />} caseSensitive />
      <Route path="update-book/:id" element={<UpdateBook />} caseSensitive />
      <Route path="favorites" element={<Favorites />} caseSensitive />
      
    </Route>

    <Route path="/auth" element={<AdminLayout />}>
      <Route path="login" element={<Login />} caseSensitive />
    </Route>
  </Routes>
);

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const Redirector = () => {
  let location = useLocation();
  
  return <Navigate to="/books" state={{ form: location }} replace />;
};

const MainLayout = () => {
  const isAuth = useSelector<any>((state: any) => state.auth.isAuth);
  const location = useLocation();

  console.log("isAuth : " + isAuth);

  if (!isAuth) {
    return <Navigate to="/auth/login" state={{ form: location }} replace />;
  }

  return(
    <div className="h-full">
      <ScrollToTop />
      <NavBar />
      <Outlet />
    </div>
  )
};

const AdminLayout = () => {
  return (
    <div className="h-full">
      <Outlet />
    </div>
  );
};

export default App;

