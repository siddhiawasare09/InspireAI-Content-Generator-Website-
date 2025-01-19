"use client"
import React, { useState } from 'react'
import SideNav from './_components/SideNav';
import Header from './_components/Header';
import { totalUsageContext } from '../(context)/TotalUsageContext';
import { UpdateCreditUsageContext } from '../(context)/UpdateCreditUsageContext';

function layout({ children,
}: Readonly<{
  children: React.ReactNode;
}>)  {

  const [totalUsage,setTotalUsage]=useState<Number>(0);
  const [updateCreditUsage,setUpdateCreditUsage]=useState<any>()

  return (
    <totalUsageContext.Provider value={{totalUsage,setTotalUsage}}>
      <UpdateCreditUsageContext.Provider value={{updateCreditUsage,setUpdateCreditUsage}}>
    <div className='bg-slate-200'>
        <div className='md:w-64 hidden md:block fixed'>
            <SideNav/>
        </div>
        <div className='md:ml-64'>
          <Header/>
           {children}
        </div>
    </div>
    </UpdateCreditUsageContext.Provider>
    </totalUsageContext.Provider>
  )
}

export default layout