'use client'

import Avatar from "@/app/components/navbar/Avatar";
import useCountries from "@/app/hooks/useCountries";
import { User } from "@prisma/client";
import { IconType } from "react-icons/lib";
import ListingCategory from "./ListingCategory";
import dynamic from "next/dynamic";
import { useMemo } from "react";


interface ListingInfoProps{
    user:User | null,
    category: {
        label: string;
        icon: IconType;
        description: string;
    } | undefined ,
    description:string,
    guestCount:number,
    roomCount:number,
    bathroomCount:number,
    locationValue:string

}

const ListingInfo:React.FC<ListingInfoProps> = ({
    user,
    category,
    description,
    guestCount,
    roomCount,
    bathroomCount,
    locationValue
}) => {

    const { getByValue} = useCountries();
    const location = getByValue(locationValue);
    const Map =useMemo(()=> dynamic(() => import('../../components/Map'),{ssr:false}),[location]);
    return ( 
        <div className="col-span-4 flex flex-col gap-8">
            <div className="flex flex-col gap-2">
                <div className="text-xl font-semibold flex flex-row items-center gap-2">
                    <div>Hosted by {user?.name}</div>
                    <Avatar ImageUser={user?.image}/>
                </div>
                <div className="flex flex-row items-center gap-4 font-light text-neutral-500">
                <div>
                    {guestCount} guests
                </div>
                <div>
                    {roomCount} rooms
                </div>
                <div>
                    {bathroomCount} bathrooms
                </div>
            </div>
            </div>
            <hr />
            {category && (
                <ListingCategory 
                icon={category.icon}
                description= { category.description}
                label={category.label}
                />
            )}
            <hr />
            <div className="text-lg font-light text-neutral-500 ">
                {description}
            </div>
            <hr />
            <Map center={location?.latlng} />
        </div>
     );
}
 
export default ListingInfo;