'use client'

import Image from "next/image";
interface AvatarProps{
    ImageUser?:string | null | undefined
}
const Avatar:React.FC<AvatarProps> = ({
    ImageUser
}) => {
    
    return ( 
        <Image className="rounded-full" height={30} width={30} alt="Avatar" src={ImageUser || '/images/placeholder.jpg'} />
    );
}
 
export default Avatar;