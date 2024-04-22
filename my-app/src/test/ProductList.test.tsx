import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../redux/store";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import ProductCard from "../Components/Home/ProductList";
import { Container } from "@mui/material";

describe('ProductCard Component', () => {
  test('should render product cards', () => {

    const { getByTestId } = render( 
      <BrowserRouter>
        <Provider store={store}>
          <ProductCard page="admin" />
        </Provider>
      </BrowserRouter>
    );
  });
});



describe('admin page', () => {
  test('should render "Add product" button when page is "admin"', () => {
    // Render the component with page set to "admin"
    const { getByText } = render(
      <BrowserRouter>
        <Provider store={store}>
        <ProductCard page="admin" />
        </Provider>
      </BrowserRouter>
    );

    // Check if the "Add product" button is rendered
    const addButton = getByText('Add product');
    expect(addButton).toBeInTheDocument();
  });

  test('should not render "Add product" button when page is not "admin"', () => {
    // Render the component with page set to something other than "admin"
    const { queryByText } = render(
      <BrowserRouter>
        <Provider store={store}>
        <ProductCard page="home" />
        </Provider>
      </BrowserRouter>
    );

    // Check if the "Add product" button is not rendered
    const addButton = queryByText('Add product');
    expect(addButton).toBeNull();
  });

  test('should call handleOpenAddPopup when "Add product" button is clicked', () => {
    // Mock handleOpenAddPopup function
    const handleOpenAddPopup = jest.fn();
  
    // Render the component with page set to "admin" and mock handleOpenAddPopup
    const { getByTestId } = render(
      <BrowserRouter>
        <Provider store={store}>
          <ProductCard page="admin" />
        </Provider>
      </BrowserRouter>
    );
  
    // Click the "Add product" button using its test ID
    const addButton = getByTestId('add-product-button');
    fireEvent.click(addButton);
  
  });



  test('should call handleDeleteProduct when "Delete" button is clicked', async () => {
    // Mock the deleteProduct action creator
    const handleDeleteProduct = jest.fn();
  
    // Render the component
    const { queryAllByTestId } = render(
      <BrowserRouter>
        <Provider store={store}>
          <ProductCard page="admin" />
        </Provider>
      </BrowserRouter>
    );
  
    // Wait for the element to appear in the DOM
    await waitFor(() => queryAllByTestId('delete-product-button'));
  
    // Get the delete buttons
    const deleteButtons = queryAllByTestId('delete-product-button');
  
    // Loop through the buttons and click each one
    deleteButtons.forEach(button => {
      fireEvent.click(button);
    });
  
    // Assert that handleDeleteProduct is called
    expect(handleDeleteProduct).toHaveBeenCalledTimes(deleteButtons.length);
  });

  test('should call handleEditProduct when "Edit" button is clicked', async () => {
    const handleEditProduct = jest.fn();
  
    // Render the component
    const { queryAllByTestId } = render(
      <BrowserRouter>
        <Provider store={store}>
          <ProductCard page="admin" />
        </Provider>
      </BrowserRouter>
    );
  
    await waitFor(() => queryAllByTestId('edit-product-button'));
    const editButtons = queryAllByTestId('edit-product-button');
    editButtons.forEach(button => {
      fireEvent.click(button);
    });
  
    expect(handleEditProduct).toHaveBeenCalledTimes(editButtons.length);
  });

  test('should call handleAddProductToCart when "add product to cart" button is clicked', async () => {

    const handleAddProductToCart = jest.fn();
    const { queryAllByTestId } = render(
      <BrowserRouter>
        <Provider store={store}>
          <ProductCard page="admin" />
        </Provider>
      </BrowserRouter>
    );
  
    await waitFor(() => queryAllByTestId('add-to-cart-button'));
    const editButtons = queryAllByTestId('add-to-cart-button');
    editButtons.forEach(button => {
      fireEvent.click(button);
    });
    expect(handleAddProductToCart).toHaveBeenCalledTimes(editButtons.length);
  });
});