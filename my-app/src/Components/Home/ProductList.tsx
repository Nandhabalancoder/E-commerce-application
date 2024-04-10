import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, getProductList } from '../../redux/Slice';
import { Button, Card, CardContent, CardMedia, CircularProgress, Grid, } from '@mui/material';
import { ProductCardWrapper,ProductDescription, ProductTitle } from './style/style';


const ProductCard: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts() as any);
  }, [dispatch]);
  const products = useSelector(getProductList); 
  console.log(products)
    return (
      <ProductCardWrapper >
      <Grid container spacing={3}>
      {products?.length? products.map((product:any, index:any) => (
        <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
         <Card style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <CardMedia
              component="img"
              height="200"
              image={product.images[0]}
              alt={product.name}
            />
            <CardContent>
              <ProductTitle >{product.title}</ProductTitle>
              <ProductDescription variant="body1" >{product.description}</ProductDescription>
              <Grid container justifyContent="space-between" alignItems="center">
      <ProductTitle variant="body2">Price: ${product.price}</ProductTitle>
      <ProductTitle variant="body2">count:{product.stock}</ProductTitle>
    </Grid>
    <Grid item xs={12}> 
                <Button variant="contained" color="primary" fullWidth>
                  Add to Cart
                </Button>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      )):(
        <CircularProgress />
      )}

    </Grid>
    </ProductCardWrapper>
    );
};

export default ProductCard;