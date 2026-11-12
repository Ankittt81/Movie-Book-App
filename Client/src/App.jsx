import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import SingleMovie from "./Pages/SingleMovie";
import BookShow from "./Pages/BookShow";
import User from "./Pages/User";
import Partner from "./Pages/Partner";
import Admin from "./Pages/Admin";

const protectedPage = (page, roles) => (
  <ProtectedRoute roles={roles}>{page}</ProtectedRoute>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={protectedPage(<Home />)} />
        <Route path="/movie/:id" element={protectedPage(<SingleMovie />)} />
        <Route path="/book-show/:id" element={protectedPage(<BookShow />)} />
        <Route path="/profile" element={protectedPage(<User />)} />
        <Route path="/partner" element={protectedPage(<Partner />, ["PARTNER"])} />
        <Route path="/admin" element={protectedPage(<Admin />, ["ADMIN"])} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;