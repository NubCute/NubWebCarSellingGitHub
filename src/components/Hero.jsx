import React from 'react'
import Search from './Search'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

function Hero() {
  return (
    <div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[100.05%] h-[80%] bg-[#1d1207] flex flex-col items-center justify-center px-4 py-8">
        <img src='./src/assets/BMWHomeLogo.png' alt="Car Logo" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "1750px", height: "auto" }} />
        <h2 className='text-5xl absolute top-[25%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-[60px] font-bold text-center bg-[#1d1207] text-white p-5 px-40 rounded-lg font-[Gistesy] w-[80%] max-w-[1000px]'>
        Fast And Furious
        </h2>

          <div className=" absolute top-[33%] left-1/2 -translate-x-1/2 ">
            <Search/>
          </div>


        </div>
    </div>
  )
}

export default Hero