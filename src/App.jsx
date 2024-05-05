import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Front, AppBar, ProductDetail, AddToCartPage, Login, Signup,SellerLogin,SellerSignup,SellersDashboard } from './components/ManagePages';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>

      <AppBar></AppBar>
      <Routes>
        <Route path="/" element={<Front></Front>} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/addToCart/" element={<AddToCartPage />} />
        <Route path="/Customer/Login" element={<Login />}></Route>
        <Route path="/Customer/Signup" element={<Signup />}></Route>
        <Route path="/Seller/Login" element={<SellerLogin></SellerLogin>} ></Route>
        <Route path="/Seller/Signup" element={<SellerSignup></SellerSignup>} ></Route>
        <Route path="/Seller/Dashboard" element={<SellersDashboard></SellersDashboard>}></Route>
      </Routes>
    </Router>
  )
}

export default App
