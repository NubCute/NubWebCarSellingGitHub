import React from 'react'

function InfoSection() {
  return (
    
        <section className='absolute top-[200%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[100.05%] h-[90%] bg-[#1d1207] flex flex-col items-center justify-center px-4 py-8 mt-40 md:col-span-3 flex justify-center'>
            <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-4 md:items-center md:gap-8">
                <div className="md:col-span-1">
                    <div className="max-w-lg md:max-w-none">
                    <h2 className="text-2xl font-semibold text-white sm:text-3xl">
                        Buy Your Dream Car
                    </h2>

                    <p className="mt-4 text-[#a76728]">
                        Find your self with the best car in the world. We are here to help you find your dream car.
                    </p>
                    </div>
                </div>

                <div className="md:col-span-3">
                    <img
                    src="https://www.bmwhaiphong.vn/wp-content/uploads/sites/26/2019/05/1-7.png"
                    className="w-full h-[600px] object-cover rounded"
                    alt=""
                    />
                </div>
                </div>
            </div>
        </section>

  )
}

export default InfoSection