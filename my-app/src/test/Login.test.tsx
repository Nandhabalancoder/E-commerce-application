import React from "react";
import { fireEvent, render, waitFor, } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import SignUpForm from "../Components/SignUp/SignUp";
import { Provider } from "react-redux";
import store from "../redux/store";
import fetchMock from 'jest-fetch-mock'; 

describe("Login component", () => {
  test('renders SignUpForm component with page prop set to "login"', () => {
    // Render the SignUpForm component
    const { getByTestId } = render(<BrowserRouter><Provider store={store}><SignUpForm page="login" /></Provider></BrowserRouter>);

    // Assert that the SignUpForm component is rendered
    const signUpForm = getByTestId("signup-form");
    expect(signUpForm).toBeInTheDocument();
  });
});


fetchMock.enableMocks();
interface User {
    id: string;
    username: string;
    password: string;
    admin: boolean;
  }

describe('handleLoginSubmit', () => {
    afterEach(() => {
      fetchMock.mockClear();
    });
  
    test('should login successfully when valid credentials are provided', async () => {
      // Mock userList data
      const userList = [
        { id: '1', username: 'testuser', password: 'password123', admin: true },
        { id: '2', username: 'anotheruser', password: 'anotherpassword', admin: false }
      ];
      fetchMock.mockResponseOnce(JSON.stringify(userList));
      const { getByTestId } = render(
        <BrowserRouter>
          <Provider store={store}>
            <SignUpForm page="login" />
          </Provider>
        </BrowserRouter>
      );
  
      // Simulate user input by filling out the form fields
      fireEvent.change(getByTestId('username-input').querySelector('input') as HTMLInputElement, { target: { value: 'testuser' } });
      fireEvent.change(getByTestId('password-input').querySelector('input') as HTMLInputElement, { target: { value: 'password123' } });
      fireEvent.submit(getByTestId('logInButton'));
    });
  
    test('should display error message when invalid credentials are provided', async () => {
      // Mock userList data
      const userList: User[] = [];
  
      // Mock fetchUserList action using jest-fetch-mock
      fetchMock.mockResponseOnce(JSON.stringify(userList));
  
      // Render the SignUpForm component
      const { getByTestId } = render(
        <BrowserRouter>
          <Provider store={store}>
            <SignUpForm page="login" />
          </Provider>
        </BrowserRouter>
      );
  
      // Simulate user input by filling out the form fields
      fireEvent.change(getByTestId('username-input').querySelector('input') as HTMLInputElement, { target: { value: 'invaliduser' } });
      fireEvent.change(getByTestId('password-input').querySelector('input') as HTMLInputElement, { target: { value: 'invalidpassword' } });
  
      // Simulate form submission
      fireEvent.submit(getByTestId('logInButton'));
    });
  });


  describe('handleSignUpSubmit', () => {
    test('should sign up successfully when valid credentials are provided', async () => {

        const navigateMock = jest.fn();
        jest.mock('react-router-dom', () => ({
          ...jest.requireActual('react-router-dom'),
          useNavigate: () => navigateMock,
        }));
      // Render the SignUpForm component
      const { getByTestId } = render(
        <BrowserRouter>
          <Provider store={store}>
            <SignUpForm page="signup" />
          </Provider>
        </BrowserRouter>
      );
  
      // Simulate user input by filling out the form fields
      fireEvent.change(getByTestId('username-input-singUp').querySelector('input') as HTMLInputElement, { target: { value: 'testuser' } });
      fireEvent.change(getByTestId('password-input-singUp').querySelector('input') as HTMLInputElement, { target: { value: 'password123' } });
  
      // Simulate form submission
      fireEvent.submit(getByTestId('signUpButton'));
    });
  });

//   describe('handleLogout', () => {
//     test('should log out the user and clear user data from local storage', () => {
//         const localStorageMock: Storage = {
//             length: 0,
//             clear: jest.fn(),
//             getItem: jest.fn(),
//             key: jest.fn(),
//             removeItem: jest.fn(),
//             setItem: jest.fn(),
//           };
//           // Set up global localStorage object
//           Object.defineProperty(window, 'localStorage', { value: localStorageMock });
      
//           // Mock a logged-in user
//           const mockUser = { name: 'testuser' };
//           // Update the Redux store state to include the user
//           store.getState().auth.user = mockUser;
//       // Render the component
//       const { getByText } = render(
//         <BrowserRouter>
//         <Provider store={store}>
//           <SignUpForm page="signup" />
//         </Provider>
//       </BrowserRouter>
//       );
  
//       // Click the "Log Out" button
//       fireEvent.click(getByText('Log Out'));
  
//       // Assert that the setUser action is dispatched with null
//       expect(store.dispatch).toHaveBeenCalledWith(setUser(null));
  
//       // Assert that user data is cleared from local storage
//       expect(localStorageMock.removeItem).toHaveBeenCalledWith('userData');
//     });
//   });

