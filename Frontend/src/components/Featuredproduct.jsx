import React from "react";
import ReactStars from "react-stars";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addtoWishlist } from "../features/products/productSlice";
import { AiOutlineHeart } from "react-icons/ai";

export default function Featuredproduct(props) {
  const { item } = props;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const addtowishlist = (prodId) => {
    // alert(prodid);
    dispatch(addtoWishlist(prodId));
  };
  return (
    <>
      <div className="col-3">
        <div className="card  p-3 featured-card">
          <div className="wishlist-icon">
            <button
              className="btn"
              onClick={(e) => {
                addtowishlist(item?._id);
              }}
            >
              <AiOutlineHeart className="wishlist" />
            </button>
          </div>
          <div className="d-flex bg-white p-4 align-items-center justify-content-center img-container">
            <img src={item?.images[0]} className="card-img-top" alt="product" />
          </div>
          <div
            className="card-body pt-5 p-3"
            onClick={() => {
              navigate(`/product/${item?._id}`);
            }}
          >
            <p className="card-text">
              <strong>{String(item?.title).substring(0, 60)}</strong>
            </p>
            <p className="featured-price">₹ {item?.price}</p>
          </div>
        </div>
      </div>
    </>
  );
}
