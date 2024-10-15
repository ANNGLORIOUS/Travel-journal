import React, { useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { login } from "../utils/auth";

const LoginSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

function LoginPage() {
  const history = useHistory();
  const { setIsAuthenticated } = useContext(AuthContext);

  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      await login(values);
      setIsAuthenticated(true);
      history.push("/");
    } catch (error) {
      setFieldError("general", "Invalid username or password");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <Formik
        initialValues={{ username: "", password: "" }}
        validationSchema={LoginSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors }) => (
          <Form>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <Field type="text" name="username" className="form-control" />
              <ErrorMessage
                name="username"
                component="div"
                className="text-danger"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <Field type="password" name="password" className="form-control" />
              <ErrorMessage
                name="password"
                component="div"
                className="text-danger"
              />
            </div>

            {errors.general && (
              <div className="alert alert-danger">{errors.general}</div>
            )}

            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default LoginPage;
