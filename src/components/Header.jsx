import React from 'react'
import {SignOutButton, UserButton, useUser} from '@clerk/clerk-react'
import { Button } from './ui/button';
import { SignInButton } from '@clerk/clerk-react'
import { Link } from 'react-router-dom';


function Header() {
    const {user,isSignedIn}=useUser();
    
  return (
    
    <div style={{ position: "fixed", top: 0, left: 0, width: "100%", backgroundColor: "#1d1207", boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", padding: "20px", display: "flex", justifyContent: "space-between", alignItems: "center", zIndex: 50 }}>
        
        <div style={{ display: "flex", alignItems: "center" }}>
                <Link to={'/'}>
                    <img src='./src/assets/BMWLogo.png' width={150} height={100} alt="Car Logo" />
                </Link>

                <Link to={'/'}>
                    <h1 style={{ marginLeft: "-25px", marginTop:"-5px", fontFamily: "'Gistesy', cursive", color: "white" }}>
                        NubCarSelling
                    </h1>
                </Link>

        </div>

        
        <ul style={{ display: "flex", gap: "80px", listStyle: "none", margin: 0, padding: 0 }} className='hiden md: flex gap-16'>

            <Link to={'/'}>
                <li className='font-[Gistesy] front-medium text-xl hover:scale-105 transition-all cursor-pointer hover:text-primary  text-white '> Home </li>
            </Link>

            <Link to={'/search?condition=undefined&make=undefined&price=undefined'}>
                <li className='font-[Gistesy] front-medium text-xl hover:scale-105 transition-all cursor-pointer hover:text-primary  text-white '> Search </li>
            </Link>
            
            <Link to={'/book-a-test-drive'}>
                <li className='font-[Gistesy] front-medium text-xl hover:scale-105 transition-all cursor-pointer hover:text-primary  text-white '> Book A Test Drive </li>
            </Link>

            <Link to={'https://www.facebook.com/Khai.Nub.2k3/'}>
                <li className='font-[Gistesy] front-medium text-xl hover:scale-105 transition-all cursor-pointer hover:text-primary  text-white '> Contact </li>
            </Link>
        </ul>

        <SignInButton style={{ backgroundColor: "aqua", padding: "8px 12px", borderRadius: "5px", cursor: "pointer" }}>
                        Sign In
                    </SignInButton>
        
        {isSignedIn ? (
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <SignOutButton style={{ backgroundColor: "aqua", padding: "8px 12px", borderRadius: "5px", cursor: "pointer" }}>
                        Sign Out
                    </SignOutButton>

                    <UserButton />
                    <Link to={'/profile'}>
                        <Button>Submit Listing</Button>
                    </Link>
                </div>
            ) : (
                <Button>Submit Listing</Button>
            )}

    </div>
    
  )
}

export default Header