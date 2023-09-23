import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/header/Header";
import Home from "./pages/home/HomePage";
import Info from "./pages/info/InfoPage";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllProduct } from "./store/productSlice";
import AddProductModal from "./components/popup/AddProductModal";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => {
        dispatch(getAllProduct(data));
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <BrowserRouter>
      <ToastContainer />
        <Header setIsOpen={setIsModalOpen} isOpen={isModalOpen} />
        {isModalOpen && <AddProductModal onClose={handleCloseModal} />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:id" element={<Info />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
