/* eslint-disable jsx-a11y/iframe-has-title */
import React from "react";
import Breadcrums from "../components/Breadcrums";
import Meta from "../components/Meta";
import { AiOutlineHome, AiOutlineMail } from "react-icons/ai";
import { BiInfoCircle, BiPhoneCall } from "react-icons/bi";
import { useFormik } from "formik";
import { object, string } from "yup";
import { useDispatch } from "react-redux";
import { postComment } from "../features/contact/contactSlice";
let contactSchema = object({
  name: string().required("Enter your name"),
  email: string().nullable().email("Email should be valid"),
  mobile: string().required("Enter your phone number"),
  comment: string().required("Enter your Enquire"),
});
export default function Contact() {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      mobile: "",
      comment: "",
    },
    validationSchema: contactSchema,
    onSubmit: (values) => {
      dispatch(postComment(values));
    },
  });
  return (
    <div>
      <Meta title="Feveri's Corner|Contact Us" />
      <Breadcrums title="Contact Us" />
      <div className="contact-wrapper">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14638.143462164935!2d87.38432039791985!3d23.47720071172039!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f77a130c99f90f%3A0xf438862ff155db61!2sRajbandh%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1683468834688!5m2!1sen!2sin"
                allowFullScreen=""
                height={400}
                className="border-0 w-100"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <div className="col-12">
              <div className="contact-wrapper my-5 d-flex justify-content-start p-2">
                <div className="contact-details w-50 p-2 ">
                  <h3>Contact form</h3>
                  <div>
                    <form
                      onSubmit={formik.handleSubmit}
                      className="d-flex gap-10 flex-column w-75"
                    >
                      <input
                        name="name"
                        type="text"
                        className="contactinput"
                        placeholder="Name"
                        value={formik.values.name}
                        onChange={formik.handleChange("name")}
                        onBlur={formik.handleBlur("name")}
                      />
                      <div className="error">
                        {formik.touched.name && formik.errors.name}
                      </div>
                      <input
                        type="email"
                        value={formik.values.email}
                        name="email"
                        className="contactinput"
                        placeholder="Email"
                        onChange={formik.handleChange("email")}
                        onBlur={formik.handleBlur("email")}
                      />
                      <div className="error">
                        {formik.touched.email && formik.errors.email}
                      </div>
                      <input
                        name="mobile"
                        value={formik.values.mobile}
                        placeholder="Phone Number"
                        type="text"
                        className="contactinput"
                        onChange={formik.handleChange("mobile")}
                        onBlur={formik.handleBlur("mobile")}
                      />
                      <div className="error">
                        {formik.touched.mobile && formik.errors.mobile}
                      </div>
                      <textarea
                        value={formik.values.comment}
                        name="comment"
                        placeholder="Enter you Question here"
                        className="contactinput"
                        onChange={formik.handleChange("comment")}
                        onBlur={formik.handleBlur("comment")}
                      />
                      <div className="error">
                        {formik.touched.comment && formik.errors.comment}
                      </div>
                      <button className="btn btn-dark rounded-3" type="submit">
                        Submit
                      </button>
                    </form>
                  </div>
                </div>
                <div className="contact-details w-50">
                  <h3 className="m-1">Contact Information</h3>
                  <ul className="mt-4 ">
                    <li className="d-flex gap-15 my-1 align-items-center">
                      <AiOutlineHome className="fs-5" />
                      <div>Durgapur , Paschim Bardhaman</div>
                    </li>
                    <li className="d-flex gap-15 my-1 align-items-center">
                      <BiPhoneCall className="fs-5" />
                      <a href="tel:+9547997540">9955332210</a>
                    </li>
                    <li className="d-flex gap-15 my-1 align-items-center">
                      <AiOutlineMail className="fs-5" />
                      <a href="mailto:suprakashgorai14@gmail.com">
                        suprakashgorai175@gmail.com
                      </a>
                    </li>
                    <li className="d-flex gap-15 my-1 align-items-center">
                      <BiInfoCircle className="fs-5" />
                      <p>Monday - Friday : 10 A.M - 8 P.M</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
