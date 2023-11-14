import React from "react";

export default function Blogcard(props) {
  const { data } = props;
  return (
    <div>
      <div className="card bg-light m-2 p-2">
        <div className=" bg-white rounded-3 h-50">
          <img
            src={data?.images[0] ? data.images[0] : "images/blog-1.jpg"}
            className="card-img-top rounded-3 p-3"
            alt="product"
          />
        </div>
        <div className="card-body p-3">
          <h6 className="card-title pt-1">
            <strong>{data?.title}</strong>
          </h6>
          <p
            className="card-text py-2"
            dangerouslySetInnerHTML={{
              __html: `${String(data?.description).substring(0, 100)}...`,
            }}
          ></p>
          <a href={"/blogs/" + data?._id} className="btn blogbtn rounded-3">
            Read More
          </a>
        </div>
      </div>
    </div>
  );
}
