import React from "react";
import { fireEvent, render, waitFor, } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import SignUpForm from "../Components/SignUp/SignUp";
import { Provider } from "react-redux";
import store from "../redux/store";
import fetchMock from 'jest-fetch-mock'; 
import { setUser } from '../redux/authSlice';
import { act } from "react-dom/test-utils";

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

// Define a custom text matcher function
const findByTextContent = (container: Node, text: RegExp): Node | undefined => {
  for (const node of Array.from(container.childNodes)) {
    if (node.nodeType === Node.TEXT_NODE && text.test(node.textContent || '')) {
      return node;
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      const foundNode = findByTextContent(node, text);
      if (foundNode !== undefined) {
        return foundNode;
      }
    }
  }
  // Return undefined if no matching node is found
  return undefined;
};
describe('handleLoginSubmit', () => {
  afterEach(() => {
    fetchMock.mockClear();
  });

  test('should login successfully when valid credentials are provided', async () => {
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
    await act(async () => {
      // Simulate user input by filling out the form fields
      fireEvent.change(getByTestId('username-input').querySelector('input') as HTMLInputElement, { target: { value: 'testuser' } });
      fireEvent.change(getByTestId('password-input').querySelector('input') as HTMLInputElement, { target: { value: 'password123' } });
      fireEvent.submit(getByTestId('logInButton'));


    });;
  });

  test('should display error message when invalid credentials are provided', async () => {
    const userList: User[] = [];
    fetchMock.mockResponseOnce(JSON.stringify(userList));
    const { getByTestId } = render(
      <BrowserRouter>
        <Provider store={store}>
          <SignUpForm page="login" />
        </Provider>
      </BrowserRouter>
    );

    await act(async () => {
      // Simulate user input by filling out the form fields
      fireEvent.change(getByTestId('username-input').querySelector('input') as HTMLInputElement, { target: { value: 'invaliduser' } });
      fireEvent.change(getByTestId('password-input').querySelector('input') as HTMLInputElement, { target: { value: 'invalidpassword' } });

      // Simulate form submission
      fireEvent.submit(getByTestId('logInButton'));
    });

    await waitFor(() => {
      expect(getByTestId('logInButton')).not.toBeDisabled();
    });
  });
  
});


  describe('handleSignUpSubmit', () => {
    test('should sign up successfully when valid credentials are provided', async () => {

        const navigateMock = jest.fn();
        jest.mock('react-router-dom', () => ({
          ...jest.requireActual('react-router-dom'),
          useNavigate: () => navigateMock,
        }));
      const { getByTestId } = render(
        <BrowserRouter>
          <Provider store={store}>
            <SignUpForm page="signup" />
          </Provider>
        </BrowserRouter>
      );
      await act(async () => { 
      fireEvent.change(getByTestId('username-input-singUp').querySelector('input') as HTMLInputElement, { target: { value: 'testuser' } });
      fireEvent.change(getByTestId('password-input-singUp').querySelector('input') as HTMLInputElement, { target: { value: 'password123' } });
      fireEvent.submit(getByTestId('signUpButton'));
    });
    });
  });


  describe('handleLogout', () => {
    test('should log out the user and clear user data from local storage', async () => {
      const localStorageMock: Storage = {
        length: 0,
        clear: jest.fn(),
        getItem: jest.fn(),
        key: jest.fn(),
        removeItem: jest.fn(),
        setItem: jest.fn(),
      };
  

      Object.defineProperty(window, 'localStorage', { value: localStorageMock });
      const mockUser = {
        id: '1',
        username: 'testuser',
        password: 'password123',
        admin: true,
        userId: 'a1b2c3'
      };
      const { getByTestId, queryByTestId } = render(
        <BrowserRouter>
          <Provider store={store}>
            <SignUpForm page="login" />
          </Provider>
        </BrowserRouter>
      );
      await waitFor(() => {
        const logoutButton = queryByTestId('logout-button');
        if (logoutButton) {
          fireEvent.click(logoutButton);
        }
      });
    });
  });