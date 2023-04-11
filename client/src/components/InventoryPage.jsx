import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const InventoryPage = (props) => {
  const { products, setProducts } = props;

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/products")
      .then((res) => {
        console.log(res.data);
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <h1>My Warehouse</h1>
      <p>The warehouse currently has {products.length} items.</p>
      <table>
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Brand</th>
            <th>Size</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, i) => {
            return (
              <tr key={i}>
                <td>
                  <Link to={`/product/${product._id}`}>
                    {product.productName}
                  </Link>
                </td>
                <td>{product.productBrand}</td>
                <td>{product.productSize}</td>
                <td>{product.productQuantity}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Link to="/add/product">Add a new item</Link>
    </div>
  );
};

export default InventoryPage;
