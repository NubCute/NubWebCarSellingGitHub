import React from 'react'
import IconField from '../../add-listing/components/IconField';
import CarSpecification from '../../Shared/CarSpecification';

function Specification({ carDetail }) {
    if (!carDetail) {
        return <div className="p-10">No car details available.</div>;
    }

    return (
        <div className='p-10 rounded-xl border shadow-md absolute top-[40%] w-[550px] h-[720px] object-cover'>
            <h2 className='font-bold font-[Gistesy] text-3xl'>Specification</h2>
            {CarSpecification.map((item, index) => (
                <div key={index} className='mt-5 flex items-center justify-between'>
                    <h2 className='flex gap-3'><IconField icon={item.icon} /> {item.label}</h2>
                    <h2>{carDetail[item.name] ?? 'N/A'}</h2>
                </div>
            ))}


            {/* {carDetail?.lenght>0&&carDetail.map((carItem, index)=>(
                            <div className='font-bold font-[Gistesy] text-2xl'>
                                <IconField icon={CarSpecification[index]?.icon}/>
                            </div>

                        ))} */}
        </div>




    );
}


export default Specification

