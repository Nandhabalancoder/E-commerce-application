import React from 'react'
import { useSelector } from 'react-redux'
import { getUserLogedIn } from '../../redux/authSlice'
import ProductCard from '../Home/ProductList'

interface Props {}

function Admin(props: Props) {
    const user=useSelector(getUserLogedIn)

 

    return (
        <div>
            {
                user && user.admin===true?<ProductCard page="admin" />:"this page is only for admin use"
            }
      
        </div>
        
    )
}

export default Admin
