import React from 'react'
import {Routes, Route} from 'react-router'

import { Path } from 'react-router'
import Navbar from './components/Navbar'

//Pages
import AlbumMaker from './Pages/AlbumMaker'
import Albums from './Pages/Albums'
import Home from './Pages/Home'


let url:string = ""
//Assign server url based on development mode
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    url = ""

} else {
   url = window.location.pathname
}
console.log("window:", window.location.pathname)
export default function PageWrapper() {
    return (
        <div>
           <Navbar/>
           <Routes>
               <Route path={url.concat("/")} element={<Home/>} />
               <Route path={url.concat("maker")} element={<AlbumMaker/>} />
               <Route path={url.concat("albums")} element={<Albums/>} />
            </Routes> 
            
        </div>
    )
}
