import React, { useEffect } from "react";
import Breadcrums from "./../components/Breadcrums";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { getUserOrder } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";
import Color from "./../components/Color";

function Orders() {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const orders = useSelector((state) => state.auth.orderedlist);

  useEffect(() => {
    dispatch(getUserOrder());
  }, []);
  return (
    <>
      <Helmet title="Feveri's Corner|Orders" />
      <Breadcrums title="Orders" />
      <div className="container py-4">
        {orders ? (
          orders?.map((item, index) => {
            return (
              <div className="row" key={index}>
                {item.orderitems.map((i) => {
                  return (
                    <div className="d-flex border col-12 my-2 rounded-3 align-items-center">
                      <div className="order-img p-2 d-flex col-3 justify-content-center">
                        <img
                          onClick={() => {
                            Navigate(`/product/${i?.product?._id}`);
                          }}
                          src={i?.product?.images[0]}
                          alt=""
                        />
                      </div>
                      <div className="order-body col-6">
                        <p
                          onClick={() => {
                            Navigate(`/product/${i?.product?._id}`);
                          }}
                        >
                          {i?.product?.title}
                        </p>
                        <p>Quantity: {i?.quantity}</p>

                        <div
                          style={{
                            background: i?.color?.title,
                            width: "2rem",
                            height: "2rem",
                            borderRadius: "100%",
                          }}
                        ></div>
                      </div>
                      <div className="order-body col-1">
                        <p>&#8377; {i?.quantity * i?.price}</p>
                      </div>
                      <div className="order-body col-2">
                        <p>{item?.orderStatus}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })
        ) : (
          <div
            className="d-flex align-items-center justify-content-center"
            style={{ minHeight: "20vh", color: "#7f8d9ea1" }}
          >
            <h3>Nothing in Orders</h3>
          </div>
        )}
      </div>
    </>
  );
}

export default Orders;
