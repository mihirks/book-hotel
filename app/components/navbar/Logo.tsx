'use client'

import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {

    const router =useRouter();

    return ( 
        <Image 
        alt="Logo"
        className="
        
        cursor-pointer
        "
        height="40"
        width="45"
        src="/images/landscape.png"
        onClick={()=> router.push('/')}
        />

    );
}
 
export default Logo;