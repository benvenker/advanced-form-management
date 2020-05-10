import React, { useState } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

const LoginForm = ({ values, errors, touched }) => {
  console.log("values, ", values);
  const [users, setUsers] = useState([]);

  return (
    <>
      <div className="login-form">
        <div className="form-container">
          <h1 className="form-title">User Onboarding</h1>
          <h3 className="form-message">
            Enter your information to get started
          </h3>
          <Form>
            <div>
              {touched.email && errors.email && <p>{errors.email}</p>}
              <div className="input-container">
                <Field placeholder="Email address" type="text" name="email" />
              </div>
              {touched.password && errors.password && <p>{errors.password}</p>}
              <div className="input-container">
                <Field placeholder="password" type="password" name="password" />
              </div>
            </div>
            <div>
              <Field as="select" name="role" placeholder="Choose Role">
                <option value="">Choose Role</option>
                <option value="engineer">Engineer</option>
                <option value="manager">Manaager</option>
                <option value="operations">Operations</option>
                <option value="executive">Executive</option>
              </Field>
            </div>
            <div>
              <label>
                <Field type="checkbox" name="tos" checked={values.tos} /> Accept
                ToS
              </label>
              <div>
                <button>SUBMIT</button>
              </div>
            </div>
          </Form>
        </div>
      </div>
      <div className="users-list-container">
        <h3 className="users-list-title">Users</h3>
        <ul className="users-list">
          {values.users.map((user) => (
            <li className="users-list-item">
              <span className="user-email">{user.email}</span>{" "}
              <span className="user-role">{user.role}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

const FormikLoginForm = withFormik({
  mapPropsToValues({ email, password, tos, role }) {
    return {
      email: email || "",
      password: password || "",
      role: role || "",
      tos: tos || false,
      users: [],
    };
  },

  /// Validaion Schema
  validationSchema: Yup.object().shape({
    email: Yup.string().email("Email not valid").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be 6 characters or longer")
      .required("Password is required"),
  }),

  handleSubmit(values, { resetForm, setErrors, setSubmitting }) {
    if (values.email === "alreadytakenn@tbd.dev") {
      setErrors({ email: "That email is already taken" });
    } else {
      axios
        .post("https://reqres.in/api/users", values)
        .then((res) => {
          values.users.push(res.data);
          resetForm();
          setSubmitting(false);
        })
        .catch((err) => {
          console.log(err);
          setSubmitting(false);
        });
    }
  },
})(LoginForm);

export default FormikLoginForm;
