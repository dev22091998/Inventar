import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import QrPage from "./pages/QrPage";
import SinglePage from "./pages/SinglePage";
import ProtectedRoute from "./components/ProtectedRoute";



function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          
          <Route path="/admin" element={
            // <ProtectedRoute>
              <Admin />
            // </ProtectedRoute>
            } />
          <Route path="/qr/:id" element={<QrPage />} />
        <Route path="/singlePage/:id" element={<SinglePage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
