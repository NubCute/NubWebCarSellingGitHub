import React, { useState } from 'react'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator"
import { FaSearch } from 'react-icons/fa';
import Data from '../Shared/Data';
import { Link } from 'react-router-dom';

function Search() {

  const  [condition, setCondition]=useState();
  const  [make, setMake]=useState();
  const  [price, setPrice]=useState();

  return (
    <div className=" p-3 px-4  bg-[#1d1207] rounded-md md:rounded-full flex-col md:flex md:flex-row gap-10 items-center w-[100%] flex flex-wrap ">

    {/* Select 1 */}
    <Select onValueChange ={(value)=>setCondition(value)} >
    <SelectTrigger className="w-[190px]  text-white text-sm">
        <SelectValue placeholder="Cars" />
    </SelectTrigger>
    <SelectContent className="z-50">
        <SelectItem value="New">New</SelectItem>
        <SelectItem value="Used">Used</SelectItem>
        <SelectItem value="Certified Pre-Owned">Certified Pre-Owned</SelectItem>
    </SelectContent>
    </Select>

    <Separator orientation="vertical" className="hidden md:block"/>

    {/* Select 2 */}
    <Select onValueChange ={(value)=>setMake(value)}>
    <SelectTrigger className="w-[190px]  text-white text-sm">
        <SelectValue placeholder="CarMakes"/>
    </SelectTrigger>
    <SelectContent className="z-50">
        
        {Data.CarMakes.map((maker,index)=>(<SelectItem value={maker.name}>{maker.name}</SelectItem>))}

    </SelectContent>
    </Select>

    <Separator orientation="vertical" className="hidden md:block"/>

    {/* Select 3 */}
    {/* <Select onValueChange ={(value)=>setPrice(value)}>
    <SelectTrigger className="w-[190px]  text-white text-sm">
        <SelectValue placeholder="Prices"/>
    </SelectTrigger>
    <SelectContent className="z-50">

        {Data.Pricing.map((price,index)=>(<SelectItem value={price.amount}>{price.amount}</SelectItem>))}

    </SelectContent>
    </Select>
     */}

        <Link to={'/search?condition='+condition+"&make="+make+"&price="+price} className='rounded-full p-2 bg-white hover:scale-105 transition-all cursor-pointer'>
                <FaSearch size={24} color="black" />
        </Link>

    </div>
  )
}

export default Search