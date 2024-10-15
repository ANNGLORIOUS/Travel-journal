import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { resetPassword } from "../utils/auth";

const ResetPasswordSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
});

function ResetPasswordPage() {
  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
    try {
      await resetPassword(values.email);
      setStatus({
        success: "Password reset email sent. Please check your inbox.",
      });
    } catch (error) {
      setStatus({ error: "Failed to send reset email. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h1>Reset Password</h1>
      <Formik
        initialValues={{ email: "" }}
        validationSchema={ResetPasswordSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, status }) => (
          <Form>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <Field type="email" name="email" className="form-control" />
              <ErrorMessage
                name="email"
                component="div"
                className="text-danger"
              />
            </div>

            {status && status.success && (
              <div className="alert alert-success">{status.success}</div>
            )}
            {status && status.error && (
              <div className="alert alert-danger">{status.error}</div>
            )}

            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Reset Password"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default ResetPasswordPage;
