import "./App.css";
import NavBar from "./component/navbar/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./component/footer/Footer";
import Register from "./component/register/Register";
import PrivateComp from "./component/privatecomp/PrivateComp";
import Login from "./component/login/Login";
import AddProduct from "./component/add-product/AddProduct";
import Product from "./component/product/Product";
import Update from "./component/update/Update";

function App() {
  return (
    <>
      <BrowserRouter>
    <NavBar />
      <Routes>

        <Route element={<PrivateComp />}>
        <Route path="/" element={<Product />} />
        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/update/:id" element={<Update />} />
        <Route path="/profile" element={<h2>This is Profile</h2>} />
        <Route path="/logout"  />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
    <Footer />
    </>
  );
}

export default App;
