'use client'

import { AiOutlineMenu } from 'react-icons/ai'
import Avatar from './Avatar';
import { useCallback, useState } from 'react';
import MenuItems from './MenuItems';


import { User } from '@prisma/client';
import { signOut } from 'next-auth/react';
import useRentModal from '@/app/hooks/useRentModal';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';
import { useRouter } from 'next/navigation';

interface UserMenuProps {
    currentUser?:User | null
}


const UserMenu:React.FC<UserMenuProps> = ({
    currentUser
}) => {


    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const rentModal = useRentModal();
    const router = useRouter();

    const onRent =useCallback(()=>{
        if(!currentUser){
            return loginModal.onOpen();
        }

        rentModal.onOpen();
    },[currentUser,loginModal])

    const [isOpen,setIsOpen] =useState(false)
    const toggleOpen =useCallback(() =>{
        setIsOpen((value) => !value)
    },[])

    return ( 
        <div className="relative">
            <div className="flex flex-row items-center gap-3">
                <div onClick={onRent} 
                className=" hidden md:block text-sm font-semibold p-3 rounded-full bg-neutral-50 hover:bg-neutral-100 transition cursor-pointer">
                    Book your home
                </div>
                <div className="md:px-2 md:py-1 p-3 border-[1px]  border-neutral-300 flex flex-row items-center rounded-full  cursor-pointer transition 
                 hover:shadow-md gap-3" 
                onClick={toggleOpen}>
                    <AiOutlineMenu />
                    <div className='hidden md:block '>
                        <Avatar ImageUser={currentUser?.image}/>
                    </div>
                </div>
            </div>

        {isOpen && (

        <div className='absolute rounded-xl shadow-md w-[30vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm '>
            {currentUser ? 
            <>
            <MenuItems label='Trips' onClick={() => {setIsOpen(false);router.push('/trips')}}/>
            <MenuItems label='Favorites' onClick={() => {setIsOpen(false);router.push('/favorites')}}/>
            <MenuItems label='Reservations' onClick={() => {setIsOpen(false);router.push('/reservations')}}/>
            <MenuItems label='Properties' onClick={() => {setIsOpen(false);router.push('/properties')}}/>
            
            <MenuItems label='Book your Home' onClick={onRent}/>
            <hr/>
            <MenuItems label='Logout' onClick={signOut}/>
            </>          
            : 
                    <>
                    <MenuItems label='Login' onClick={()=>{setIsOpen(false);loginModal.onOpen()}}/>
                    <MenuItems label='Signup' onClick={()=>{setIsOpen(false);registerModal.onOpen}}/>
                    </>
            }
            

            
        </div>)
        
        }
        </div>
     );
}
 
export default UserMenu
