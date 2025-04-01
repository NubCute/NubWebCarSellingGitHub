import React from 'react'
import { SlCalender } from "react-icons/sl";
import { IoMdSpeedometer } from "react-icons/io";
import { GiGearStickPattern } from "react-icons/gi";
import { LuFuel } from "react-icons/lu";


function DetailHeader({carDetail}) {
  return (
    <div>
      {carDetail?.listingTitle ?
        <div>
        <h2 className='absolute top-[-65%] font-bold font-[Gistesy] text-3xl w-[200%]'> 
          {carDetail?.listingTitle}
        </h2>
        <p className='absolute top-[-20%] text-sm'>
          {carDetail?.tagline}
        </p>


        <div className='flex gap-2'>

          <div className='absolute top-[20%] flex gap-2 items-center bg-[#a76728] rounded-full w-[60%] h-[60%] p-2 px-3'>
            <SlCalender className='h-5 w-5 text-black text-sm'/>
            <h2>{carDetail?.year}</h2>
          </div>
          <div className='absolute top-[20%] right-[-80%] flex gap-2 items-center bg-[#a76728] rounded-full w-[65%] h-[60%] p-2 px-3'>
            <IoMdSpeedometer className='h-5 w-5 text-black text-sm'/>
            <h2>{carDetail?.mileage}</h2>
          </div>
          <div className='absolute top-[20%] right-[-165%] flex gap-2 items-center bg-[#a76728] rounded-full w-[80%] h-[60%] p-2 px-3'>
            <GiGearStickPattern className='h-5 w-5 text-black text-sm'/>
            <h2>{carDetail?.transmission}</h2>
          </div>

          <div className='absolute top-[20%] right-[-235%] flex gap-2 items-center bg-[#a76728] rounded-full w-[65%] h-[60%] p-2 px-3'>
            <LuFuel className='h-5 w-5 text-black text-sm'/>
            <h2>{carDetail?.fuelType}</h2>
          </div>

        </div>
      </div>:
      <div className='absolute top-[100%] rounded-xl h-[640px] w-[1000px] bg-slate-600 animate-pulse'>


      </div>}


    </div>
    
  )
}

export default DetailHeader