import React from 'react'
import { HomeCompany } from '../components/home_company'

const Home = () => {
  console.log("------------------------ coordonner -----------------",navigator.geolocation.getCurrentPosition((position)=>{console.log(position.coords)}));
  return (
    <>
      <HomeCompany />
      {/* <HomeRestaurant/> */}
      <div className='h-10'>
       
      </div>
    </>
  )
}

export default Home