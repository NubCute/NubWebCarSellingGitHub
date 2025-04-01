import React from 'react'

function ImageGallery({carDetail}) {
  return (
    <div>   
        
        <img src={carDetail?.images[0].imageUrl} 
        className=' w-[1200px] h-[800px] rounded-xl object-cover '/>
    </div>
  )
}

export default ImageGallery