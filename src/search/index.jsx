import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { db } from '../../configs';
import { CarImages, CarListing } from '../../configs/schema';
import { eq, lte } from 'drizzle-orm';
import Service from '../Shared/Service';
import Header from '../components/Header';
import Search from '../components/Search';
import CarItem from '../components/CarItem';


function SearchByOptions() {

const [searchParam]=useSearchParams();
const [carList, setCarList] = useState([]);

const condition=searchParam.get('cars');
const make=searchParam.get('make');
// const price=searchParam.get('price');



useEffect(()=>{
    GetCarList();
}, [])

const GetCarList=async()=>{
    const result = await db
    .select()
    .from(CarListing)
    .innerJoin(CarImages, eq(CarListing.id, CarImages.carListingId))
    .where (condition!=undefined && eq(CarListing.condition, condition))
    .where (make!=undefined && eq(CarListing.make, make))
    // .where (price !== undefined ? lte(CarListing.sellingPrice, price) : undefined);

    const resp = Service.FormatResult(result);
    console.log(resp);
    setCarList(resp)

}


  return (
    <div>
        <Header/>

        <div className=" absolute top-[20%] left-1/2 -translate-x-1/2 ">
            <Search/>
        </div>

        <div>
            <h2 className='text-4xl absolute top-[33%] left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-center text-black p-5 px-40  font-[Gistesy] w-[120%] max-w-[1200px]'>
             Search Result  
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

export default SearchByOptions