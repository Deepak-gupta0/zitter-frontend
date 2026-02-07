import React from 'react'
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { Navbar, NavbarItem } from "@heroui/navbar";

const MainNavbar = () => {
  return (
    <nav className='w-full inline-flex'>
      <div className='hover:bg-gray-600/20 py-3 w-1/2 text-center cursor-pointer '><span>For you</span></div>
      <div className='hover:bg-gray-600/20 py-3 w-1/2 text-center cursor-pointer'><span>Following</span></div>
    </nav>
  )
}

export default MainNavbar