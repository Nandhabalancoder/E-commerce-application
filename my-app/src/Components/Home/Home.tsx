import React from 'react';
import ProductCard from "./ProductList"
import Topbanner from './Topbanner';
import Footer from '../Footer/Footer';


function Home(){
    return(
        <div>
        <Topbanner/>
        <ProductCard page="home"/>
<Footer/>
        </div>
    )
}
export default Home