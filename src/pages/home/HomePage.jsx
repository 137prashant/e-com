import React from "react";
import ProductCard from "../../components/productCard/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllProduct } from "../../store/productSlice";
import "./HomePage.scss";
import { toast } from "react-toastify";

// import "bootstrap/dist/css/bootstrap.css";


function Home() {
  const { data } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const handleDeleteProduct = (productId) => {
    const updatedProducts = data?.filter((product) => product.id !== productId);
    dispatch(getAllProduct(updatedProducts));
    toast.success("Product Deleted successfully");

  };

  return (
    <div className="product">
      <div className="product-list">
      {data?.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onDelete={handleDeleteProduct}
        />
      ))}
      </div>
    </div>
  );
}

export default Home;
