import React from "react";
import Meta from "../components/Meta";
import Breadcrums from "../components/Breadcrums";
import { Link, useLocation } from "react-router-dom";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAblog } from "../features/blogs/blogSelice";
// import moment from "moment/moment";
export default function Singleblog() {
  const blogState = useSelector((state) => state?.blog?.Singleblog);
  // console.log(blogState);
  const location = useLocation();
  const getBlogId = location.pathname.split("/")[2];
  const dispatch = useDispatch();
  const getablog = (id) => {
    dispatch(getAblog(id));
  };
  useEffect(() => {
    getablog(getBlogId);
  }, []);
  return (
    <div>
      <Meta title={`Feveri's Corner|${blogState?.title}`} />
      <Breadcrums title={blogState?.title} />
      <div className="blog-wrapper">
        <div className="container py-5">
          <div className="row ">
            <div className="col-12">
              <div className="container">
                <div className="row">
                  <Link
                    to="/blogs"
                    className="d-flex align-items-center pb-4 gap-15"
                  >
                    <HiOutlineArrowLeft /> Go back to Blogs
                  </Link>
                  <h3>{blogState?.title}</h3>
                  <img
                    className="img-fluid my-4"
                    src={blogState?.images[0] ? blogState?.images[0] : ""}
                    alt="img"
                  />
                  <div
                    className="blog-deatils"
                    dangerouslySetInnerHTML={{ __html: blogState?.description }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
