import React, { useEffect, useMemo } from 'react'
import { deleteProductFromCart, fetchCart, getCart } from '../../redux/Slice';
import { useDispatch, useSelector } from 'react-redux';
import { getUserLogedIn } from '../../redux/authSlice';
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface Props {}

function Cart(props: Props) {
    const dispatch = useDispatch();
    const user=useSelector(getUserLogedIn)
    useEffect(() => {
        dispatch(fetchCart() as any);
      }, [dispatch]);
      const cartList = useSelector(getCart);
      const userCartList = useMemo(() => {
        if (!cartList || !user) return [];
        return cartList.filter((item:any) => item.userId === user.userId);
      }, [cartList, user]);
      const handleDeleteProductFromCart = async (productId: any) => {
        try {
          const response = await dispatch(deleteProductFromCart(productId) as any);
          if (response?.meta?.requestStatus === "fulfilled") {
            alert("product deleted successfully");
          } else {
            alert("try again");
          }
        } catch (error) {
          console.error("Error deleting product:", error);
        }
      };      
    return (
        <TableContainer component={Paper} style={{marginTop:100}}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userCartList?.map((item:any) => (
              <TableRow key={item.id}>
                <TableCell>{item.title}</TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell>
                  <IconButton onClick={()=>handleDeleteProductFromCart(item?.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
        
    )
}

export default Cart
