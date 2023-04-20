import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import bootstrap from "bootstrap";

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
      <div className="bg-dark pt-1 pb-2">
        <h1 className="mt-4 d-flex justify-content-center text-primary">
          My Warehouse
        </h1>
        <p className="mt-3 d-flex justify-content-center text-light">
          The warehouse currently has {products.length} items.
        </p>
      </div>
      <table className="table bg-dark text-light w-100 mt-5 rounded-3 table-bordered">
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
      <Link
        className="mt-3 d-flex justify-content-center fs-5"
        to="/add/product"
      >
        Add a new item
      </Link>
    </div>
  );
};

export default InventoryPage;
