import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addProductToCart,
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
import EditProductPopup from "../ProductEdit/ProductEdit";

interface ProductCardProps {
  page: "home" | "admin"; 
}

const ProductCard: React.FC<ProductCardProps> = ({ page }) => {
  const [popUp, setPopUp] = useState(false);
  const [addProductPopupOpen, setAddProductPopupOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null); // State to store the details of the clicked product
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
      } else {
        alert("try again");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleOpenEditPopup = (product: any) => {
    setSelectedProduct(product);
    setPopUp(true);
  };
  const handleOpenAddPopup = () => {
    setAddProductPopupOpen(true);
  };

  const handleCloseAddPopup = () => {
    setAddProductPopupOpen(false);
  };
  const handleCloseEditPopup = () => {
    setPopUp(false);
  };

  const handleAddProductToCart = async (
    userId: string,
    productId: string,
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
      if (user === null) {
        alert("Login to continue");
        navigate("/login");
        return
      } 
      const response = await dispatch(
        addProductToCart({
          userId,
          productId,
          title,
          description,
          price,
          discountPercentage,
          rating,
          stock,
          brand,
          category,
          thumbnail,
          images
        }) as any
      );
      console.log(response);
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product. Please try again later.");
    }
  };
  return (
    <ProductCardWrapper>
      {page === "admin" ? (
        <Grid container justifyContent="flex-end">
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpenAddPopup}
          >
            Add product
          </Button>
        </Grid>
      ) : (
        ""
      )}

      <EditProductPopup
        open={addProductPopupOpen}
        handleClose={handleCloseAddPopup}
        productId={null}
        title=""
        description=""
        price={0}
        discountPercentage={0}
        rating={0}
        stock={0}
        brand=""
        category=""
        thumbnail=""
        images={[]}
        page="addproduct"
      />

      <Grid container spacing={3} paddingTop={3}>
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
                  image={product.images?.[0] || ""}
                  alt={product?.name}
                />
                <CardContent>
                  <ProductTitle>{product.title || ""}</ProductTitle>
                  <ProductDescription variant="body1">
                    {product?.description || ""}
                  </ProductDescription>
                  <Grid
                    container
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <ProductTitle variant="body2">
                      Price: ${product?.price}
                    </ProductTitle>
                    <ProductTitle variant="body2">
                      count:{product?.stock || ""}
                    </ProductTitle>
                  </Grid>
                  {page === "admin" ? (
                    <>
                      <Grid item xs={12}>
                        <Button
                          variant="contained"
                          color="primary"
                          fullWidth
                          onClick={() => {handleAddProductToCart(user?.userId,
                            product?.id,
                            product?.title,
                            product?.description,
                            product?.price,
                            product?.discountPercentage,
                            product?.rating,
                            product?.stock,
                            product?.brand,
                            product?.category,
                            product?.thumbnail,
                            product?.images);}}
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
                          onClick={() => handleOpenEditPopup(product)} // Pass the clicked product to handleOpenEditPopup
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
                        onClick={() => {handleAddProductToCart(user?.userId,
                          product?.id,
                          product?.title,
                          product?.description,
                          product?.price,
                          product?.discountPercentage,
                          product?.rating,
                          product?.stock,
                          product?.brand,
                          product?.category,
                          product?.thumbnail,
                          product?.images);}}
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

      {/* Render the EditProductPopup only when a product is selected */}
      {selectedProduct && popUp && (
        <EditProductPopup
          open={popUp}
          handleClose={handleCloseEditPopup}
          productId={selectedProduct?.id}
          title={selectedProduct?.title}
          description={selectedProduct?.description}
          price={selectedProduct?.price}
          discountPercentage={selectedProduct?.discountPercentage}
          rating={selectedProduct?.rating}
          stock={selectedProduct?.stock}
          brand={selectedProduct?.brand}
          category={selectedProduct?.category}
          thumbnail={selectedProduct?.thumbnail}
          images={selectedProduct?.images}
          page="edit"
        />
      )}
    </ProductCardWrapper>
  );
};

export default ProductCard;
