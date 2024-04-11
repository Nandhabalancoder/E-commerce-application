import React from 'react';
import ProductCard from "./ProductList"
import Topbanner from './Topbanner';

function Home(){
    return(
        <div>
        <Topbanner/>
        <ProductCard page="home"/>
        </div>
    )
}
export default Home