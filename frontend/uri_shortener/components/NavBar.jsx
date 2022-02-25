import Link from 'next/link';
import { toast } from 'react-toastify';

import { GiUnderwearShorts } from "react-icons/gi";
import { AiOutlineHome } from "react-icons/ai";
import { BsTable } from "react-icons/bs";
import { MdTry } from "react-icons/md";

import apiService from '../services/api';


const NavBar = () => {

  const checkHealth = () => {
    apiService.getApiHealthCheck()
    .then((response)=>{
      toast.success("LOCAL API IS CONNECTED :D")
    })
    .catch((error)=>{
      toast.warning("LOCAL API IS NOT CONNECTED D:")
    })
  }

  return (
    <>
      <nav className='flex items-center flex-wrap bg-sky-300 p-3'>
        <Link href='/'>
          <a className='inline-flex items-center p-2 mr-4'>
            <GiUnderwearShorts className='text-black text-3xl' />
            <span className='text-xl text-white font-bold tracking-wide ml-2'>
              Url Shortener
            </span>
          </a>
        </Link>
        <div className='hidden w-full lg:inline-flex lg:flex-grow lg:w-auto'>
          <div className='lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-start  flex flex-col lg:h-auto'>
            <Link href='/'>
              <a className='lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-purple-900 font-bold items-center justify-center hover:bg-[#a855f7] hover:text-white '>
                <AiOutlineHome className='text-[#9333ea] text-3xl mr-1 ' />
                <text>Home</text>
              </a>
            </Link>
            <Link href='/stats'>
              <a className='lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-purple-900 font-bold items-center justify-center hover:bg-[#a855f7] hover:text-white'>
                <BsTable className='text-[#9333ea] text-[1.6em] mr-1'/>
                <text>Statistic</text>
              </a>
            </Link>
              <button onClick={checkHealth} className='lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-purple-900 font-bold items-center justify-center hover:bg-[#a855f7] hover:text-white'>
                <MdTry className='text-[#9333ea] text-[1.7em] mr-1' />
                <text>Surpirse</text>
              </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;