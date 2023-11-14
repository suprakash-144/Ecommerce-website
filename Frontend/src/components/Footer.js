import React from "react";
import { BsLinkedin, BsGithub, BsYoutube, BsInstagram } from "react-icons/bs";

export default function Footer() {
  return (
    <div>
      <footer className="py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-5">
              <div className="footer-top d-flex gap-30 align-items-center">
                <img src="images/newsletter.png" alt="" />
                <h2 className="text-white"> Sign Up for Newsletter</h2>
              </div>
            </div>
            <div className="col-7">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control p-2"
                  placeholder="Your email"
                  aria-label="Your email"
                  aria-describedby="basic-addon2"
                />
                <span className="input-group-text " id="basic-addon2">
                  Subscribe
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <footer className="py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-4">
              <h4>Contact</h4>
              <div className="d-flex flex-column">
                <address className="text-white fs-6">
                  Rajbandh , Durgapur
                </address>
                <a className="pb-2" href="tel: +91 8264954234">
                  +91 8264954234
                </a>
                <a className="pb-2" href="mailto:suprakashgorai175@gmail.com">
                  suprakashgorai175@gmail.com
                </a>
                <div className="social_links d-flex align-items-center gap-30">
                  <a href="/">
                    <BsLinkedin className="fs-4" />
                  </a>
                  <a href="/">
                    <BsGithub className="fs-4" />
                  </a>
                  <a href="/">
                    <BsInstagram className="fs-4" />
                  </a>
                  <a href="/">
                    <BsYoutube className="fs-4" />
                  </a>
                </div>
              </div>
            </div>
            <div className="col-4">
              <h4>Information</h4>
              <div className="d-flex flex-column gap-10">
                <a href="/refundpolicy">Refund Policy</a>
                <a href="/shippingpolicy">Shipping Policy</a>
                <a href="/blogs">Blogs</a>
              </div>
            </div>
            <div className="col-4">
              <h4>Account</h4>
              <div className="d-flex flex-column  gap-10">
                <a href="/">About Us</a>
                <a href="/">Faq</a>
                <a href="/contact">Contact</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <footer className="py-3">
        <div className="container-xxl">
          <div className="col-12 text-center text-white">
            &copy; {new Date().getFullYear()}; Powered By Feveri's Corner
          </div>
        </div>
      </footer>
    </div>
  );
}
