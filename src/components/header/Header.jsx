import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./Header.scss";
import { useDispatch, useSelector } from "react-redux";
import { getAllProduct } from "../../store/productSlice";

function Header({ isOpen, setIsOpen }) {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.product);
  const location = useLocation();
  console.log("idddd", location);
  const navigate = useNavigate();
  const [show, setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [sortingOption, setSortingOption] = useState("");
  const [products, setProducts] = useState([]);
  console.log("shortedproduct", products);

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  });
  const handleSortingOptionChange = (event) => {
    const selectedOption = event.target.value;
    setSortingOption(selectedOption);

    const sortedProducts = [...data];
    if (selectedOption === "low") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (selectedOption === "high") {
      sortedProducts.sort((a, b) => b.price - a.price);
    }
    dispatch(getAllProduct(sortedProducts));
    setProducts(sortedProducts);
  };

  const controlNavbar = () => {
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY) {
        setShow("hide");
      } else {
        setShow("show");
      }
      setLastScrollY(window.scrollY);
    } else {
      setShow("top");
    }
  };

  const handleAddProductClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`container ${show}`}>
      <img
        src="../../../public/logo.png"
        alt="logo"
        onClick={() => navigate("/")}
      />
      <div className="button">
        {location.pathname !== "/" ? (
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => navigate("/")}
          >
            Back
          </button>
        ) : (
          <>
            <select
              name="sortingOption"
              id="sortingOption"
              className="btn btn-primary"
              value={sortingOption}
              onChange={handleSortingOptionChange}
            >
              <option value="default">default</option>
              <option value="low">low</option>
              <option value="high">high</option>
            </select>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleAddProductClick}
            >
              Add Product
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
