import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, } from "@/components/ui/carousel"
import { Separator } from "@/components/ui/separator"
import { LuFuel } from "react-icons/lu";
import FakeData from '../Shared/FakeData'
import { IoMdSpeedometer } from "react-icons/io";
import { BsGear } from "react-icons/bs";
import { MdOpenInNew } from "react-icons/md";
import { Link } from 'react-router-dom';

function CarItem({car}) {

  return (
    <Link to={'/listing-details/'+car?.id}>

    <div className='rounded-xl bg-white border hover:shadow-md cursor-pointer'>
        <h2 className='absolute m-2 bg-green-500 px-2 rounded-full text-sm pb-1 text-[#1d1207]'>New</h2>
        {car?.images?.[0]?.imageUrl ? (
          <img 
            src={car.images[0].imageUrl} 
            width={600} 
            height={250}
            className='rounded-xl'
          />
        ) : (
          <div 
            style={{ width: 400, height: 250 }} 
            className="h-[180px] rounded-xl bg-gray-200 flex items-center justify-center"
          >
            <span style={{ width: 400, height: 250 }}  className="text-gray-500">Không có hình ảnh</span>
          </div>
        )}
        <div>
            <h2 className='font-[Gistesy] text-black text-lg mb-2'>{car?.listingTitle}</h2>
            <Separator/>
            <div className='grid grid-cols-3 mt-5'>

                <div className='flex flex-col items-center'>
                <LuFuel size={24} color= "#1d1207" />
                <h2 className='text-[#1d1207]'>{car?.mileage} Miles</h2>
                </div>

                <div className='flex flex-col items-center'>
                <IoMdSpeedometer size={24} color= "#1d1207" />
                <h2 className='text-[#1d1207]'>{car?.fuelType}</h2>
                </div>

                <div className='flex flex-col items-center'>
                <BsGear size={24} color= "#1d1207" />
                <h2 className='text-[#1d1207]'>{car?.transmission}</h2>
                </div>

            </div>
            
            <Separator className='my-2'/>
            <div className='flex items-center justify-between'>
                <h2 className='font-[Gistesy] text-[#1d1207] text-xl mb-2'> ${car?.sellingPrice}</h2>
                <h2 className='text-[#1d1207] text-sm flex gap-2 items-center'>
                    <MdOpenInNew size={24} color= "#1d1207"/>
                    View Details</h2>
            </div>


        </div>



    </div>

    </Link>
  
  )
}

export default CarItem