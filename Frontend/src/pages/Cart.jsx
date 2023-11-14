import React, { useEffect } from "react";
import Meta from "../components/Meta";
import Breadcrums from "../components/Breadcrums";
import { AiFillDelete } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserCart,
  removeCartProduct,
  updateCartProduct,
} from "../features/user/userSlice";
import { useState } from "react";
export default function Cart() {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const [totalprice, settotalprice] = useState(null);
  const cartstate = useSelector((state) => state.auth.cartproducts);
  const deleteproductcart = (id) => {
    dispatch(removeCartProduct(id));
    setTimeout(() => {
      dispatch(getUserCart());
    }, 100);
  };
  const updateproductcart = (id, quantity) => {
    dispatch(updateCartProduct({ id: id, newQuantity: quantity }));
    setTimeout(() => {
      dispatch(getUserCart());
    }, 50);
  };
  useEffect(() => {
    dispatch(getUserCart());
  }, [dispatch]);
  useEffect(() => {
    let sum = 0;
    cartstate?.forEach((element) => {
      sum = sum + element?.quantity * element?.price;
    });
    settotalprice(sum);
  }, [settotalprice, cartstate]);
  return (
    <div>
      <Meta title="Feveri's Corner|Cart" />
      <Breadcrums title="Cart" />
      <section className="cart-wrapper home-wrapper-2 py-5">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="cart-header text-center py-3 d-flex align-items-center justify-content-between">
                <h4 className="cart-item-col-1 col-4">Product</h4>
                <h4 className="cart-item-col-2 col-2">Price</h4>
                <h4 className="cart-item-col-3 col-3">Quantity</h4>
                <h4 className="cart-item-col-4 col-3">Total</h4>
              </div>
              <div className=" py-3">
                {cartstate?.length !== 0 ? (
                  cartstate?.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className="cart-data  py-3 d-flex align-items-center justify-content-between"
                      >
                        <div className="cart-item col-4 d-flex">
                          <div className="">
                            <img
                              className="image-fluid"
                              src={item?.productId?.images[0]}
                              alt=""
                            />
                          </div>
                          <div className="p-2 mx-2 ">
                            <h5>
                              {String(item?.productId?.title).substring(0, 40)}
                            </h5>
                            <div
                              style={{
                                background: item?.color.title,
                                width: "1.4rem",
                                height: "1.4rem",
                                borderRadius: "100%",
                              }}
                            ></div>
                          </div>
                        </div>
                        <div className="cart-item- col-2">
                          <div>&#8377; {item?.price}</div>
                        </div>
                        <div className="cart-item- col-3 d-flex align-items-center justify-content-center">
                          <input
                            value={item?.quantity}
                            className="form-control h-25 w-25"
                            type="number"
                            name="quantity"
                            onChange={(e) => {
                              updateproductcart(item?._id, e.target.value);
                            }}
                          />

                          <AiFillDelete
                            className="fs-4 m-1"
                            onClick={() => {
                              deleteproductcart(item?._id);
                            }}
                          />
                        </div>
                        <div className="cart-item- text-center col-3 ">
                          <p>&#8377; {item?.quantity * item?.price}</p>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div
                    className="d-flex align-items-center justify-content-center"
                    style={{ minHeight: "20vh", color: "#7f8d9ea1" }}
                  >
                    <h3>Nothing in Cart</h3>
                  </div>
                )}
              </div>

              <div className="cart-checkout py-2 mt-4 col-12">
                <div className="d-flex justify-content-between align-items-baseline">
                  <Link className="loginbtn w-25 btn" to="/">
                    Continue shoping
                  </Link>
                  <div className="d-flex flex-column align-items-end">
                    <h4>Sub Total:&#8377; {totalprice}</h4>
                    <p>Taxes and shipping calculated at checkout</p>
                    {cartstate.length !== 0 && (
                      <button
                        onClick={() => {
                          Navigate("/checkout");
                        }}
                        className="signupbtn w-50 my-2"
                      >
                        Checkout
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
