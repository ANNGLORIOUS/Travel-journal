import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const EntrySchema = Yup.object().shape({
  location: Yup.string().required("Location is required"),
  date: Yup.date().required("Date is required"),
  description: Yup.string().required("Description is required"),
});

function EntryForm({ initialValues, onSubmit }) {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={EntrySchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <div className="mb-3">
            <label htmlFor="location" className="form-label">
              Location
            </label>
            <Field type="text" name="location" className="form-control" />
            <ErrorMessage
              name="location"
              component="div"
              className="text-danger"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="date" className="form-label">
              Date
            </label>
            <Field type="date" name="date" className="form-control" />
            <ErrorMessage name="date" component="div" className="text-danger" />
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <Field
              as="textarea"
              name="description"
              className="form-control"
              rows="3"
            />
            <ErrorMessage
              name="description"
              component="div"
              className="text-danger"
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </Form>
      )}
    </Formik>
  );
}

export default EntryForm;
