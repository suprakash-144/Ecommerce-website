import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Meta from "../components/Meta";
import { object, string, ref } from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { resetPassword } from "../features/user/userSlice";
import Custominput from "../components/Custominput";
let resetSchema = object({
  password: string().required("Password is required"),
  // cpassword: string().oneOf([ref("password"), null], "Passwords must match"),
});
export default function Resetpassword() {
  const location = useLocation();
  const token = location.pathname.split("/")[2];

  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      password: "",
      token: token,
    },
    validationSchema: resetSchema,
    onSubmit: (values) => {
      dispatch(resetPassword(values));
      setTimeout(() => {
        Navigate("/login");
      }, 150);
    },
  });
  return (
    <div>
      <Meta title={"Feveri's Corner|Password reset"} />
      <div className="forget-password-wrapper">
        <div className="container">
          <div className="row py-4">
            <div className="d-flex flex-column align-items-center justify-content-center">
              <h2>Reset Password</h2>
              <div className="d-flex flex-column">
                <form
                  onSubmit={formik.handleSubmit}
                  className="d-flex flex-column "
                >
                  <Custominput
                    classname="logininput"
                    name="password"
                    type="password"
                    placeholder="password"
                    value={formik.values.password}
                    onChange={formik.handleChange("password")}
                    onBlur={formik.handleBlur("password")}
                  />
                  <div className="error">
                    {formik.touched.password && formik.errors.password}
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
