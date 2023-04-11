import axios from "axios";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const AddProduct = (props) => {
  const { products, setProducts } = props;

  const [name, setName] = useState("");
  const [brandName, setBrandName] = useState("");
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  const formValidator = () => {
    let isValid = true;
    if (name.length < 3) {
      return false;
    }
    if (brandName.length < 3) {
      return false;
    }
    if (size.length < 1) {
      return false;
    }
    if (quantity < 1) {
      return false;
    }
    if (price < 1) {
      return false;
    }
    if (description.length < 3) {
      return false;
    }
    return isValid;
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (formValidator()) {
      axios
        .post("http://localhost:8000/api/products", {
          productName: name,
          productBrand: brandName,
          productSize: size,
          productQuantity: quantity,
          productPrice: price,
          productDescription: description,
        })
        .then((res) => {
          console.log(res);
          console.log(res.data);
          setName("");
          setBrandName("");
          setSize("");
          setQuantity(0);
          setPrice(0);
          setDescription("");
          setProducts([...products, res.data]);
          navigate("/");
        })
        .catch((err) => console.log(err));
    } else {
      setErrors({
        name: "Product name must be at least 3 characters.",
        brandName: "Brand name must be at least 3 characters.",
        size: "Size must be at least 1 character.",
        quantity: "Quantity must be greater than 0.",
        price: "Price must be greater than 0.",
        description: "Description must be at least 3 characters.",
      });
    }
  };

  return (
    <div>
      <div>
        <h1>Add a New Product</h1>
        <Link to="/">Back to Home Page</Link>
      </div>
      {errors.name ? <p style={{ color: "red" }}>{errors.name}</p> : ""}
      {errors.brandName ? (
        <p style={{ color: "red" }}>{errors.brandName}</p>
      ) : (
        ""
      )}
      {errors.size ? <p style={{ color: "red" }}>{errors.size}</p> : ""}
      {errors.quantity ? <p style={{ color: "red" }}>{errors.quantity}</p> : ""}
      {errors.price ? <p style={{ color: "red" }}>{errors.price}</p> : ""}
      {errors.description ? (
        <p style={{ color: "red" }}>{errors.description}</p>
      ) : (
        ""
      )}
      <form onSubmit={onSubmitHandler}>
        <p>
          <label>Product Name: </label>
          <input type="text" onChange={(e) => setName(e.target.value)} />
        </p>
        <p>
          <label>Brand Name: </label>
          <input type="text" onChange={(e) => setBrandName(e.target.value)} />
        </p>
        <p>
          <label>Size: </label>
          <input type="text" onChange={(e) => setSize(e.target.value)} />
        </p>
        <p>
          <label>Quantity: </label>
          <input type="text" onChange={(e) => setQuantity(e.target.value)} />
        </p>
        <p>
          <label>Price: </label>
          <input type="text" onChange={(e) => setPrice(e.target.value)} />
        </p>
        <p>
          <label>Description: </label>
          <input type="text" onChange={(e) => setDescription(e.target.value)} />
        </p>
        <input type="submit" value="Add Product" />
      </form>
    </div>
  );
};

export default AddProduct;
