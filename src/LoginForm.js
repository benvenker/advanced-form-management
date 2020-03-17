import React, { useState } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

const LoginForm = ({ values, errors, touched }) => {
  console.log("values, ", values);
  const [users, setUsers] = useState([]);

  return (
    <div className="login-form">
      <Form>
        <div>
          {touched.email && errors.email && <p>{errors.email}</p>}
          <Field placeholder="Username" type="text" name="email" />
          {touched.password && errors.password && <p>{errors.password}</p>}
          <Field placeholder="password" type="password" name="password" />
        </div>
        <div>
          <Field as="select" name="role">
            <option value="engineer">Engineer</option>
            <option value="manager">Manaager</option>
            <option value="operations">Operations</option>
            <option value="executtive">Executive</option>
          </Field>
        </div>
        <div>
          <label>
            <Field type="checkbox" name="tos" checked={values.tos} />
            Accept ToS
          </label>
          <div>
            <button>Submit!</button>
          </div>
        </div>
      </Form>
      <h3>Users</h3>
      <ul>
        {values.users.map(user => (
          <li>
            {user.email} test {user.password} {user.role}
          </li>
        ))}
      </ul>
    </div>
  );
};

const FormikLoginForm = withFormik({
  mapPropsToValues({ email, password, tos, role }) {
    return {
      email: email || "",
      password: password || "",
      role: role || "",
      tos: tos || false,
      users: []
    };
  },

  /// Validaion Schema
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email("Email not valid")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be 6 characters or longer")
      .required("Password is required")
  }),

  handleSubmit(values, { resetForm, setErrors, setSubmitting }) {
    if (values.email === "alreadytakenn@tbd.dev") {
      setErrors({ email: "That email is already taken" });
    } else {
      axios
        .post("https://reqres.in/api/users", values)
        .then(res => {
          values.users.push(res.data);
          resetForm();
          setSubmitting(false);
        })
        .catch(err => {
          console.log(err);
          setSubmitting(false);
        });
    }
  }
})(LoginForm);

export default FormikLoginForm;
