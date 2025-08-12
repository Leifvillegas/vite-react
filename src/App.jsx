// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
// ✅ FIXED PATHS: pages live in ./pages if App.jsx is in /src
import Layout from "../pages/Layout";
import Home from "../pages/Home";
import Blogs from "../pages/Blogs";
import Contact from "../pages/Contact";
import NoPage from "../pages/NoPage";
import Dashboard from "../pages/Dashboard";
import Stats from "../pages/Stats";
import Settings from "../pages/Settings";

// ❌ import ReactDOM from "react-dom/client";  // remove this from App.jsx

function App() {
  return (
    <BrowserRouter> {/* ✅ Added wrapper per tutorial Step 1 */}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="contact" element={<Contact />} />

          {/* Nested dashboard routes */}
          <Route path="dashboard" element={<Dashboard />}>
            <Route path="stats" element={<Stats />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
