import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './home'
import Contact from './contact'
import { ClerkProvider } from '@clerk/clerk-react'
import Profile from './profile'
import AddListing from './add-listing'
import BookATestDrive from './book-a-test-drive'
import { Toaster } from 'sonner'
import SearchByCategory from './search/[categoty]'
import SearchByOptions from './search'
import ListingDetail from './listing-detail/[id]'

const router=createBrowserRouter([
  {
    path:'/',
    element:<Home/>
  },

  {
    path:'/contact',
    element:<Contact/>
  },

  {
    path:'/profile',
    element:<Profile/>
  },

  {
    path:'/add-listing',
    element:<AddListing/>
  },

  {
    path:'/book-a-test-drive',
    element:<BookATestDrive/>
  },

  {
    path:'/search',
    element:<SearchByOptions/>
  },

  {
    path:'/search/:category',
    element:<SearchByCategory/>
  },

  {
    path:'listing-details/:id',
    element: <ListingDetail/>
  }

])


const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
    <RouterProvider router={router} />
    <Toaster />
    </ClerkProvider>
  </StrictMode>,
)
