import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
import {useContext} from 'react';
import Context, {contextData} from './Context';

function Content() {


  return (
    // <div>Content</div>
    <>
    
    <Navbar />
    {/* <contextData.Provider value={}> */}
    
    <Outlet />
    



    {/* </contextData.Provider> */}
    </>
  )
}

export default Content