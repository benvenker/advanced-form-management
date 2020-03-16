import React from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

const LoginForm = ({ values, errors, touched }) => {
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
          <label>
            <Field type="checkbox" name="tos" checked={values.tos} />
            Accept ToS
          </label>
          <div>
            <button>Submit!</button>
          </div>
        </div>
      </Form>
    </div>
  );
};

const FormikLoginForm = withFormik({
  mapPropsToValues({ email, password, tos }) {
    return {
      email: email || "",
      password: password || "",
      tos: tos || false
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
        .then(res => console.log(res.data));
    }
  }
})(LoginForm);

export default FormikLoginForm;
