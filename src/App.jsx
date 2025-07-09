import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'  // make sure you import from 'react-router-dom'
import axios from 'axios'

import Nav from './components/Nav'
import Footer from './components/Footer'
import ProductOverview from './pages/ProductDetails'
import Login from './pages/Login'
import Home from './pages/Home'
import Register from './pages/Register'
import Catalog from './pages/Catalog'

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:productId" element={<ProductOverview />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/catalog" element={<Catalog />} />

      </Routes>
      <Footer />
    </>
  )
}

export default App
