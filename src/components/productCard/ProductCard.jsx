import React from "react";
import { useNavigate } from "react-router-dom";
import "./ProductCard.scss";
import "bootstrap/dist/css/bootstrap.css";

const ProductCard = ({ product, onDelete }) => {
  const navigate = useNavigate();
  const handleCardClick = () => {
    navigate(`/${product.id}`);
  };

  const text = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.slice(0, maxLength) + "...";
  };

  return (
    <div className="card card-item">
      <div onClick={handleCardClick}>
        <div className="poster">
          <img src={product?.image} alt={product?.title} />
        </div>
        <div className="title">{text(product?.title, 55)}</div>
      </div>
      <div className="content">
        <div className="price">${product?.price}</div>
        <div className="delete-btn">
          <button
            className="btn btn-danger"
            onClick={() => onDelete(product?.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
