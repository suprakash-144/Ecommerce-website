import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { useFormik } from "formik";
import { object, string, number } from "yup";
import State from "../utilis/states";
import { createUserOrder, getUserCart } from "../features/user/userSlice";
import axios from "axios";
import { base_Url, config } from "./../utilis/axiosconfig";
import Meta from "../components/Meta";

let CheckoutSchema = object({
  firstname: string().required("Enter your First name"),
  lastname: string().required("Enter your Last name"),
  address: string().required("Enter your Address"),
  city: string().required("Enter your City"),
  state: string().required("Please select your State"),
  other: string().required("please enter the details"),
  pincode: number().required("Enter your pincode"),
});
export default function Checkout() {
  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      address: "",
      city: "",
      state: "",
      other: "",
      pincode: 0,
    },
    validationSchema: CheckoutSchema,
    onSubmit: (values) => {
      setshippinginfo(values);
      checkoutHandler();
    },
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [totalprice, settotalprice] = useState(0);
  const [shippinginfo, setshippinginfo] = useState();
  const [paymentinfo, setpaymentinfo] = useState();
  const [orderitems, setorderitems] = useState();
  const cartState = useSelector((state) => state.auth.cartproducts);
  useEffect(() => {
    let sum = 0;
    let items = [];
    cartState?.forEach((element) => {
      sum = sum + element?.quantity * element?.price;
      items.push({
        product: element.productId._id,
        quantity: element?.quantity,
        color: element?.color?._id,
        price: element?.price,
      });
    });
    setorderitems(items);
    settotalprice(sum);
  }, []);
  useEffect(() => {
    dispatch(getUserCart());
  }, []);
  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };
  const checkoutHandler = async () => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      alert("Razor pay failed to load ");
      return;
    }
    const result = await axios.post(
      `${base_Url}user/order/checkout`,
      { totalprice },
      config
    );
    if (!result) {
      alert("Something went wrong try again");
      return;
    }
    const { amount, id: order_id, currency } = result.data;

    const options = {
      key: process.env.REACT_APP_key_id, // Enter the Key ID generated from the Dashboard
      amount: amount.toString(),
      currency: currency,
      name: "Feveri's Corner",
      description: "Test Transaction",
      order_id: order_id,
      handler: async function (response) {
        const data = {
          orderCreationId: order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        };

        const result = await axios.post(
          `${base_Url}user/order/payment`,
          data,
          config
        );
        setpaymentinfo(result.data);
        console.log({
          shippinginfo: shippinginfo,
          paymentinfo: paymentinfo,
          orderitems: orderitems,
          totalprice: totalprice,
          totalpriceafterdiscount: totalprice,
        });
        dispatch(
          createUserOrder({
            shippinginfo: shippinginfo,
            paymentinfo: paymentinfo,
            orderitems: orderitems,
            totalprice: totalprice,
            totalpriceafterdiscount: totalprice,
          })
        );
      },
      prefill: {
        name: "Feveri's Corner",
        email: "suprakash12000121016@gmail.com",
        contact: "9547997540",
      },
      notes: {
        address: "Durgapur",
      },
      theme: {
        color: "#61dafb",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
    navigate("/");
  };
  return (
    <div>
      <Meta title="Feveri's Corner|Checkout" />
      <section className="vh-100 checkout-wrapper home-wrapper-2 ">
        <div className="container py-5">
          <div className="row">
            <div className="col-7 bg-white p-5">
              <div className="checkout-deatils-wrapper">
                <h2 className="website-name">Feveri's Corner</h2>
                <div aria-label="breadcrumb">
                  <ol className="breadcrumb ">
                    <li className="breadcrumb-item">
                      <Link to="/cart">Cart</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      information
                    </li>
                    <li className="breadcrumb-item " aria-current="page">
                      Shipping
                    </li>
                    <li className="breadcrumb-item " aria-current="page">
                      Payment
                    </li>
                  </ol>
                </div>
                <div className="caheckout-details-heading">
                  <h4>Contact Information</h4>
                </div>
                <div className="chekout-user-info">
                  <p>Suprakash Gorai (Suprakashgoreai@gmail.com)</p>
                </div>
                <div className="checkout-form-info">
                  <h2>Shipping Address</h2>
                  <form
                    onSubmit={formik.handleSubmit}
                    className="d-flex gap-10 flex-column"
                  >
                    <div className="d-flex gap-20">
                      <div className="gap-20">
                        <input
                          className="form-control"
                          placeholder="First name"
                          name="firstname"
                          value={formik.values.firstname}
                          onChange={formik.handleChange("firstname")}
                          onBlur={formik.handleBlur("firstname")}
                        />
                        <div className="error">
                          {formik.touched.firstname && formik.errors.firstname}
                        </div>
                      </div>
                      <div className="gap-20">
                        <input
                          className="form-control"
                          placeholder="Last name"
                          name="lastname"
                          value={formik.values.lastname}
                          onChange={formik.handleChange("lastname")}
                          onBlur={formik.handleBlur("lastname")}
                        />
                        <div className="error">
                          {formik.touched.lastname && formik.errors.lastname}
                        </div>
                      </div>
                    </div>

                    <input
                      className="form-control"
                      placeholder="city"
                      name="city"
                      value={formik.values.city}
                      onChange={formik.handleChange("city")}
                      onBlur={formik.handleBlur("city")}
                    />
                    <div className="error">
                      {formik.touched.city && formik.errors.city}
                    </div>
                    <input
                      className="form-control"
                      placeholder="Address"
                      name="address"
                      value={formik.values.address}
                      onChange={formik.handleChange("address")}
                      onBlur={formik.handleBlur("address")}
                    />
                    <div className="error">
                      {formik.touched.address && formik.errors.address}
                    </div>
                    <div className="d-flex gap-10">
                      <input
                        className="form-control"
                        placeholder="Appartment, house no. "
                        name="other"
                        value={formik.values.other}
                        onChange={formik.handleChange("other")}
                        onBlur={formik.handleBlur("other")}
                      />

                      <select
                        className="form-select"
                        placeholder="Select State"
                        name="state"
                        value={formik.values.state}
                        onChange={formik.handleChange("state")}
                        onBlur={formik.handleBlur("state")}
                      >
                        {/* <option value="india">india</option> */}
                        {State.map((e, key) => {
                          return (
                            <option key={key} value={e}>
                              {e}
                            </option>
                          );
                        })}
                      </select>
                      <input
                        className="form-control"
                        placeholder="Pin number"
                        type="number"
                        name="pincode"
                        value={formik.values.pincode}
                        onChange={formik.handleChange("pincode")}
                        onBlur={formik.handleBlur("pincode")}
                      />
                    </div>
                    <div className="error">
                      {formik.touched.other && formik.errors.other}
                    </div>
                    <div className="error">
                      {formik.touched.pincode && formik.errors.pincode}
                    </div>
                    <div className="d-flex justify-content-between align-items-baseline">
                      <button className="btn btn-dark rounded-3" type="submit">
                        Submit
                      </button>
                      <div
                        className="d-flex "
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          navigate("/cart");
                        }}
                      >
                        <BsArrowLeft />
                        Return to cart
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-5 p-5 home-wrapper-2">
              <div className="checkout-deatils-wrapper">
                <div className="d-flex flex-column justify-content-between border-bottom ">
                  {cartState &&
                    cartState?.map((item, index) => {
                      return (
                        <div
                          key={index}
                          className="checkout-produt-details d-flex gap-15 py-2"
                        >
                          <img src={item?.productId?.images[0]} alt="" />
                          <span className="badge bg-success text-white position-absolute">
                            {item?.quantity}
                          </span>
                          <div className="">
                            <p className="productname">
                              {item?.productId?.slug}
                            </p>
                            <p
                              className="product-deatils"
                              dangerouslySetInnerHTML={{
                                __html: String(
                                  item?.productId?.description
                                ).substring(0, 60),
                              }}
                            ></p>
                          </div>
                          <div>
                            <p className="price">
                              &#8377;{item?.productId?.price * item?.quantity}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                </div>
                <div className="checklout-price-calculation border-bottom ">
                  <div className="d-flex justify-content-between align-items-center">
                    <p>Subtotal</p>
                    <p className="price">&#8377; {totalprice}</p>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <p>Shippig</p>
                    <p className="price">&#8377; 1000</p>
                  </div>
                </div>
                <div className="checklout-price-calculation border-bottom ">
                  <div className="d-flex justify-content-between align-items-center">
                    <p>Total</p>
                    <p className="price">&#8377; {totalprice}</p>
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
