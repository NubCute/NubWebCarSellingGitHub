import React from 'react'
import Data from '../Shared/Data'
import { Link } from 'react-router-dom'

function Category() {
  return (
    <div className='absolute top-[102%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[100.05%] h-[60%] bg-[#1d1207] flex flex-col items-center justify-center px-4 py-8 mt-40'>
        <h2 className='text-3xl absolute top-[10%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-[60px] font-bold text-center bg-[#1d1207] text-white p-5 px-40  font-[Gistesy] w-[120%] max-w-[1200px]'>
            Browse Your Favorite Type
        </h2>

        <div className='absolute top-[20%] grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-6 px-20 justify-between place-items-center'>
            {Data.Category.map((category, index) => (
                <Link to={'search/'+category.name}>
                    <div key={index} className='font-[Gistesy] text-white text-center w-full border border-white rounded-md p-3 items-center flex flex-col hover:shadow-md cursor-pointer'>
                        <h2>{category.name}</h2>
                    </div> 
                </Link>   
            ))}
        </div>
 
        
    </div>
  )
}

export default Category