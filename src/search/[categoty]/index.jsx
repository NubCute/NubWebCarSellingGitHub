import React, { useEffect, useState } from 'react'
import Search from '../../components/Search'
import Header from '../../components/Header'
import { useParams } from 'react-router-dom';
import { CarImages, CarListing } from '../../../configs/schema';
import { eq } from 'drizzle-orm';
import { db } from '../../../configs';
import Service from '../../Shared/Service';
import CarItem from '../../components/CarItem';

function SearchByCategory() {

const {category} = useParams();
const [carList, setCarList] = useState([]);

useEffect(()=>{
    GetCarList();
}, [])


const GetCarList=async()=>{
    const result = await db
    .select()
    .from(CarListing)
    .innerJoin(CarImages, eq(CarListing.id, CarImages.carListingId))
    .where(eq(CarListing.category, category))

    const resp=Service.FormatResult(result);
    setCarList(resp);
}

  return (

    <div>
        <Header/>

        <div className=" absolute top-[20%] left-1/2 -translate-x-1/2 ">
            <Search/>
        </div>

        <div>
            <h2 className='text-4xl absolute top-[35%] left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-center text-black p-5 px-40  font-[Gistesy] w-[120%] max-w-[1200px]'>
             {category}   
            </h2>

            {/*List of CarList*/}
            <div className='absolute top-[65%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100%] h-[120%]} grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-50 p-2 bg-gray-50 rounded-lg justify-between gap-5'>
                {carList.map((item, index)=>(
                    <div key={index}>
                        <CarItem car={item}/>
                    </div>
                ))}
            </div>
        </div>

    </div>

    
  )
}

export default SearchByCategory