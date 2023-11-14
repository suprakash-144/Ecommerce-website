import React, { useEffect } from "react";
// import { Link } from "react-router-dom";
import { NavLink, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserCart } from "../features/user/userSlice";
import { CgProfile } from "react-icons/cg";
import { BsCartDash } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import { BiDialpadAlt } from "react-icons/bi";
export default function Header() {
  const dispatch = useDispatch();
  const cartstate = useSelector((state) => state.auth.cartproducts);
  const user = useSelector((state) => state.auth.user);
  const handlelogout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };
  useEffect(() => {
    dispatch(getUserCart());
  }, [dispatch]);

  return (
    <>
      <header className="header-middle-strip py-3">
        <div className="container">
          <div className="row align-items-center justify-content-between">
            <div className="col-3 ">
              <Link to="/" className="d-flex justify-content-center text-white">
                <h2>Feveri's Corner</h2>
              </Link>
            </div>

            <div className="col-9 ">
              <div className="d-flex align-items-center gap-30 justify-content-end">
                <div>
                  <Link
                    to="/wishlist"
                    className="d-flex align-tems-center text-white gap-10"
                  >
                    <AiOutlineHeart />
                  </Link>
                </div>

                <div>
                  <Link to={"/cart"} className="d-flex align-items-center ">
                    <BsCartDash className="text-warning" />
                    <span className="badge text-danger cart-value">
                      {cartstate?.length}
                    </span>
                  </Link>
                </div>
                <div>
                  <div className="dropdown text-white">
                    <button
                      className="bg-transparent border-0 d-flex align-items-center "
                      type="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <CgProfile className="text-white " />
                      {user != null ? (
                        <span className="username"> {user.firstname} </span>
                      ) : (
                        ""
                      )}
                    </button>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton1"
                    >
                      <li>
                        <Link className="dropdown-item" to="/profile">
                          profile
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/order">
                          orders
                        </Link>
                      </li>
                      <li>
                        {user != null ? (
                          <button
                            className="dropdown-item"
                            onClick={() => {
                              handlelogout();
                            }}
                          >
                            logout
                          </button>
                        ) : (
                          <Link to="/login" className="dropdown-item">
                            login
                          </Link>
                        )}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <header className="header-navbar">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="menu-bottom d-flex flex-wrap align-items-center gap-30">
                <div>
                  <div className="dropdown">
                    <button
                      className="btn btn-secondary gap-15 d-flex align-items-center dropdown-toggle"
                      type="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <BiDialpadAlt className="fs-3" />
                      <span className="me-5 ">shop catogeries</span>
                    </button>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton1"
                    >
                      <li>
                        <Link className="dropdown-item" to="/store">
                          Watches
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/store">
                          Laptops
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/store">
                          Mobiles
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/store">
                          Speakers
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="menu-links">
                  <div className="d-flex align-items-center gap-15">
                    <NavLink to="/">home</NavLink>
                    <NavLink to="/store">our Store</NavLink>
                    <NavLink to="/blogs">blogs</NavLink>
                    <NavLink to="/contact">contact</NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
