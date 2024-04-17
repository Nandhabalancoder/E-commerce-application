import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { TextField, Button, Typography} from "@mui/material";
import { CenteredContainer } from "../Home/style/style";
import { fetchUserList, getUserList,getUserLogedIn,login,setUser,signup } from "../../redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

interface SignUpFormProps {
    page: "signup" | "login"; // Specify the possible values for the page prop
  }
  const SignUpForm: React.FC<SignUpFormProps> = ({ page }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(getUserLogedIn);

    useEffect(() => {
        dispatch(fetchUserList() as any);
      }, [dispatch]);
      const userList = useSelector(getUserList); 

      const handleLoginSubmit = async (
        values: { userId:string;username: string; password: string; admin: boolean },
        { setSubmitting, setFieldError, resetForm, setFieldValue }: FormikHelpers<any>
      ) => {
        try {
          const isUserExists = userList.some(
            (user: any) =>
              user.username === values.username && user.password === values.password
          );
          let isAdmin = false;
          if (isUserExists) {
            const matchingUser = userList.find(
              (user: any) =>
                user.username === values.username && user.password === values.password
            );
      
            if (matchingUser && matchingUser.admin === true) {
              isAdmin = true;
            }
            setFieldValue("admin", isAdmin);
            values.admin = isAdmin;
            values.userId=matchingUser.id
            await dispatch(login(values) as any);
            navigate("/");
            resetForm();
            alert("Login Successfully");
          } else {
            alert("Please check the credentials");
          }
        } catch (error: any) {
          console.error("Error:", error.message);
          setFieldError("form", "An error occurred. Please try again."); // Generic error message
        } finally {
          setSubmitting(false);
        }
      };
const handleSignUpSubmit = async (
    values: { username: string; password: string; admin: boolean },
    { setSubmitting, setFieldError, resetForm }: FormikHelpers<any>
  ) => {
    try {
 
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
    } catch (error: any) {
      console.error("Error:", error.message);
      setFieldError("form", "An error occurred. Please try again."); // Generic error message
    } finally {
      setSubmitting(false);
    }
  };
  const clearUserDataFromLocalStorage = () => {
    localStorage.removeItem('userData'); // Assuming 'userData' is the key used to store user data
  };
  const handleLogout = () => {
    // Dispatch the logout action
    dispatch(setUser(null));

    // Clear user data from local storage
    clearUserDataFromLocalStorage();

    // Optionally, navigate to the logout page or perform any other necessary actions
  };
  return (
    <CenteredContainer >
      {
        page==="login"?(   <>
        {user!==null?
        <Button variant="contained" onClick={handleLogout}  >Log Out</Button>
        :<>  <Typography variant="h5" component="h5">LOG IN</Typography>
        <Formik
          initialValues={{ username: "", password: "",admin:false ,userId:""}}
          validationSchema={validationSchema}
          onSubmit={handleLoginSubmit}
    
        >
          {({ isSubmitting }) => (
            <Form data-testid="signup-form">
              <div>
                <Typography>Username:</Typography>
                <Field
                  as={TextField}
                  type="text"
                  name="username"
                  variant="outlined"
                  fullWidth
                  data-testid="username-input"
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
                  data-testid="password-input"
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
                data-testid="logInButton"
              >
Log In
              </Button>
              <Typography><Link to={"/signup"}>Click to sign Up</Link></Typography>
              <ErrorMessage
                name="form"
                component="div"
                className="error-message"
              />
            </Form>
          )}
        </Formik></>
        
        }
      </> ):(<>
        <Typography variant="h5" component="h5">SIGNUP</Typography><Formik
        initialValues={{ username: "", password: "",admin:false }}
        validationSchema={validationSchema}
        onSubmit={handleSignUpSubmit}

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
                data-testid="username-input-singUp"
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
                data-testid="password-input-singUp"
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
              data-testid="signUpButton"
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
      </Formik></>   )
      }
    </CenteredContainer>
  );
};

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

export default SignUpForm;
