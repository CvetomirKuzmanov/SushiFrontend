// src/components/Product.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Product({ product_id, name, price, image }) {
  return (
    <Link to={`/products/${product_id}`} className="group ">
      <div className="relative overflow-hidden rounded-lg mb-4">
        <img
          src={image}
          alt={name}
          className="w-full h-80 object-cover object-top"
        />
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <button className="bg-white text-gray-900 w-10 h-10 rounded-full flex items-center justify-center shadow-md mx-1 hover:bg-gray-100 transition">
            <i className="ri-eye-line"></i>
          </button>
          <button className="bg-white text-gray-900 w-10 h-10 rounded-full flex items-center justify-center shadow-md mx-1 hover:bg-gray-100 transition">
            <i className="ri-heart-line"></i>
          </button>
          <button className="bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center shadow-md mx-1 hover:bg-primary/90 transition">
            <i className="ri-shopping-bag-line"></i>
          </button>
        </div>
      </div>
      <div>
        <h3 className="font-medium text-gray-900 mb-1">{name}</h3>
        <p className="text-gray-900 font-medium">${price.toFixed(2)}</p>
      </div>
    </Link>
  );
}
