import React from "react";
import Meta from "../components/Meta";
import { Link, useNavigate } from "react-router-dom";
import Custominput from "./../components/Custominput";
import { useFormik } from "formik";
import { object, string } from "yup";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/user/userSlice";

let loginSchema = object({
  email: string().nullable().email("Email should be valid"),
  password: string().required("Password is required"),
});
export default function Signin() {
  const navigate = useNavigate();
  const authState = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      dispatch(loginUser(values));
      setTimeout(() => {
        if (authState.isSuccess) {
          navigate("/");
        }
      }, 400);
    },
  });
  return (
    <div>
      <Meta title={"Feveri's Corner|Login"} />
      <div className="container">
        <div className="d-flex flex-column justify-content-center align-items-center">
          <div className="d-flex flex-column justify-content-center align-items-center">
            <div>
              <div className="py-3">
                <h3>Login</h3>
              </div>
              <form
                onSubmit={formik.handleSubmit}
                className="d-flex flex-column py-1"
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
                <Custominput
                  classname="logininput"
                  name="Pssword"
                  type="password"
                  placeholder="Password"
                  value={formik.values.password}
                  onChange={formik.handleChange("password")}
                  onBlur={formik.handleBlur("password")}
                />
                <div className="error">
                  {formik.touched.password && formik.errors.password}
                </div>
                <div className="forget-pass pt-4 pb-2">
                  <Link to="/forgetpassword">
                    <p> Forget your password?</p>
                  </Link>
                </div>
                <button className="btn loginbtn" type="submit">
                  login
                </button>
              </form>
              <div className="d-flex justify-content-end pt-2 pb-4">
                <Link to="/signup">
                  <p> Don't have a account?</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
