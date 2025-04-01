import React, { useEffect, useState } from 'react'
import { IoIosCloseCircle } from "react-icons/io";
import { Button } from '../../components/ui/button';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from './../../../configs/firebaseConfig';
import { CarImages } from '../../../configs/schema';
import { db } from '../../../configs';
import { eq } from 'drizzle-orm';

function UploadImages({triggerUploadImages, carInfo, mode}) {


    const [selectedFileList, setSelectedFileList]= useState([]);
    const [EditCarImageList, setEditCarImageList]= useState([]);

    
    useEffect(()=>{
        if(mode=='edit')
        {
            setEditCarImageList([]);
            carInfo?.images.forEach((image)=>{
                setEditCarImageList(prev=>[...prev, image?.imageUrl])
            })
        }

    }, [carInfo])


    useEffect(()=>{
        console.log("triggerUploadImages:", triggerUploadImages);
        if(triggerUploadImages)
        {
            UploadImagesToServer();
        }
    },[triggerUploadImages])


    const onFileSelected=(event)=>{
        const files = event.target.files;
        console.log(files);
        
        for(let i=0;i<files?.length;i++){
            const file = files[i];
            setSelectedFileList((prev)=>[...prev,file]);
        }

    }

    const onImageRemove=(image,index)=>{
        const result = selectedFileList.filter((item)=>item!=image);
        setSelectedFileList(result);
        
    }

    const onImageRemoveFromDB=async(image,index)=>{
        const result = await db.delete(CarImages)
        .where(eq(CarImages.id, carInfo?.image[index]?.id)).returning({id:CarImages.id});
        
        const imageList=EditCarImageList.filter(item=>item!==image);
        setEditCarImageList(imageList);

    }



    const UploadImagesToServer=async()=>{
        
        await selectedFileList.forEach(async(file)=>{
                const fileName = Date.now() + 'jpeg';
                const storageRef = ref(storage, `Nub-WebCarSelling/` + fileName);
                const metaData = {contentType: 'image/jpeg'}

                await uploadBytes(storageRef, file, metaData).then((snapShot) => {
                    console.log('Uploaded file');
                }).then(resp=>{
                    getDownloadURL(storageRef).then(async(downloadUrl)=>{
                        console.log(downloadUrl);
                        await db.insert(CarImages).values({
                            imageUrl: downloadUrl,
                            carListingId: triggerUploadImages
                        })

                    })
            })
        })
        
    }
    

  return (
    <div>
        <h2 className='font-bold font-[Gistesy] text-2xl my-6'>Upload Car Image</h2>
        <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6'>
            
            {mode=='edit' &&
            EditCarImageList.map((image,index)=>(
                <div key={index}>
                    <IoIosCloseCircle className='absolute m-3 text-lg text-black cursor-pointer' 
                    onClick={()=>onImageRemoveFromDB(image, index)}/>
                    <img src={image} className='w-full h-[130px] object-cover rounded-xl'/>

                </div>

            ))}


            {selectedFileList.map((image,index)=>(
                <div key={index}>
                    <IoIosCloseCircle className='absolute m-3 text-lg text-black cursor-pointer' onClick={()=>onImageRemove(image, index)}/>
                    <img src={URL.createObjectURL(image)} className='w-full h-[130px] object-cover rounded-xl'/>

                </div>

            ))}
            
            <label htmlFor='upload-images'>
                <div className='border rounded-xl border-dotted border-black bg-white p-10 cursor-pointer hover:shadow-md'>
                    <h2 className='text-lg text-center'>+</h2>
                </div>
            </label>
            <input type="file" multiple={true} id='upload-images' onChange={onFileSelected} className='opacity-0'/>
        </div>
            {/* <Button onClick={UploadImages} style={{ marginTop: '30px' }}>Upload Images</Button> */}
    </div>
  )
}

export default UploadImages