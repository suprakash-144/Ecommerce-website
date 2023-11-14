import React from "react";
import Meta from "../components/Meta";
import Breadcrums from "../components/Breadcrums";
import Productcard from "../components/Productcard";
import ReactStars from "react-stars";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Color from "./../components/Color";
import { useDispatch, useSelector } from "react-redux";
import {
  addtoWishlist,
  getSingleproduct,
} from "../features/products/productSlice";
import { addUserCart, getUserCart } from "../features/user/userSlice";
import { toast } from "react-toastify";
import Featuredproduct from "../components/Featuredproduct";
import { AiOutlineLink } from "react-icons/ai";

export default function Singleproduct() {
  const [boughtproduct, setboughtproduct] = useState(false);
  const [review, setreview] = useState(false);
  const [color, setcolor] = useState(null);
  const [quantity, setquantity] = useState(1);
  const [alreadyadded, setalreadyadded] = useState(false);
  const cartstate = useSelector((state) => state.auth.cartproducts);
  const copyToClipboard = (link) => {
    navigator.clipboard.writeText(link);
  };

  const location = useLocation();
  const getprodid = location.pathname.split("/")[2];
  const dispatch = useDispatch();
  const navigation = useNavigate();

  console.log(color);

  const getproduct = (id) => {
    dispatch(getSingleproduct(id));
  };
  const addtowishlist = (prodId) => {
    dispatch(addtoWishlist(prodId));
  };
  const singleproduct = useSelector((state) => state.product.Singleproduct);
  const [image, setimage] = useState("");

  const addtocart = () => {
    if (color === null) {
      toast.info("Please select color");
      return false;
    } else {
      dispatch(
        addUserCart({
          productId: singleproduct?._id,
          price: singleproduct.price,
          quantity: quantity,
          color,
        })
      );
      setalreadyadded(true);
    }
  };
  const handleToggle = () => {
    setreview((current) => !current);
  };
  useEffect(() => {
    getproduct(getprodid);
    setboughtproduct(true);
    dispatch(getUserCart());
  }, []);
  useEffect(() => {
    cartstate?.forEach((element) => {
      if (getprodid === element?.productId?._id) {
        setalreadyadded(true);
      }
    });
  }, [cartstate, setalreadyadded, getprodid]);

  return (
    <div>
      <Meta title={`Feveri's Corner| ${singleproduct?.slug}`} />
      <Breadcrums title={String(singleproduct?.slug).substring(0, 50)} />
      <div className="product-wrapper home-wrapper-2">
        <div className="container">
          <div className="row py-5">
            <div className="col-6">
              <div className="main-product-images">
                <div className="main-product-image bg-light p-2 d-flex justify-content-center">
                  <img src={image ? image : singleproduct?.images[0]} alt="" />
                </div>
                <div className="other-product-images d-flex flex-wrap col-12 p-2 ">
                  {singleproduct?.images.map((e, i) => {
                    return (
                      <div className="col-6 bg-light p-2 d-flex justify-content-centerd-flex justify-content-center">
                        <img
                          key={i}
                          src={e}
                          alt=""
                          onClick={() => {
                            setimage(e);
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="container">
                <div className="row">
                  <div className="product-details ">
                    <div className="border-bottom">
                      <h3>
                        {singleproduct?.title}
                        <AiOutlineLink
                          className="fs-3 mx-3"
                          onClick={() => {
                            copyToClipboard(window.location.href);
                          }}
                          style={{ cursor: "pointer" }}
                        />
                      </h3>
                    </div>
                    <div className="border-bottom py-3">
                      <p className="fs-4">&#8377; {singleproduct?.price}</p>
                      <div className="d-flex align-items-center">
                        <ReactStars
                          count={5}
                          edit={false}
                          size={24}
                          // value={Number(singleproduct?.totalratings)}

                          value={Number(Math.random() * (5 - 3 + 1) + 3)}
                          activeColor="#ffd700"
                        />
                        <div className="product-review-no">
                          ({singleproduct?.ratings.length})
                        </div>
                      </div>
                      <a onClick={() => setreview(true)} href="#review">
                        Write a review
                      </a>
                    </div>
                    <div className="border-bottom py-3">
                      <div className="d-flex my-1 align-items-center gap-10">
                        <h4 className="product-heading">Type:</h4>
                        <p className="product-data">
                          {singleproduct?.category}
                        </p>
                      </div>
                      <div className="d-flex  my-1 align-items-center gap-10">
                        <h4 className="product-heading">Brand:</h4>
                        <p className="product-data">{singleproduct?.brand}</p>
                      </div>
                      <div className="d-flex my-1  align-items-center gap-10">
                        <h4 className="product-heading">Catagory:</h4>
                        <p className="product-data">
                          {singleproduct?.category}
                        </p>
                      </div>
                      <div className="d-flex my-1 align-items-center gap-10">
                        <h4 className="product-heading">Tags:</h4>
                        <p className="product-data">{singleproduct?.tags}</p>
                      </div>
                      <div className="d-flex my-1 align-items-center gap-10">
                        <h4 className="product-heading">Availability:</h4>
                        <p className="product-data">
                          {singleproduct?.quantity}
                        </p>
                      </div>

                      <div className="d-flex my-2  gap-10">
                        <h4 className="product-heading">Colour:</h4>
                        <Color
                          colorData={singleproduct?.color}
                          setcolor={setcolor}
                        />
                      </div>
                      <div className="d-flex gap-30">
                        <h3 className="product-heading">Quantity:</h3>
                        <div className="">
                          <input
                            className="form-control"
                            type="number"
                            min={1}
                            max={singleproduct?.quantity}
                            onChange={(e) => {
                              setquantity(e.target.value);
                            }}
                            value={quantity}
                          />
                        </div>
                        <div className="d-flex product-buttons gap-10">
                          {alreadyadded === true ? (
                            <button
                              className="btn signupbtn fs-6"
                              onClick={() => navigation(`/cart`)}
                            >
                              Go to Cart
                            </button>
                          ) : (
                            <button
                              className="btn loginbtn fs-6 "
                              onClick={() => addtocart()}
                            >
                              Add to cart
                            </button>
                          )}

                          <button
                            onClick={() => {
                              addtowishlist(singleproduct?._id);
                            }}
                            className="btn signupbtn fs-6 "
                          >
                            Wishlist
                          </button>
                        </div>
                      </div>
                      {/* <div className="d-flex gap-30">
                        <Link>Wishlist</Link>
                      </div> */}
                      <div className="py-2 my-4">
                        <div
                          className="accordion rounded-3"
                          id="accordionExample"
                        >
                          <div className="accordion-item border-0">
                            <h2 className="accordion-header" id="headingOne">
                              <button
                                className="accordion-button "
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapseOne"
                                aria-expanded="true"
                                aria-controls="collapseOne"
                              >
                                Shipping policy
                              </button>
                            </h2>
                            <div
                              id="collapseOne"
                              className="accordion-collapse collapse show"
                              aria-labelledby="headingOne"
                              data-bs-parent="#accordionExample"
                            >
                              <div className="accordion-body">
                                <div style={{ lineHeight: "1.5" }}>
                                  <strong>
                                    <span data-custom-class="heading_2">
                                      Free Shipping
                                    </span>
                                  </strong>
                                </div>
                                <div style={{ lineHeight: "1.5" }}>
                                  <br />
                                </div>
                                <div style={{ lineHeight: "1.5" }}>
                                  <span style={{ color: "rgb(127, 127, 127)" }}>
                                    <span
                                      style={{
                                        color: "rgb(89, 89, 89)",
                                        fontSize: 15,
                                      }}
                                    >
                                      <span data-custom-class="body_text">
                                        We offer free{" "}
                                        <bdt className="question">standard</bdt>{" "}
                                        shipping{" "}
                                        <bdt className="block-component" />
                                      </span>
                                    </span>
                                  </span>
                                  <bdt className="block-component" />
                                  <span style={{ color: "rgb(127, 127, 127)" }}>
                                    <span
                                      style={{
                                        color: "rgb(89, 89, 89)",
                                        fontSize: 15,
                                      }}
                                    >
                                      <span data-custom-class="body_text">
                                        on{" "}
                                        <bdt className="question">
                                          Orders over ₹500{" "}
                                        </bdt>
                                      </span>
                                    </span>
                                  </span>
                                  <bdt className="statement-end-if-in-editor">
                                    <bdt className="block-component">
                                      <span
                                        style={{ color: "rgb(127, 127, 127)" }}
                                      >
                                        <span
                                          style={{
                                            color: "rgb(89, 89, 89)",
                                            fontSize: 15,
                                          }}
                                        >
                                          <span data-custom-class="body_text">
                                            <bdt className="statement-end-if-in-editor" />
                                          </span>
                                        </span>
                                      </span>
                                    </bdt>
                                    <span data-custom-class="body_text">.</span>
                                    <span data-custom-class="body_text">
                                      <bdt className="statement-end-if-in-editor">
                                        <span
                                          style={{
                                            color: "rgb(127, 127, 127)",
                                          }}
                                        >
                                          <span
                                            style={{
                                              color: "rgb(89, 89, 89)",
                                              fontSize: 15,
                                            }}
                                          >
                                            <span data-custom-class="body_text">
                                              <bdt className="statement-end-if-in-editor" />
                                            </span>
                                          </span>
                                        </span>
                                        <bdt className="block-component" />
                                      </bdt>
                                    </span>
                                  </bdt>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="description-wrapper home-wrapper-2 py-5">
        <div className="container bg-white rounded-3">
          <div className="row">
            <div className="col-12 p-2">
              <h3 className="p-3">Description</h3>
              <p
                className="p-3"
                dangerouslySetInnerHTML={{ __html: singleproduct?.description }}
              ></p>
            </div>
          </div>
        </div>
      </div>
      <div id="review" className="reviews-wrapper home-wrapper-2 py-5">
        <div className="container p-3 rounded-3">
          <div className="row">
            <div className="col-12">
              <h3>Reviews</h3>
              <div className="review-inner-wrapper bg-white p-3">
                <div className="border-bottom py-2 review-head d-flex justify-content-between align-items-end">
                  <div className="rounded-3">
                    <h5>Customer Review</h5>
                    <div className="d-flex gap-15 align-items-center">
                      <ReactStars
                        count={5}
                        edit={false}
                        size={24}
                        value={4}
                        activeColor="#ffd700"
                      />
                      <p>Based on 2 reviews </p>
                    </div>
                  </div>
                  {boughtproduct && (
                    <div>
                      <Link onClick={handleToggle}>
                        {" "}
                        {!review ? "Write a review" : "Cancel"}
                      </Link>
                    </div>
                  )}
                </div>
                {review && (
                  <div className="review-form py-5 border-bottom">
                    <form className="d-flex gap-10 flex-column w-50">
                      <ReactStars
                        count={5}
                        edit={true}
                        size={24}
                        activeColor="#ffd700"
                      />

                      <textarea
                        placeholder="review"
                        className=" form-control "
                      />
                      <button className="btn loginbtn" type="submit">
                        Submit
                      </button>
                    </form>
                  </div>
                )}
                <div className="reviews">
                  <div className="review p-4">
                    <div className="d-flex align-items-center gap-10 ">
                      <p>Ratul</p>
                      <ReactStars
                        count={5}
                        edit={false}
                        size={24}
                        value={4}
                        activeColor="#ffd700"
                      />
                    </div>

                    <p>
                      Product is very nice and genuine product. Nice sound
                      quality and picture quality.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
