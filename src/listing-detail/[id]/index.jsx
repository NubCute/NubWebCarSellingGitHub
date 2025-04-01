import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import DetailHeader from '../components/DetailHeader';
import { useParams } from 'react-router-dom';
import { CarImages, CarListing } from '../../../configs/schema';
import { eq } from 'drizzle-orm';
import Service from '../../Shared/Service';
import { db } from '../../../configs';
import ImageGallery from '../components/ImageGallery';
import Description from '../components/Description';
import Features from '../components/Features';
import Pricing from '../components/Pricing';
import Specification from '../components/Specification';

function ListingDetail() {

  const {id}=useParams();
  const [carDetail, setCarDetail] = useState();


  useEffect(()=>{
    GetCarDetail();
  }, [])
 

  const GetCarDetail=async()=>{
      const result = await db
      .select()
      .from(CarListing)
      .innerJoin(CarImages, eq(CarListing.id, CarImages.carListingId))
      .where(eq(CarListing.id, id));

      const resp = Service.FormatResult(result);

      setCarDetail(resp[0]);
  }

  return (
    <div className='bg-white h-[2000px]'>
      <Header/>
      
      <div className='absolute top-[25%] p-10 md:px-20'>

        {/* Header Detail Components */}
          <DetailHeader carDetail={carDetail}/>


      <div className='absolute top-[100%] grid grid-cols-1 md:grid-cols-3 w-[1780px] mt-10 gap-5'>

          {/* Left */}
          <div className='md:col-span-2 '>

            {/* Image Gallery */}
              <ImageGallery carDetail={carDetail}/>
            {/* Description */}
              <Description carDetail={carDetail}/>
            {/* Feature List */}
              <Features features={carDetail?.features}/>
          </div>

          {/* Right */}
          <div>
            
            {/* Pricing */}
              <Pricing carDetail={carDetail}/>
            {/* Car Specific*/}
              <Specification carDetail={carDetail}/>
            {/* Car Details */}

          </div>



      </div>

      </div>

    </div>
  )
}

export default ListingDetail