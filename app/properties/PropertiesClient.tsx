'use client'

import { Listing, User } from "@prisma/client";
import Container from "../components/Container";
import Heading from "../components/Heading";
import ListingCard from "../components/listings/ListingCard";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";


interface PropertiesClientProps{
    PropertyListings:Listing[] | null,
    currentUser:User | null
}

const PropertiesClient:React.FC<PropertiesClientProps> = ({
    PropertyListings,
    currentUser
}) => {

    
    const router = useRouter();
    const [deletingId,setdeletingId] = useState('');


    const onCancel = useCallback((id:string)=>{
        setdeletingId(id);

        axios.delete(`/api/listings/${id}`)
        .then(()=>{
            toast.success('Property Removed')
            router.refresh()
        })
        .catch(error =>{
            toast.error(error?.response?.data?.error)
        })
        .finally(()=>{
            setdeletingId('');

        })
    
    },[setdeletingId,router])

    return (  
        <Container>
            <Heading 
            title="Properties"
            subtitle="List of your properties"
            />
            <div className='mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-6 2xl:grid-cols-7 gap-8'>
                {PropertyListings?.map((item)=>(
                    <ListingCard 
                    data={item}
                    currentUser={currentUser}
                    key={item.id}
                    actionId={item.id}
                    actionLabel="Delete Property"
                    onAction={onCancel}
                    disabled={item.id === deletingId}
                    />
                ))}
            </div>
        </Container>
    );
}
 
export default PropertiesClient;