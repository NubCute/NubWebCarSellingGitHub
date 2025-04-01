import React from 'react'
import { RiCheckboxCircleFill } from "react-icons/ri";

function Features({ features}) {  // Gán giá trị mặc định là một đối tượng rỗng

    if (!features || typeof features !== 'object') {
        return <div>No Features</div>;  // Hiển thị thông báo khi features không hợp lệ
    }

    console.log(features);
    return (
        <div>
            <div className='p-5 bg-white rounded-xl border shadow-md absolute top-[135%] w-[1180px] h-[270px] object-cover'>
                <h2 className='font-bold font-[Gistesy] text-3xl'>Features</h2>
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3'>
                    {Object.entries(features).map(([features, value]) => (
                        <div className='flex gap-2 items-start'>
                            <RiCheckboxCircleFill className='h-5 w-5 text-primary text-sm' />
                            <h2>{features} </h2>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Features;
