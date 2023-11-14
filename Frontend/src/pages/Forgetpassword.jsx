import React from "react";
import Meta from "../components/Meta";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { object } from "yup";
import { string } from "yup";
import Custominput from "../components/Custominput";
import { forgetPassword } from "../features/user/userSlice";
let loginSchema = object({
  email: string().nullable().email("Email should be valid"),
});
export default function Forgetpassword() {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      dispatch(forgetPassword(values));
    },
  });
  return (
    <div>
      <Meta title={"Feveri's Corner|Password reset"} />
      <div className="forget-password-wrapper">
        <div className="container">
          <div className="row py-4">
            <div className="d-flex flex-column align-items-center justify-content-center">
              <h2>Forget Password</h2>
              <div className="d-flex flex-column">
                <form
                  onSubmit={formik.handleSubmit}
                  className="d-flex flex-column "
                >
                  <Custominput
                    classname="logininput"
                    name="Email"
                    type="email"
                    placeholder="username"
                    value={formik.values.email}
                    onChange={formik.handleChange("email")}
                    onBlur={formik.handleBlur("email")}
                  />
                  <div className="error">
                    {formik.touched.email && formik.errors.email}
                  </div>

                  <button className="btn loginbtn my-2" type="submit">
                    Submit
                  </button>
                  <Link className="py-2" to="/login">
                    Cancel
                  </Link>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
