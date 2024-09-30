'use client'

import Heading from "@/app/components/Heading";
import HeartButton from "@/app/components/HeartButton";
import useCountries from "@/app/hooks/useCountries";
import { User } from "@prisma/client";
import Image from "next/image";

interface ListingHeadProps {
    title:string ,
    imageScr:string,
    locationValue:string,
    id:string,
    currentUser?:User | null 
}
const ListingHead:React.FC<ListingHeadProps> = ({
    title,
    imageScr,
    locationValue,
    id,
    currentUser
}) => {

    const { getByValue } =useCountries();

    const location = getByValue(locationValue);

    return ( 
        <>
        <Heading 
        title={title}
        subtitle={`${location?.region}, ${location?.label}`}
        />

        <div className="w-full h-[60vh] overflow-hidden rounded-xl relative ">
            <Image 
            fill
            alt="Image"
            src={imageScr}
            className="object-cover w-full"
            />
            <div className="absolute top-5 right-5">
                <HeartButton 
                currentUser={currentUser}
                listingId={id}
                />


            </div>
        </div>
        
        </>

     );
}
 
export default ListingHead;