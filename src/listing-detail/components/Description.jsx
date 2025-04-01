import React from 'react'

function Description({carDetail}) {
  return (
    <div>
            {carDetail?.listingdescription? <div className='absolute top-[105%] p-5 rounded-xl text-black bg-white shadow-md w-[1180px] h-[200px] object-cover'>
                <h2 className='font-bold font-[Gistesy] text-3xl'>Description</h2>
                <p>{carDetail?.listingdescription}</p>
            </div>:
            <div className='absolute top-[120%] rounded-xl h-[200px] w-[1200px] bg-slate-600 animate-pulse'>  

            </div>} 
    </div>

  )
}

export default Description