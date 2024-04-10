import React, { useMemo } from 'react'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useSelector } from 'react-redux';
import { getProductList } from '../../redux/Slice';
import { CircularProgress, Container } from '@mui/material';

function Topbanner() {
    const products = useSelector(getProductList); 
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true, 
        autoplaySpeed: 3000,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      };

      const bannerImages = useMemo(() => {
        if (products?.length > 0) {
          return products[0].images;
        }
        return [];
      }, [products]); 
  

    return (
        <Container style={{ marginTop: 10, maxHeight: 300 }}>
        <Slider {...settings}>
          {bannerImages?.length>0 ? (
            bannerImages.map((item:string, index:number) => (
              <div key={index} style={{  maxHeight: 300 }} >
                <img src={item} alt="banner" style={{ width: '100%',maxHeight:"300px" }} />
              </div>
            ))
          ) : (
            <CircularProgress />
          )}
        </Slider>
      </Container>
    
        
    )
}

export default Topbanner
