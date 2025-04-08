import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'

const Home = () => {
  return (
    <div>
      <CategoryList/>
      <BannerProduct/>

      <VerticalCardProduct category={"trousers"} heading={"Top's Trousers"} />
      <VerticalCardProduct category={"shirts"} heading={"Popular's Shirts"} />

      <VerticalCardProduct category={"tops"} heading={"Stylish Tops"} />
      <VerticalCardProduct category={"dresses"} heading={"Latest Dresses"} />
      <VerticalCardProduct category={"jackets"} heading={"Trending Jackets"} />
      <VerticalCardProduct category={"tshirts"} heading={"T shirts"} /> 
      <VerticalCardProduct category={"hats"} heading={"Fashionable Hats"} />
      {/* <VerticalCardProduct category={"accessories"} heading={"Accessories & More"} /> */}
      {/* <VerticalCardProduct category={"jeans"} heading={"Classic Jeans"} /> */}
      {/* <VerticalCardProduct category={"shorts"} heading={"Summer Shorts"} /> */}
      {/* <VerticalCardProduct category={"blazers"} heading={"Elegant Blazers"} /> */}
    </div>
  )
}

export default Home
