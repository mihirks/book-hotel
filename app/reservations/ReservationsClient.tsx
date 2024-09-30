'use client'

import { Reservation, User } from "@prisma/client";
import Container from "../components/Container";
import Heading from "../components/Heading";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import ListingCard from "../components/listings/ListingCard";

interface ReservationsClientProps{
    reservations:Reservation[] | null,
    currentUser:User | null
}

const ReservationsClient:React.FC<ReservationsClientProps> = ({
    reservations,
    currentUser
}) => {

    const router = useRouter();
    const [deletingId,setdeletingId] = useState('');

    
    // console.log(reservations)

    const onCancel = useCallback((id:string)=>{
        setdeletingId(id);

        axios.delete(`/api/reservations/${id}`)
        .then(()=>{
            toast.success('Reservation cancelled')
            router.refresh()
        })
        .catch(error =>{
            toast.error('Something went wrong')
        })
        .finally(()=>{
            setdeletingId('');

        })
    
    },[setdeletingId,router])
    return (  
        <Container>
            <Heading 
            title="Reservations"
            subtitle="Bookings on your properties"
            />
            <div className='mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-6 2xl:grid-cols-7 gap-8'>
                {reservations?.map((item)=>(
                    <ListingCard 
                    // @ts-ignore
                    data={item.listing}
                    currentUser={currentUser}
                    reservation={item}
                    onAction={onCancel}
                    actionLabel="Cancel guest reservation"
                    disabled={deletingId === item.id}
                    key={item.id}
                    actionId={item.id}
                    />
                ))}
            </div>
        </Container>
    );
}
 
export default ReservationsClient;