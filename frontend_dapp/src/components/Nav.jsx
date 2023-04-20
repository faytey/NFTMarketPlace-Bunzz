
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import { useState } from "react";
import { SiSinglestore } from "react-icons/si";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineClose } from "react-icons/md";
import styles from "../styles/Nav.module.css"




const Nav = () => {

    let Anchors = [
        {name: "Home", address: "/"},
        {name: "Launch Pad", address: "/launchpad"},
        {name: "Marketplace", address: "/marketplace"},
        {name: "Profile", address: "/profile"},
        {name: "Admin", address: "/admin"},
    ];

    let [open, setOpen] = useState(false);
  return (
    <div className="shadow-md w-full fixed top-0 left-0 z-30">
      <div className="md:flex items-center justify-between bg-[#2B2B2B] py-4 md:px-10 px-7">
      <div className="font-bold text-2xl cursor-pointer flex items-center font-[Poppins] text-gray-300">
      <span className='text-3xl text-[#8900AE] mr-2 pt-2'>
      <SiSinglestore />
      </span>
      <div className="mt-2">NiFT</div>
      </div>

      <div onClick={()=>setOpen(!open)} className="text-3xl absolute right-8 top-6 cursor-pointer md:hidden">
        {open ? <MdOutlineClose/> : <HiMenuAlt3/>}
      </div>

      <ul className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static  md:z-auto z-[100] right-4  w-[70%] md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in-out ${open ? 'top-20 bg-[#2B2B2B] rounded-2xl shadow-lg' : 'top-[-490px]'}`}>
        {
          Anchors.map((anchor) => (
            <li key={anchor.name} className="md:ml-6 text-xl md:my-0 my-7 mb-[10px]">
              <Link href={anchor.address} className={`  hover:text-[#A259FF] duration-500 ease-in-out ${styles.trans}`} >{anchor.name}</Link>
            </li>
          ))
        }
        <div className="md:ml-6 md:my-0 my-7 mb-[10px]">
        <ConnectButton/>
        </div>
        
      </ul>
      </div>
    </div>
  )
}

export default Nav
