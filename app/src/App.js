import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";

import "bootswatch/dist/lux/bootstrap.min.css";
import Navbar from "./components/navbar";
import Register from "./components/register";
import Home from "./components/home";
import Sidebar from "./components/sidebar";
import Categories from "./components/categories";
import Users from "./components/users";
import CategoryForm from "./components/categoryForm";
import Category from "./components/category";
import AdminForm from "./components/adminForm";
import User from "./components/user";
import Products from "./components/products";
import ProductForm from "./components/productForm";
import TagForm from "./components/tagForm";
import Tags from "./components/tags";
import Tag from "./components/tag";
import ProductsList from "./components/productsList";
import Login from "./components/login";
import Cart from "./components/cart";
import Product from "./components/product";


import { AuthProvider } from "./context/auth";
import PrivateRoute from "./components/privateRoute";
import AdminRoute from "./components/adminRoute";




const App = () => {
  return (
    <>
    {/* <AuthProvider> */}
    <Router>
      <Navbar />
      <Routes>
      <Route path="/" element={<Navigate to ="/home" />}/>
      <Route exact path="/home" element={<Home />} />
      </Routes>
      <div className="container-sidebar">
        <Sidebar />
      <div className="container-content">
        <Routes>
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        
          <Route exact path="/users" element={<AdminRoute> <Users /> </AdminRoute>} />
          
          <Route exact path="/categories" element={ <AdminRoute> <Categories /> </AdminRoute>}/>
          <Route exact path="/categoryform" element={<AdminRoute> <CategoryForm /> </AdminRoute>} />
          <Route exact path="/category/:categoryId" element={<AdminRoute> <Category /> </AdminRoute>} />
          <Route exact path="/adminform" element={<AdminRoute> <AdminForm /> </AdminRoute>} />
          <Route exact path="/user/:userId" element={<AdminRoute> <User /> </AdminRoute>} />
          <Route exact path="/products" element={<AdminRoute> <Products /> </AdminRoute>} />
          <Route exact path="/productform" element={<AdminRoute> <ProductForm /> </AdminRoute>} />
          <Route exact path="/tagform" element={<AdminRoute> <TagForm /> </AdminRoute>} />
          <Route exact path="/tags" element={<AdminRoute> <Tags /> </AdminRoute>} />
          <Route exact path="/tag/:tagId" element={<AdminRoute> <Tag /> </AdminRoute>} />
          <Route exact path="/product/:productId" element={<AdminRoute> <Product /> </AdminRoute>} />

          <Route exact path="/productslist" element={<ProductsList />} />
          <Route exact path="/cart" element={<PrivateRoute> <Cart/> </PrivateRoute>} />

        </Routes>
      </div>
      </div>

    </Router>
    {/* </AuthProvider> */}
    </>
  );
};

export default App;
