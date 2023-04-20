import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

const EditProduct = (props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({
    errorName: "",
    errorBrandName: "",
    errorSize: "",
    errorQuantity: "",
    errorPrice: "",
    errorDescription: "",
  });

  const [name, setName] = useState("");
  const [brandName, setBrandName] = useState("");
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");

  const formValidator = () => {
    let isValid = true;
    let temp = { ...errors };
    if (name.length < 3) {
      temp.errorName = "Product name must be at least 3 characters.";
      isValid = false;
    } else temp.errorName = "";
    if (brandName.length < 3) {
      temp.errorBrandName = "Brand name must be at least 3 characters.";
      isValid = false;
    } else temp.errorBrandName = "";
    if (size.length < 1) {
      temp.errorSize = "Size must be at least 1 character.";
      isValid = false;
    } else temp.errorSize = "";
    if (quantity < 1) {
      temp.errorQuantity = "Quantity must be greater than 0.";
      isValid = false;
    } else temp.errorQuantity = "";
    if (price < 1) {
      temp.errorPrice = "Price must be greater than 0.";
      isValid = false;
    } else temp.errorPrice = "";
    if (description.length < 3) {
      (temp.errorDescription = "Description must be at least 3 characters."),
        (isValid = false);
    } else temp.errorDescription = "";
    setErrors(temp);
    return isValid;
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/products/${id}`)
      .then((res) => {
        setName(res.data.productName);
        setBrandName(res.data.productBrand);
        setSize(res.data.productSize);
        setQuantity(res.data.productQuantity);
        setPrice(res.data.productPrice);
        setDescription(res.data.productDescription);
      })
      .catch((err) => console.log(err));
  }, []);

  const update = (e) => {
    e.preventDefault();
    // setErrors({});
    if (formValidator()) {
      axios
        .put(`http://localhost:8000/api/products/${id}`, {
          productName: name,
          productBrand: brandName,
          productSize: size,
          productQuantity: quantity,
          productPrice: price,
          productDescription: description,
        })
        .then((res) => {
          console.log(res);
          navigate(`/product/${id}`);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div>
      <div>
        <div className="d-flex justify-content-between bg-dark">
          <h1 className="m-4 text-primary">
            Edit <span>{name}</span>
          </h1>
          <Link className="m-4" to="/">
            Back to Home Page
          </Link>
        </div>
        {errors.errorName ? (
          <p style={{ color: "red" }}>{errors.errorName}</p>
        ) : (
          ""
        )}
        {errors.errorBrandName ? (
          <p style={{ color: "red" }}>{errors.errorBrandName}</p>
        ) : (
          ""
        )}
        {errors.errorSize ? (
          <p style={{ color: "red" }}>{errors.errorSize}</p>
        ) : (
          ""
        )}
        {errors.errorQuantity ? (
          <p style={{ color: "red" }}>{errors.errorQuantity}</p>
        ) : (
          ""
        )}
        {errors.errorPrice ? (
          <p style={{ color: "red" }}>{errors.errorPrice}</p>
        ) : (
          ""
        )}
        {errors.errorDescription ? (
          <p style={{ color: "red" }}>{errors.errorDescription}</p>
        ) : (
          ""
        )}
        <form onSubmit={update} className="form col-md-4 mx-auto">
          <p className="form-group mt-3">
            <label className="form-label">Product Name: </label>
            <input
              className="form-control"
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </p>
          <p className="form-group mt-3">
            <label className="form-label">Brand Name: </label>
            <input
              className="form-control"
              type="text"
              name="brandName"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
            />
          </p>
          <p className="form-group mt-3">
            <label className="form-label">Size: </label>
            <input
              className="form-control"
              type="text"
              name="size"
              value={size}
              onChange={(e) => setSize(e.target.value)}
            />
          </p>
          <p className="form-group mt-3">
            <label className="form-label">Quantity: </label>
            <input
              className="form-control"
              type="text"
              name="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </p>
          <p className="form-group mt-3">
            <label className="form-label">Price: </label>
            <input
              className="form-control"
              type="text"
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </p>
          <p className="form-group mt-3">
            <label className="form-label">Description: </label>
            <input
              className="form-control"
              type="text"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </p>
          <input
            type="submit"
            value="Edit Product"
            className="btn btn-primary"
          />
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
