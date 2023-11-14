import React, { useEffect, useState } from "react";
import Breadcrums from "../components/Breadcrums";
import Meta from "../components/Meta";
import Productcard from "./../components/Productcard";

import { useDispatch, useSelector } from "react-redux";
import { getallproduct } from "../features/products/productSlice";

export default function Store() {
  const [grid, setgrid] = useState(4);
  const [random, setrandom] = useState(null);
  const productState = useSelector((state) => state.product.product);

  const dispatch = useDispatch();
  const getProducts = () => {
    dispatch(getallproduct());
  };
  useEffect(() => {
    getProducts();
    setTimeout(() => {
      setrandom(productState.slice(6, 8));
    }, 100);
  }, []);
  return (
    <div>
      <Meta title={"Feveri's Corner|Our Store"} />
      <Breadcrums title="Our Store" />
      <div className="store-wrapper py-3">
        <div className="container">
          <div className="row">
            <div className="col-3">
              <div className="filter-wrapper">
                <h3 className="filter-title">Shop by Catogery</h3>
                <div className="">
                  <ul>
                    <li>Watch</li>
                    <li>Tv</li>
                    <li>Camera</li>
                    <li>Laptop</li>
                  </ul>
                </div>
              </div>
              <div className="filter-wrapper">
                {/* <h3 className="filter-title">filter</h3> */}
                <div className="my-1">
                  <h5 className="sub-title my-2">Availablity</h5>
                  <div className="">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name=""
                        id=""
                      />
                      <label className="form-check-label">In stock</label>
                    </div>
                    {/* <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name=""
                        id=""
                      />
                      <label className="form-check-label">Out of Stock</label>
                    </div> */}
                  </div>
                  <h5 className="sub-title my-2">Price</h5>
                  <div className="price-range gap-10 p-1 d-flex">
                    <div className="form-floating">
                      <input
                        type="number"
                        className="form-control"
                        id="floatingFrom"
                        placeholder="From"
                      />
                      <label htmlFor="floatingFrom">From</label>
                    </div>
                    <div className="form-floating">
                      <input
                        type="number"
                        className="form-control"
                        id="floatingTo"
                        placeholder="To"
                      />
                      <label htmlFor="floatingTo">To</label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="filter-wrapper pt-2">
                <div>
                  {random &&
                    random.map((item, index) => {
                      return <Productcard index={index} item={item} />;
                    })}
                </div>
              </div>
            </div>
            <div className="col-9">
              <div className="filter-sort-grid">
                <div className="d-flex justify-content-between align-items-center ">
                  <div className="d-flex  align-items-center gap-10">
                    <p>Sort by</p>
                    <select className="form-select" name="" id="">
                      <option value="">Price</option>
                      <option value="">Quantity</option>
                      <option value="">Popularity</option>
                      <option value="">Relevance</option>
                    </select>
                  </div>
                  <div className="d-flex align-items-center gap-10">
                    <p className="d-flex align-items-center gap-10 total-products">
                      {productState.length} Products
                      <img
                        onClick={() => {
                          setgrid(3);
                        }}
                        src="images/gr4.svg"
                        alt="grid"
                        className="img-fluid d-block"
                      />
                      <img
                        onClick={() => {
                          setgrid(4);
                        }}
                        src="images/gr3.svg"
                        alt="grid"
                        className="img-fluid d-block"
                      />
                      <img
                        onClick={() => {
                          setgrid(6);
                        }}
                        src="images/gr2.svg"
                        alt="grid"
                        className="img-fluid d-block"
                      />
                      <img
                        onClick={() => {
                          setgrid(12);
                        }}
                        src="images/gr.svg"
                        alt="grid"
                        className="img-fluid d-block"
                      />
                    </p>
                  </div>
                </div>
              </div>
              <div className="product-list d-flex flex-wrap">
                {productState &&
                  productState?.map((item, index) => {
                    return <Productcard key={index} item={item} grid={grid} />;
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
