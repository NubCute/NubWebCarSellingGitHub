import React from 'react'
import { Button } from '../../components/ui/button'
import { BiSolidOffer } from "react-icons/bi";
import { Link } from 'react-router-dom';

function Pricing({ carDetail = {} }) {  // Đảm bảo carDetail không bị undefined
  return (
    <div className='p-10 rounded-xl border shadow-md absolute top-[0%] w-[550px] h-[270px] object-cover'>
      <div className='font-bold font-[Gistesy] text-2xl'>Price</div>
      <h2 className='font-bold font-[Gistesy] text-4xl'>{carDetail.sellingPrice || 'N/A'}</h2>
      
      <Link to={'https://www.facebook.com/Khai.Nub.2k3/'}>
        <Button className="w-full" size="lg"><BiSolidOffer className='text-lg mr-2'/>Make An Offer Price</Button>
      </Link>
    
    </div>
  )
}

export default Pricing;
