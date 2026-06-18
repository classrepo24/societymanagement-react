import React from 'react'
import { Route,Routes } from 'react-router-dom'
import { Dashboard } from './../pages/dashboard/Dashboard.jsx';

export const AllRoutes = () => {
  return (
    <div>
<Routes>

<Route path='/' element={<Dashboard/>}/>
<Route path='/Dashboard' element={<Dashboard/>}/>
</Routes>





    </div>
  )
}
