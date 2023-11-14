import { useFormik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { string } from "yup";
import { object } from "yup";
import Custominput from "../components/Custominput";
import { updateUser } from "../features/user/userSlice";
import Meta from "../components/Meta";
import { useState } from "react";
import { AiFillEdit, AiOutlineUser } from "react-icons/ai";
let userSchema = object({
  firstname: string().required("Enter First name"),
  lastname: string().required("Enter Last name"),
  email: string().nullable().email("Email should be valid"),
  mobile: string().required("Enter valid mobile number"),
});
function Profile() {
  const user = useSelector((state) => state.auth.user);
  const [edit, setedit] = useState(true);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      firstname: user?.firstname,
      lastname: user?.lastname,
      email: user?.email,
      mobile: user?.mobile,
    },
    validationSchema: userSchema,
    onSubmit: (values) => {
      dispatch(updateUser(values));
    },
  });
  return (
    <>
      <Meta title={"Feveri's Corner|Profile"} />
      <div className="container">
        <div className="row">
          <div className="col-2 mt-4">
            <div className="d-flex gap-10 align-items-center justify-content-center border">
              <AiOutlineUser className="fs-1" />
              <div className="profile-name">
                <p>Hello</p>
                <p>
                  <strong>{user?.firstname}</strong>
                </p>
              </div>
            </div>
          </div>
          <div className="col-9 ">
            {" "}
            <div className="d-flex border-start flex-column mt-2">
              <div className="icon d-flex  justify-content-end">
                <AiFillEdit
                  className="fs-2"
                  onClick={() => {
                    setedit(!edit);
                  }}
                />
              </div>
              <form
                onSubmit={formik.handleSubmit}
                className="d-flex flex-column p-4 ps-5"
              >
                <h5 className="my-3">Name</h5>
                <div className="d-flex">
                  <input
                    name="firstname"
                    type="text"
                    placeholder="first Name"
                    className={`form-control logininput me-2`}
                    value={formik.values.firstname}
                    onChange={formik.handleChange("firstname")}
                    onBlur={formik.handleBlur("firstname")}
                    disabled={edit}
                  />
                  <input
                    name="lastname"
                    className={`form-control logininput`}
                    type="text"
                    placeholder="Last Name"
                    value={formik.values.lastname}
                    onChange={formik.handleChange("lastname")}
                    onBlur={formik.handleBlur("lastname")}
                    disabled={edit}
                  />
                </div>

                <div className="error">
                  {formik.touched.firstname && formik.errors.firstname}
                </div>

                <div className="error">
                  {formik.touched.lastname && formik.errors.lastname}
                </div>
                <h5 className="my-3">Email</h5>
                <input
                  name="email"
                  type="email"
                  className={`form-control logininput`}
                  placeholder="Email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  disabled={edit}
                />
                <div className="error">
                  {formik.touched.email && formik.errors.email}
                </div>
                <h5 className="my-3">Phone Number:</h5>
                <input
                  name="mobile"
                  type="text"
                  className={`form-control logininput`}
                  placeholder="Mobile number"
                  value={formik.values.mobile}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  disabled={edit}
                />
                <div className="error">
                  {formik.touched.mobile && formik.errors.mobile}
                </div>

                <button className="btn loginbtn my-3" type="submit">
                  Save
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
