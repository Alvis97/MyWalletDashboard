"use client"

import { IoIosArrowDown } from "react-icons/io";
import React, { useState } from 'react'
import { useNetwork } from './networkContext';
import { GoDotFill } from "react-icons/go";

function NetworkSelector() {
    const [open, setOpen]=useState(false);
    const { selectedNetwork, setSelectedNetwork } = useNetwork()
  return (
       <div className='content-center mx-4'>
        <button
            className='btn-base'
            onClick={()=> setOpen(!open)}
        >
        <GoDotFill className="fill-[var(--orange)]"/>    
        {selectedNetwork}
        <IoIosArrowDown size={"15px"} className={`transition-transform duration-200 ${open ? '-rotate-180' : ''}`}/>
        </button>

    { open && (
    <div 
    className='absolute flex flex-col mt-1 w-[95px]'
    >
        <button
            className='btn-base'
            onClick={()=> {
                setSelectedNetwork(
                    selectedNetwork === "Mainnet" ? "Devnet" : "Mainnet")  
                setOpen(false)
            }}>
            {selectedNetwork === "Mainnet" ? "Devnet" : "Mainnet"}
        </button>
    </div>
    )}
    </div>
  )
}

export default NetworkSelector