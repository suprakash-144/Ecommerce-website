import React from "react";
import Meta from "./../components/Meta";
import { useFormik } from "formik";
import { object, string } from "yup";
import Custominput from "./../components/Custominput";
import { useDispatch } from "react-redux";
import { registerUser } from "./../features/user/userSlice";
let signupSchema = object({
  firstname: string().required("Enter First name"),
  lastname: string().required("Enter Last name"),
  email: string().nullable().email("Email should be valid"),
  mobile: string().required("Enter valid mobile number"),
  password: string().required("Password is required"),
});
export default function Signup() {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      mobile: "",
      password: "",
    },
    validationSchema: signupSchema,
    onSubmit: (values) => {
      dispatch(registerUser(values));
    },
  });

  return (
    <div>
      <Meta title={"Feveri's Corner|Signup"} />
      <div className="container">
        <div className="d-flex justify-content-center py-5">
          <div>
            <h3>Register</h3>
            <div>
              <form
                onSubmit={formik.handleSubmit}
                className="d-flex flex-column"
              >
                <div className="d-flex">
                  <Custominput
                    classname="signupinput"
                    name="firstname"
                    type="text"
                    placeholder="first Name"
                    value={formik.values.firstname}
                    onChange={formik.handleChange("firstname")}
                    onBlur={formik.handleBlur("firstname")}
                  />
                  <div className="error">
                    {formik.touched.firstname && formik.errors.firstname}
                  </div>
                  <Custominput
                    classname="signupinput ms-1"
                    name="lastname"
                    type="text"
                    placeholder="Last Name"
                    value={formik.values.lastname}
                    onChange={formik.handleChange("lastname")}
                    onBlur={formik.handleBlur("lastname")}
                  />
                  <div className="error">
                    {formik.touched.lastname && formik.errors.lastname}
                  </div>
                </div>

                <Custominput
                  classname="signupinput"
                  name="email"
                  type="email"
                  placeholder="Email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <div className="error">
                  {formik.touched.email && formik.errors.email}
                </div>
                <Custominput
                  classname="signupinput"
                  name="mobile"
                  type="text"
                  placeholder="Mobile number"
                  value={formik.values.mobile}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <div className="error">
                  {formik.touched.mobile && formik.errors.mobile}
                </div>
                <Custominput
                  classname="signupinput"
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <div className="error">
                  {formik.touched.password && formik.errors.password}
                </div>

                <button className="btn signupbtn mt-3" type="submit">
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
