import React from "react";
import { Formik, Form, Field, ErrorMessage, FormikValues } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { TextField, Button, Typography} from "@mui/material";
import { CenteredContainer } from "../Home/style/style";

const SignUpForm: React.FC = () => {

  const handleSubmit = async (
    values: FormikValues,
    { setSubmitting, setFieldError }: any
  ) => {
    try {
      const response = await axios.post("http://localhost:3001/user", values);
      console.log(response.data); // Response from the server
      setSubmitting(false);
      setFieldError("form", null);
    } catch (error: any) {
      console.error("Sign-up failed:", error.message);
      setSubmitting(false);
      setFieldError("form", "Sign-up failed. Please try again.");
    }
  };

  return (
    <CenteredContainer>
      <h2>Sign Up</h2>
      <Formik
        initialValues={{ username: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <Typography>Username:</Typography>
              <Field
                as={TextField}
                type="text"
                name="username"
                variant="outlined"
                fullWidth
              />
              <ErrorMessage
                name="username"
                render={(errorMessage) => (
                    <Typography style={{ color: "red" }}>
                      {errorMessage}
                    </Typography>
                  )}
              />
            </div>
            <div>
              <Typography>Password:</Typography>
              <Field
                as={TextField}
                type="password"
                name="password"
                variant="outlined"
                fullWidth
              />
              <ErrorMessage
                name="password"
                render={(errorMessage) => (
                  <Typography style={{ color: "red" }}>
                    {errorMessage}
                  </Typography>
                )}
              />
            </div>
            <Button
              type="submit"
              disabled={isSubmitting}
              variant="contained"
              color="primary"
              fullWidth
              style={{marginTop:10}}
            >
              Sign Up
            </Button>
            <ErrorMessage
              name="form"
              component="div"
              className="error-message"
            />
          </Form>
        )}
      </Formik>
    </CenteredContainer>
  );
};

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

export default SignUpForm;
