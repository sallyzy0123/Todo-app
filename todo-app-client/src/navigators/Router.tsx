import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";

function Router() {

  return (
    <Routes>
      <Route path="/home" element={<Home />} />
        <Route path="/" index element={<Login />} />
        <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default Router;
