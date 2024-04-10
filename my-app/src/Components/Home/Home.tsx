import React from 'react';
import ProductCard from "./ProductList"
import Topbanner from './Topbanner';

function Home(){
    return(
        <div>
        <Topbanner/>
        <ProductCard/>
        </div>
    )
}
export default Home