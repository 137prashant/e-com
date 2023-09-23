import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProduct, setOldData } from "../../store/productSlice";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.css";

const AddProductModal = ({ onClose }) => {
  const { data, oldData } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const [productData, setProductData] = useState({
    title: "",
    description: "",
    price: "",
    image: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleSubmit = () => {
    if (productData.title == "") {
      return toast.error("Title is required!");
    }
    if (productData.description == "") {
      return toast.error("Description is required!");
    }
    if (productData.price == "" || isNaN(productData.price)) {
      return toast.error("Price must be a valid number!!");
    }
    if (productData.image == "") {
      return toast.error("Image is required!");
    }
    const existingProducts = data;
    const newProduct = {
      id: data.length + 1,
      ...productData,
    };
    const updatedProducts = [newProduct, ...existingProducts];
    dispatch(getAllProduct(updatedProducts));
    const oldDataUpdate = [newProduct, ...oldData];
    dispatch(setOldData(oldDataUpdate));
    toast.success("Product Added successfully 👍");
    onClose();
  };

  return (
    <div
      className="modal fade show"
      style={{
        display: "block",
        backdropFilter: "blur(3px)",
        zIndex: "1",
        transition: "all 10s",
      }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add Product</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  name="title"
                  placeholder="Title"
                  value={productData.title}
                  onChange={handleInputChange}
                  autoFocus
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  name="description"
                  placeholder="Description"
                  value={productData.description}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="price" className="form-label">
                  Price
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="price"
                  name="price"
                  placeholder="Price"
                  value={productData.price}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="image" className="form-label">
                  Image URL
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="image"
                  name="image"
                  placeholder="Image URL"
                  value={productData.image}
                  onChange={handleInputChange}
                />
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProductModal;
