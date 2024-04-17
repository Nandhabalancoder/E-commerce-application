import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { addProduct, editProduct } from "../../redux/Slice";

interface EditProductPopupProps {
  open: boolean;
  handleClose: () => void;
  productId: any;
  title: string; 
  description: string; 
  price: number; 
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: any;
  page:string;
}

const EditProductPopup: React.FC<EditProductPopupProps> = ({
  open,
  handleClose,
  productId,
  title: initialTitle,
  description: initialDescription,
  price: initialPrice,
  discountPercentage: initialDiscountPercentage,
  rating: initialRating,
  stock: initialStock,
  brand: initialBrand,
  category: initialCategory,
  thumbnail: initialThumbnail,
  images: initialImages,
  page
}) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [price, setPrice] = useState(initialPrice);
  const [discountPercentage, setDiscountPercentage] = useState(
    initialDiscountPercentage
  );
  const [rating, setRating] = useState(initialRating);
  const [stock, setStock] = useState(initialStock);
  const [brand, setBrand] = useState(initialBrand);
  const [category, setCategory] = useState(initialCategory);
  const [thumbnail, setThumbnail] = useState(initialThumbnail);
  const [images, setImages] = useState(initialImages);
  useEffect(() => {
    setTitle(initialTitle);
    setDescription(initialDescription);
    setPrice(initialPrice);
    setDiscountPercentage(initialDiscountPercentage);
    setRating(initialRating);
    setStock(initialStock);
    setBrand(initialBrand);
    setCategory(initialCategory);
    setThumbnail(initialThumbnail);
    setImages(initialImages);
  }, [
    productId,
    initialTitle,
    initialDescription,
    initialPrice,
    initialDiscountPercentage,
    initialRating,
    initialStock,
    initialBrand,
    initialCategory,
    initialThumbnail,
    initialImages,
  ]);
  const handleEditProduct = async (
    productId: number,
    title: string,
    description: string,
    price: number,
    discountPercentage: number,
    rating: number,
    stock: number,
    brand: string,
    category: string,
    thumbnail: string,
    images: any[]
  ) => {
    try {
      const response = await dispatch(
        editProduct({
          id: productId,
          title,
          description,
          price,
          discountPercentage,
          rating,
          stock,
          brand,
          category,
          thumbnail,
          images,
        }) as any
      );
      // if (response?.meta?.requestStatus === "fulfilled") {
      //   alert("Product edited successfully");
      //   handleClose();
      // } else {
      //   alert("Try again");
      // }
      console.log(response);
    } catch (error) {
      console.error("Error editing product:", error);
      alert("Failed to edit product. Please try again later.");
    }
  };

  const handleAddProduct = async ( title: string,
    description: string,
    price: number,
    discountPercentage: number,
    rating: number,
    stock: number,
    brand: string,
    category: string,
    thumbnail: string,
    images: any[]) => {
    try {
      const response = await dispatch(
        addProduct({
          title,
          description,
          price,
          discountPercentage,
          rating,
          stock,
          brand,
          category,
          thumbnail,
          images,
        }) as any
      );
      if (response?.meta.requestStatus === "fulfilled") {
        alert("Product added successfully");
        handleClose();
      } else {
        alert("product adding field");
      }
      console.log(response);
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product. Please try again later.");
    }
  };
  
  const handleInputChange = (event:any) => {
    const paths = event.target.value.split(",").map((path:any) => path.trim().replace(/"/g, ''));
    setImages(paths);
  };
  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
    <DialogTitle>     {page ==="addproduct"?"Add Product":"Edit Product"}</DialogTitle>
    <DialogContent >
      <TextField
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        style={{ marginBottom: '1rem',marginTop:"1rem" }} 
      />
      <TextField
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        style={{ marginBottom: '1rem' }} 
        
      />
      <TextField
        label="Price"
        type="number"
        value={price}
        onChange={(e) => setPrice(Number(e.target.value))}
        fullWidth
        style={{ marginBottom: '1rem' }} 
        inputProps={{ min: "0", step: "1" }}
      />
      {/* Additional input fields for other product data */}
      <TextField
        label="Discount Percentage"
        type="number"
        value={discountPercentage}
        onChange={(e) => setDiscountPercentage(Number(e.target.value))}
        fullWidth
        style={{ marginBottom: '1rem' }} 
        inputProps={{ min: "0", step: "1" }}
      />
      <TextField
        label="Rating"
        type="number"
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
        fullWidth
        style={{ marginBottom: '1rem' }} 
        inputProps={{ min: "0", step: "1" }}
      />
      <TextField
        label="Stock"
        type="number"
        value={stock}
        onChange={(e) => setStock(Number(e.target.value))}
        fullWidth
        style={{ marginBottom: '1rem' }} 
        inputProps={{ min: "0", step: "1" }}
      />
      <TextField
        label="Brand"
        value={brand}
        onChange={(e) => setBrand(e.target.value)}
        fullWidth
        style={{ marginBottom: '1rem' }} 
      />
      <TextField
        label="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        fullWidth
        style={{ marginBottom: '1rem' }} 
      />
      {/* Example for handling array input */}
     {page ==="addproduct"?
        // <input
        //   type="file"
        //   accept="image/*"
        //   onChange={handleImageChange}
        //   multiple
        // />:""
        <TextField
        type="text"
        placeholder="Enter comma-separated file paths"
        onChange={handleInputChange}
        fullWidth
        style={{ marginBottom: '1rem' }} 
        value={images}
      />:""
     } 
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose}>Cancel</Button>
      <Button 
  onClick={page === "addproduct" 
    ? () => handleAddProduct(title, description, price, discountPercentage, rating, stock, brand, category, thumbnail, images) 
    : () => handleEditProduct(productId, title, description, price, discountPercentage, rating, stock, brand, category, thumbnail, images)}>
  Save
</Button>
    </DialogActions>
  </Dialog>
  );
};

export default EditProductPopup;
