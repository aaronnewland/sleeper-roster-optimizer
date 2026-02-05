import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "@/pages/Home";
import User from "@/pages/User";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/:username" element={<User />} />
      </Routes>
    </BrowserRouter>
  );
}
