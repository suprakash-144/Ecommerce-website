import React from "react";
import { Link } from "react-router-dom";

export default function Breadcrums(props) {
  return (
    <div className="py-4">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div aria-label="breadcrumb">
              <ol className="breadcrumb justify-content-center">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  {props.title}
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
