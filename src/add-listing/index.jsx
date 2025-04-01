import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import carDetails from './../Shared/carDetails.json';
import InputField from './components/InputField';
import DropdownField from './components/DropdownField';
import TextAreaField from './components/TextAreaField';
import { Separator } from "@/components/ui/separator"
import features from './../Shared/features.json'
import { Button } from '../components/ui/button';
import Footer from '../components/Footer'
import { db } from '../../configs';
import { CarImages, CarListing } from '../../configs/schema';
import IconField from './components/IconField';
import UploadImages from './components/UploadImages';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';
import moment from 'moment';
import { useUser } from '@clerk/clerk-react'
import { eq } from 'drizzle-orm';
import Service from '../Shared/Service';
import { Checkbox } from '../components/ui/checkbox';

function AddListing() {

    const [formData, setFormData] = useState([]);
    const [featuresData, setFeaturesData] = useState([]);
    const [triggerUploadImages, setTriggerUploadImages] = useState();
    const [searchParams] = useSearchParams();
    const [carInfo, setCarInfo] = useState();
    const navigate=useNavigate();
    const {user}=useUser();
    const mode= searchParams.get('mode');
    const recordId= searchParams.get('id');

    useEffect (()=>{
        if(mode=='edit')
        {
            GetListingDetail();
        }

    },[]);

    const GetListingDetail=async()=>{
        const result=await db
        .select()
        .from(CarListing)
        .innerJoin(CarImages,
            eq(CarListing.id, CarImages.carListingId)
        )
        .where(eq(CarListing.id, recordId));

        const resp= Service.FormatResult(result)
        setCarInfo(resp[0])
        setFeaturesData(resp[0].features);
        setFormData(resp[0]);

    }

    /**
     * Used to capture user input
     * @param {*} name 
     * @param {*} value 
     */


    useEffect(() => {
        console.log("Updated formData:", formData);
      }, [formData]);
      


      const handleInputChange = (name, value) => {
        console.log(`Field ${name}: `, value); 
            setFormData((prevData) => ({
                ...prevData,
                [name]: value
            }))

            console.log(formData);
        }
    

    /**
     * Used to save selected future List
     * @param {*} name 
     * @param {*} value 
     */
    
    const handleFeatureChange = (name, value)=>{
        setFeaturesData((prevData)=>({
            ...prevData,
            [name]: value
        }))

        console.log(featuresData)

    }


    const onSubmit=async(e)=>{
        e.preventDefault();
        toast('Please Wait A Second');

        if (!formData.listingdescription) {
            formData.listingdescription = "No description provided";
        }
        
        console.log(formData);

        if(mode=='edit')
        {
            const result = await db.update(CarListing).set({
                ...formData,
                features:featuresData,
                createdBy: user?.primaryEmailAddress?.emailAddress,
                userName:user?.fullName,
                userImageUrl:user?.imageUrl,
                postedOn: moment().format('DD/MM/yyyy') 
            }).where(eq(CarListing.id, recordId)).returning({id:CarListing.id}); 
            console.log(result);
            navigate('/profile');
        }
        else{
            try{
            const result=await db.insert(CarListing).values({
                
                ...formData,
                features:featuresData,
                createdBy: user?.primaryEmailAddress?.emailAddress,
                userName:user?.fullName,
                userImageUrl:user?.imageUrl,
                postedOn: moment().format('DD/MM/yyyy')
            },
        ).returning({id:CarListing.id});

                if(result){
                    console.log("Data Saved");
                    setTriggerUploadImages(result[0]?.id);
                    
                    navigate('/profile');
                }

            }catch(e){
                console.log("Error",e);
            }

        }   
    }


  return (
    <div>
        <Header/>

        <div className='absolute top-[8%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[100.05%] h-[20%] bg-[#1d1207] flex flex-col items-center justify-center px-4 py-8 mt-40'>
            <h2 className='text-4xl absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-center text-white p-5 px-40 font-[Gistesy] w-[120%] max-w-[1200px]'>
                My New Listing
            </h2>
        </div>

        <form className='absolute top-[175%] left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-center text-[#1d1207] p-10 px-40 font-[Gistesy] h-[300%] max-h-[2800px] w-[100.05%] max-w-[2000px] bg-white'>
            
            {/* Car Details */}
            <h2 className='text-2xl font-bold text-[#1d1207] mb-5 mt-[-10px]'>
                Car Details
            </h2>
            
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                {carDetails.CarDetails.map((item, index) => (
                    <div key={index} className='flex flex-col'>

                        <label className='text-sm font-semibold mb-1'>
                            <IconField icon={item?.icon}/>
                        {item?.label} {item.required&&<span className='text-red-500'>*</span>} </label>
                        {item.fieldType == 'text'|| item.fieldType == 'number' ? 
                        <InputField item={item} handleInputChange={handleInputChange} carInfo = {carInfo}/> 
                        :item.fieldType == 'dropdown'? <DropdownField item={item} handleInputChange={handleInputChange} carInfo = {carInfo}/>
                        :item.fieldType == 'textarea'? <TextAreaField item={item} handleInputChange={handleInputChange} carInfo = {carInfo}/>
                        : null}
                    </div>
                ))}
            </div>

            <Separator className="my-6" />
            {/* Future List */}
            <div>
                <h2 className='font-bold font-[Gistesy] text-2xl my-6'>Features</h2>
            
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                    {features.features.map((item,index)=>(
                        <div key={index}>
                            <Checkbox onCheckedChange={(value)=>handleInputChange(item.name,value)} 
                            className="w-6 h-6 rounded-full border-black text-white bg-white focus:ring-primary"
                                checked={featuresData?.[item.name]}    
                            />

                            <h2 className="text-sm font-semibold">{item.label}</h2>
                        </div>
                    ))}
                </div>

            </div>

            <Separator className="my-6" />        
            {/* Car Img */}
            <UploadImages triggerUploadImages={triggerUploadImages} 
            carInfo={carInfo}
            mode={mode}
            />


            
            <div className='mt-10 flex justify-end'>
                <Button type="button" onClick={(e) => onSubmit(e)}>
                    Submit
                </Button>
            </div>
            
            
                    
        </form>
        
        <Footer/>

    </div>
  )
}

export default AddListing;
