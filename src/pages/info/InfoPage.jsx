import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Info.scss";
// import "bootstrap/dist/css/bootstrap.css";


function Info() {
  const { id } = useParams();
  const { data } = useSelector((state) => state.product);

  const product = data?.find((p) => p.id === parseInt(id));

  return (
    <div className="detail">
      {product ? (
        <div className="product-details">
          <div className="image">
            <img src={product.image} alt={product.title} />
          </div>
          <div className="content">
            <div className="title">{product.title}</div>
            <div className="price">${product.price}</div>
            <div className="description">{product.description}</div>
          </div>
        </div>
      ) : (
        <div className="alert alert-danger">Product not found.</div>
      )}
    </div>
  );
}

export default Info;
