import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

const ViewProduct = (props) => {
  const [product, setProduct] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  const deleteProduct = (id) => {
    axios
      .delete("http://localhost:8000/api/products/" + id)
      .then((res) => {
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/products/${id}`)
      .then((res) => {
        console.log(res.data);
        setProduct(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <div className="d-flex justify-content-between bg-dark">
        <h1 className="m-4 text-primary">{product.productName}</h1>
        <Link className="m-4" to="/">
          Back to Home Page
        </Link>
      </div>
      <h2 className="d-flex justify-content-evenly mt-4">Details</h2>
      <div className="d-flex justify-content-evenly mt-2 border border-dark bg-dark text-primary rounded-5">
        <div className="fs-4 m-3">
          <p>Brand: {product.productBrand}</p>
          <p>Price: {product.productPrice}</p>
        </div>
        <div className="fs-4 m-3">
          <p>Size: {product.productSize}</p>
          <p>Qty: {product.productQuantity}</p>
        </div>
      </div>
      <p className="fs-5 mt-4 d-flex justify-content-center">
        {product.productDescription}
      </p>
      <div className="d-flex justify-content-evenly mt-4">
        <p className="btn fs-5">
          <Link to={`/edit/product/${id}`}>Edit Product</Link>
        </p>
        <p className="btn fs-5">
          <Link
            onClick={(e) => {
              deleteProduct(id);
            }}
          >
            Delete Product
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ViewProduct;
