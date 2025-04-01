import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { CarImages, CarListing } from '../../../configs/schema'
import { db } from '../../../configs'
import { eq, desc } from 'drizzle-orm'
import { useUser } from '@clerk/clerk-react'
import Service from '../../Shared/Service'
import CarItem from '../../components/CarItem'
import { FaTrash } from "react-icons/fa";
import { FaWrench } from "react-icons/fa";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"

function MyListing() {

    const {user}=useUser();
    const [carList, setCarList] = useState([]);

    useEffect(()=>{
        user&&GetUserCarListing();
    }, [user])

    const GetUserCarListing = async () => {
        
            const result = await db
            .select()
            .from(CarListing) 
            .leftJoin(
                CarImages,
                eq(CarListing.id, CarImages.carListingId)
            )
            .where(eq(CarListing.createdBy, user?.primaryEmailAddress?.emailAddress))
            .orderBy(desc(CarListing.id));

            const resp = Service.FormatResult(result)
            console.log(resp);
            setCarList(resp);
    };

    const handleDelete = async (id) => {
        try {
            console.log("Deleting item with id:", id);
    
            // Xóa các hình ảnh liên quan trong bảng CarImages
            await db.delete(CarImages).where(eq(CarImages.carListingId, id));
            console.log(`Deleted related images for listing with id: ${id}`);
    
            // Xóa sản phẩm trong bảng CarListing
            await db.delete(CarListing).where(eq(CarListing.id, id));
            console.log(`Deleted listing with id: ${id}`);
    
            // Cập nhật danh sách hiển thị
            setCarList((prevList) => prevList.filter((item) => item.id !== id));
        } catch (error) {
            console.error("Error deleting listing:", error);
        }
    };

  return (
    <div className='mt-10'>

        <div className='absolute top-[13%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[100.05%] h-[30%] bg-[#1d1207] flex flex-col items-center justify-center px-4 py-8 mt-40'>
            <h2 className='text-4xl absolute top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-center text-white p-5 px-40  font-[Gistesy] w-[120%] max-w-[1200px]'>
                My Listing
            </h2>

            <Link to={'/add-listing'}>
                <Button className=' absolute top-[55%] right-20 text-center bg-[#a76728] text-white font-bold font-[Gistesy] '>+ Add New Listing</Button>
            </Link>
        </div>

        <div className='absolute top-[100%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[99.9%] h-[120%] px-4 py-4 mt-20 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 bg-white'>
            {carList.map((item, index)=>(
                <div key = {index}  >
                    <CarItem car={item}/>

                    <div className='p-2 bg-gray-50 rounded-lg flex justify-between gap-3'>
                        <Link to = {'/add-listing?mode=edit&id='+item?.id} className='w-full'>
                            <Button variant ="outline" className="w-full" > <FaWrench /> Edit</Button>
                        </Link>

                        {/* AlertDialog for Delete */}
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="destructive"> <FaTrash /> Delete </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. This will permanently delete the listing.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => handleDelete(item.id)}>Delete</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>

                    </div>    

                </div>
            ))}
            
        </div>

        

    </div>

  )
}

export default MyListing