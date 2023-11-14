import React from "react";
import Breadcrums from "../components/Breadcrums";
import Meta from "../components/Meta";
import Color from "./../components/Color";
export default function Compare() {
  return (
    <div>
      <Meta title="Compare-wishlist" />
      <Breadcrums title="Compare-Wishlist" />
      <div className="compare-wrapper home-wrapper-2 py-5">
        <div className="container">
          <div className="row">
            <div className="col-3">
              <div className="card position-relative">
                <img
                  src="images/cross.svg"
                  alt=""
                  className="position-absolute img-fluid"
                />
                <div className="card-img">
                  <img className="img-fluid" src="images/tab1.jpg" alt="" />
                </div>
                <div className="compare-details">
                  <h5 className="title">Honor 100 tab </h5>
                  <h6 className="price">$100</h6>
                  <div className=" d-flex justify-content-between product-details">
                    <h5>Brand</h5>
                    <p>Honor</p>
                  </div>
                  <div>
                    <div className="product-detail">
                      <h5>Brand:</h5>
                      <p>Havels</p>
                    </div>
                    <div className="product-detail">
                      <h5>Type:</h5>
                      <p>Watch</p>
                    </div>
                    <div className="product-detail">
                      <h5>Availablity:</h5>
                      <p>In Stock</p>
                    </div>
                    <div className="product-detail">
                      <h5>Color:</h5>
                      <Color />
                    </div>
                    <div className="product-detail">
                      <h5>Size:</h5>
                      <div className="d-flex gap-10">
                        <p>S</p>
                        <p>M</p>
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
  );
}
