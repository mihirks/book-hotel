'use client'

import { User } from "@prisma/client";
import Container from "../Container";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import Categories from "./Categories";

interface NavbarProps{
    currentUser?: User | null
}

const Navbar:React.FC<NavbarProps> = ({
    currentUser
}) => {
    // console.log(currentUser)
    return ( <div className="sticky w-full bg-white shadow-sm top-0 z-10">
        <div className="py-3
        border-b-[1px]
        ">
            <Container>
                <div className="
                flex
                flex-row
                justify-between
                items-center
                gap-3
                md:gap-0
                ">
                    <Logo />
                    <Search />
                    <UserMenu currentUser={currentUser}/>
                </div>
                
            </Container>
            <Categories />

        </div>
    </div>);
}
 
export default Navbar;