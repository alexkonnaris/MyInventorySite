import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import InventoryPage from "./components/InventoryPage";
import AddProduct from "./components/AddProduct";
import ViewProduct from "./components/ViewProduct";
import EditProduct from "./components/EditProduct";

function App() {
  const [products, setProducts] = useState([]);

  const removeFromDom = (id) => {
    setProducts(products.filter((product) => product._id != id));
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            element={
              <InventoryPage
                products={products}
                setProducts={setProducts}
                removeFromDom={removeFromDom}
              />
            }
            path="/"
            default
          />
          <Route
            element={
              <AddProduct products={products} setProducts={setProducts} />
            }
            path="/add/product"
          />
          <Route element={<ViewProduct />} path="/product/:id" />
          <Route element={<EditProduct />} path="/edit/product/:id" />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
