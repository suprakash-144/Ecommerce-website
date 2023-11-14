import React from "react";
import Meta from "../components/Meta";
import Breadcrums from "../components/Breadcrums";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserProductWishlist } from "../features/user/userSlice";
import { addtoWishlist } from "../features/products/productSlice";
import { useNavigate } from "react-router-dom";

function Wishlist() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const getwishlistfromdb = () => {
    dispatch(getUserProductWishlist());
  };
  const removewishlist = (id) => {
    dispatch(addtoWishlist(id));
    setTimeout(() => {
      dispatch(getUserProductWishlist());
    }, 300);
  };
  const wishliststate = useSelector((state) => state?.auth?.wishlist?.wishlist);
  useEffect(() => {
    getwishlistfromdb();
  }, []);

  return (
    <div>
      <Meta title="Feveri's Corner| Wishlist" />
      <Breadcrums title="Wishlist" />
      <div className="wishlist-wrapper container py-5">
        <div className="row flex-wrap">
          {wishliststate?.length !== 0 ? (
            wishliststate?.map((item, index) => {
              return (
                <div className="col-4 mb-2" key={index}>
                  <div className="card p-3">
                    <div className="wihlist-card bg-white ">
                      <img
                        src="images/cross.svg"
                        alt=""
                        className="wishlist-cross"
                        onClick={() => {
                          removewishlist(item?._id);
                        }}
                      />
                      <div className="wishlist-card-img d-flex align-items-center justify-content-center">
                        <img
                          onClick={() => {
                            navigate(`/product/${item?._id}`);
                          }}
                          src={item?.images[0]}
                          alt=""
                        />
                      </div>

                      <div className="wishlist-details p-4 card-body">
                        <h5
                          className="title"
                          onClick={() => {
                            navigate(`/product/${item?._id}`);
                          }}
                        >
                          {item?.title}{" "}
                        </h5>
                        <h6 className="price">Price : {item?.price}</h6>
                        <h6 className="price">Category : {item?.category}</h6>
                        <h6 className="price">Brand: {item?.brand}</h6>

                        <h6 className="price">
                          Description :{" "}
                          <span
                            dangerouslySetInnerHTML={{
                              __html: item?.description,
                            }}
                          ></span>
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div
              className="d-flex align-items-center justify-content-center"
              style={{ minHeight: "20vh", color: "#7f8d9ea1" }}
            >
              <h3>Nothing in Wishlist</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Wishlist;
