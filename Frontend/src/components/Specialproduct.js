import React from "react";
import ReactStars from "react-stars";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addtoWishlist } from "../features/products/productSlice";

export default function Specialproduct(props) {
  const { data } = props;
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const addtowishlist = (prodId) => {
    dispatch(addtoWishlist(prodId));
  };
  return (
    <div className="col-4">
      <div className="special-product-card bg-light d-flex ">
        <div className="special-product-imgdiv p-2 d-flex flex-column align-items-center">
          <img src={data?.images[0]} alt="" />

          <div className="special-product-previewimg d-flex mt-2">
            <img src={data?.images[1]} alt="" />
            <img src={data?.images[2]} alt="" />
          </div>
        </div>
        <div className="special-product-cardbody">
          <p
            onClick={() => {
              navigate(`product/${data?._id}`);
            }}
          >
            <strong>{String(data.title).substring(0, 60)}...</strong>
          </p>
          <p className="p-1">&#8377; {data.price}</p>
          <p className="p-1">Items left: {data.quantity}</p>
          <ReactStars
            count={5}
            edit={false}
            size={24}
            // value={Number(data.totalrating)}
            value={Number(Math.random() * (5 - 3 + 1) + 3)}
            activeColor="#ffd700"
          />

          <button
            onClick={() => {
              navigate(`/product/${data._id}`);
            }}
            className="btn loginbtn"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}
