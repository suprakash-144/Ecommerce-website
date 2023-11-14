import React from "react";
import Meta from "../components/Meta";
import Breadcrums from "../components/Breadcrums";
import Blogcard from "../components/Blogcard";
import { useDispatch, useSelector } from "react-redux";
import { getallblogs } from "./../features/blogs/blogSelice";
import { useEffect } from "react";
import moment from "moment/moment";
export default function Blogs() {
  const blogState = useSelector((state) => state.blog.blog);

  const dispatch = useDispatch();
  const getblogs = () => {
    dispatch(getallblogs());
  };
  useEffect(() => {
    getblogs();
  }, []);
  return (
    <div>
      <Meta title="Feveri's Corner|Blogs" />
      <Breadcrums title="Blogs" />
      <div className="blog-wrapper">
        <div className="container">
          <div className="row">
            <div className="col-3">
              <div className="filter-wrapper">
                <h3 className="filter-title">Find by Catogery</h3>
                <div className="">
                  <ul>
                    <li>Watch</li>
                    <li>Tv</li>
                    <li>Camera</li>
                    <li>Laptop</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-9">
              <div className="row">
                {blogState &&
                  blogState?.map((item, index) => {
                    return (
                      <div className="col-6" key={index}>
                        <Blogcard
                          data={item}
                          moment={moment(item?.created_at).format(
                            "MMMM Do YYYY, h:mm:ss a"
                          )}
                        />
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
