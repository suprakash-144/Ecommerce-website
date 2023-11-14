import React from "react";
import Breadcrums from "./../components/Breadcrums";
import Meta from "./../components/Meta";

export default function Privacypolicy() {
  return (
    <div>
      <Meta title="Feveri's Corner|Privacy Policy" />
      <Breadcrums title="Privacy Policy" />
      <section className="policy-wrapper home-wrapper-2 py-5">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="policy"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
