import React, { useEffect, useState } from "react";
import Product from "./Product";

export default function BestSellers() {
  const [sushis, setSushis] = useState([]);

  useEffect(() => {
    fetch("/src/products.json")  
      .then((res) => res.json())
      .then((data) => setSushis(data.slice(0, 3)))  // get only first 3 products
      .catch((err) => console.error("Failed to load products:", err));
  }, []);

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Our Best Sellers</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sushis.map((product) => (
            <Product key={product.product_id || product.id} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
}
