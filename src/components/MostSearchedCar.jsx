import React, { useEffect, useState } from 'react'
import FakeData from '../Shared/FakeData'
import CarItem from './CarItem';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { CarImages, CarListing } from '../../configs/schema';
import { desc, eq } from 'drizzle-orm';
import { db } from '../../configs'
import Service from '../Shared/Service';


function MostSearchedCar() {

const [carList, setCarList] = useState([]);   
useEffect(()=>{
    GetPopularCarList();
},[])

    const GetPopularCarList=async()=>{
        const result = await db
                    .select()
                    .from(CarListing) 
                    .leftJoin(
                        CarImages,
                        eq(CarListing.id, CarImages.carListingId)
                    )
                    .orderBy(desc(CarListing.id))
                    .limit(10)

                    const resp = Service.FormatResult(result)

                    console.log(resp);
                    setCarList(resp);
    }

    return (
        <div className='absolute top-[143%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[100.05%] h-[40%] bg-[#1d1207] flex flex-col items-center justify-center px-4 py-8 mt-40'>
            <h2 className='text-3xl absolute top-[-65%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-[60px] font-bold text-center bg-[#1d1207] text-white p-5 px-40 font-[Gistesy] w-[80%] max-w-[900px]'>
                Most Searched Cars
            </h2>

            <div className='absolute top-[-55%] w-full max-w-[1830px] h-[600px] flex items-center px-10 mx-auto overflow-hidden'>
                <Carousel className="w-full h-full relative">
                    <CarouselContent className="w-full h-full flex gap-6 justify-start items-center">
                        {carList.map((car, index) => (
                            <CarouselItem key={index} className="w-[300px] h-[450px] flex justify-center items-center basis-1/4">
                                <CarItem car={car} />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className= "absolute top-[220px] left-[-40px] !w-10 !h-10 bg-white/50 text-white rounded-full hover:bg-white/80 transition-all" />
                    <CarouselNext className= "absolute top-[220px] right-[-40px] !w-10 !h-10 bg-white/50 text-white rounded-full hover:bg-white/80 transition-all" />
                </Carousel>
            </div>


        </div>
    )
}

export default MostSearchedCar;
