import React, { useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useHistory, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { login } from "../utils/auth";
import "../App.css";

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
    <div className="login-container">
      <div className="login-form-container">
        <div className="login-form-wrapper">
          <h1 className="text-center mb-4">Welcome Back</h1>
          <p className="text-center text-muted mb-4">
            Please log in to your account
          </p>

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
                  <Field
                    type="text"
                    name="username"
                    className="form-control"
                    placeholder="Enter your username"
                  />
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
                  <Field
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Enter your password"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-danger"
                  />
                </div>

                <div className="mb-3 d-flex justify-content-between align-items-center">
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="remember"
                    />
                    <label className="form-check-label" htmlFor="remember">
                      Remember me
                    </label>
                  </div>
                  <Link
                    to="/reset-password"
                    className="text-primary text-decoration-none"
                  >
                    Forgot Password?
                  </Link>
                </div>

                {errors.general && (
                  <div className="alert alert-danger">{errors.general}</div>
                )}

                <button
                  type="submit"
                  className="btn btn-primary w-100 mb-3"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Logging in..." : "Login"}
                </button>

                <p className="text-center mb-0">
                  Don't have an account?{" "}
                  <Link
                    to="/register"
                    className="text-primary text-decoration-none"
                  >
                    Sign up
                  </Link>
                </p>
              </Form>
            )}
          </Formik>
        </div>
      </div>

      <div className="login-image-container">
        <img
          src="https://img.freepik.com/free-photo/travel-concept-with-baggage_23-2149153260.jpg?semt=ais_hybrid"
          alt="Login illustration"
          className="login-image"
        />
      </div>
    </div>
  );
}

export default LoginPage;