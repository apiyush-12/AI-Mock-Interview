"use client"
import React, {useEffect} from 'react'
import Image from 'next/image'
import { UserButton } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'

function Header() {
  const path=usePathname();
  useEffect(()=>{
    console.log(path);
  },[])

  return (
    <div className='flex p-2 items-center justify-between bg-secondary shadow-sm'>
      <Image src = {'/logo.svg'} width={40} height={40} alt='Logo'/>
      <ul className='hidden md:flex gap-6'>
        <li className={`hover:text-primary text-blue-700 hover:font-bold transition-all cursor-pointer ${path === '/dashboard' && 'text-primary font-bold'}`}>Dashboard</li>
        <li className={`hover:text-primary text-blue-700 hover:font-bold transition-all cursor-pointer ${path === '/questions' && 'text-primary font-bold'}`}>Questions</li>
        <li className={`hover:text-primary text-blue-700 hover:font-bold transition-all cursor-pointer ${path === '/upgrade' && 'text-primary font-bold'}`}>Upgrade</li>
        <li className={`hover:text-primary text-blue-700 hover:font-bold transition-all cursor-pointer ${path === '/how-it-works' && 'text-primary font-bold'}`}>How it Works ?</li>
      </ul>
      <UserButton/>
    </div>
  )
}

export default Header
