import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  fetchProducts,
  getProductList,
} from "../../redux/Slice";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Grid,
} from "@mui/material";
import {
  ProductCardWrapper,
  ProductDescription,
  ProductTitle,
} from "./style/style";
import { getUserLogedIn } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
interface ProductCardProps {
  page: "home" | "admin"; // Specify the possible values for the page prop
}

const ProductCard: React.FC<ProductCardProps> = ({ page }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchProducts() as any);
  }, [dispatch]);
  const products = useSelector(getProductList);
  const user = useSelector(getUserLogedIn);


  const handleClick = () => {
    if (user === null) {
      alert("Login to continue");
      navigate("/login");
    } else {
    }
  };
  const handleDeleteProduct = async (productId: any) => {
    try {
      const response = await dispatch(deleteProduct(productId) as any);
      if (response?.meta?.requestStatus === "fulfilled") {
        alert("product deleted successfully");
      }else{
        alert("try again"); 
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };
  return (
    <ProductCardWrapper>
      <Grid container spacing={3}>
        {products?.length ? (
          products.map((product: any, index: any) => (
            <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
              <Card
                style={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={product.images[0]}
                  alt={product.name}
                />
                <CardContent>
                  <ProductTitle>{product.title}</ProductTitle>
                  <ProductDescription variant="body1">
                    {product.description}
                  </ProductDescription>
                  <Grid
                    container
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <ProductTitle variant="body2">
                      Price: ${product.price}
                    </ProductTitle>
                    <ProductTitle variant="body2">
                      count:{product.stock}
                    </ProductTitle>
                  </Grid>
                  {page === "admin" ? (
                    <>
                      {" "}
                      <Grid item xs={12}>
                        <Button
                          variant="contained"
                          color="primary"
                          fullWidth
                          onClick={handleClick}
                        >
                          Add to Cart
                        </Button>
                      </Grid>
                      <Grid item xs={12} pt={1}>
                        <Button
                          variant="contained"
                          color="error"
                          fullWidth
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          delete
                        </Button>
                      </Grid>
                      <Grid item xs={12} pt={1}>
                        <Button
                          variant="contained"
                          color="warning"
                          fullWidth
                          onClick={handleClick}
                        >
                          Edit
                        </Button>
                      </Grid>
                    </>
                  ) : (
                    <Grid item xs={12}>
                      <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={handleClick}
                      >
                        Add to Cart
                      </Button>
                    </Grid>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <CircularProgress />
        )}
      </Grid>
    </ProductCardWrapper>
  );
};

export default ProductCard;
