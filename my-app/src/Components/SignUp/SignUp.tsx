import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { TextField, Button, Typography} from "@mui/material";
import { CenteredContainer } from "../Home/style/style";
import { fetchUserList, getUserList,getUserLogedIn,login,signup } from "../../redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

interface SignUpFormProps {
    page: "signup" | "login"; // Specify the possible values for the page prop
  }
  const SignUpForm: React.FC<SignUpFormProps> = ({ page }) => {
    const dispatch = useDispatch();
    const user=useSelector(getUserLogedIn)
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchUserList() as any);
      }, [dispatch]);
      const userList = useSelector(getUserList); 
 
const handleSubmit = async (
    values: { username: string; password: string; admin: boolean },
    { setSubmitting, setFieldError, resetForm }: FormikHelpers<any>
  ) => {
    try {
      if (page === "signup") {
        const isUserNameExists = userList.some(
          (user: any) => user.username === values.username
        );
        const isUserExists = userList.some(
          (user: any) =>
            user.username === values.username && user.password === values.password
        );
        if (isUserExists) {
          alert("Already have an account");
        } else if (isUserNameExists) {
          alert("This username is already used");
        } else {
          await dispatch(signup(values) as any);
          resetForm();
          alert("Sign up successful!");
          navigate("/login")
        }
      } else {
        const isUserExists = userList.some(
          (user: any) =>
            user.username === values.username && user.password === values.password
        ); 
        const isUserAdmin = userList.some(
            (user: any) =>
              user.admin === true
          ); 
        if (isUserExists) {
            if(isUserAdmin){
                values.admin=true
            }
            await dispatch(login(values) as any);
          navigate("/")
          resetForm();
          alert("Login Successfully");   
        } else {
          alert("Please check the credentials");
        }
      }
    } catch (error: any) {
      console.error("Error:", error.message);
      setFieldError("form", "An error occurred. Please try again."); // Generic error message
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <CenteredContainer>
      <h2>{page==="login"?"Log In":"Sign Up"}</h2>
      <Formik
        initialValues={{ username: "", password: "",admin:false }}
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
         {page==="login"?"Log In":"Sign Up"}
            </Button>
            <ErrorMessage
              name="form"
              component="div"
              className="error-message"
            />
          </Form>
        )}
      </Formik>
      {
        page==="login"?(<Typography><Link to={"/signup"}>Click to sign Up</Link></Typography>):""
      }
    </CenteredContainer>
  );
};

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

export default SignUpForm;
