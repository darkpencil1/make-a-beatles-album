import React from 'react'
import {Routes, Route} from 'react-router'
import Navbar from './components/Navbar'
import AlbumMaker from './Pages/AlbumMaker'
import Albums from './Pages/Albums'
import Home from './Pages/Home'

export default function PageWrapper() {
    return (
        <div>
           <Navbar/>
           <Routes>
               <Route path="/" element={<Home/>} />
               <Route path="/maker" element={<AlbumMaker/>} />
               <Route path="/albums" element={<Albums/>} />
            </Routes> 
            
        </div>
    )
}
