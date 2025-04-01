import React from 'react'
import Header from '../components/Header'
import MyListing from './components/MyListing'
import { Link } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


function Profile() {
  return (
    <div>
        <Header/>

        <div class name='px-10 md:px-20 my-10'>
        <MyListing/>
        {/* <Tabs defaultValue="account" className="w-full" >
        <TabsList className="absolute top-[60%] w-full flex justify-start">
            <TabsTrigger value="abc">My Listing</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
        </TabsList>
        <TabsContent value="my-listing" className='mt-40'>
            <MyListing/></TabsContent>
        <TabsContent value="profile">Change your password here.</TabsContent>
        </Tabs> */}

        </div>
    </div>
  )
}

export default Profile