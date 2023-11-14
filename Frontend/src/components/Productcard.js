import React from "react";
import ReactStars from "react-stars";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addtoWishlist } from "../features/products/productSlice";
import { AiOutlineHeart } from "react-icons/ai";
export default function Productcard(props) {
  let location = useLocation();
  const { grid, item } = props;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const addtowishlist = (prodId) => {
    // alert(prodid);
    dispatch(addtoWishlist(prodId));
  };
  return (
    <>
      <div
        className={`${
          location.pathname === "/store"
            ? `col-${grid} product-card`
            : "col-3 product-card"
        }`}
      >
        <div className="card  bg-white p-3">
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
          <div className="d-flex align-items-center justify-content-center">
            <img src={item?.images[0]} className="card-img-top" alt="product" />
          </div>
          <div
            className="card-body p-3"
            onClick={() => {
              navigate(`/product/${item?._id}`);
            }}
          >
            <p className="card-text">
              <strong>{String(item?.title).substring(0, 60)}</strong>
            </p>
            <ReactStars
              count={5}
              edit={false}
              size={24}
              // value={Number(item?.totalrating)}
              value={Number(Math.random() * (4.5 - 3 + 1) + 3)}
              activeColor="#ffd700"
            />
            {grid === 12 ? (
              <p
                dangerouslySetInnerHTML={{
                  __html: `${String(item?.description).substring(0, 150)}...`,
                }}
              ></p>
            ) : (
              ""
            )}

            <h5>&#8377; {item?.price}</h5>
          </div>
        </div>
      </div>
    </>
  );
}
