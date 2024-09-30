'use client'

import Container from "@/app/components/Container";
import { categories } from "@/app/components/navbar/Categories";
import { Listing, Reservation, User } from "@prisma/client";
import { useCallback, useEffect, useMemo, useState } from "react";
import ListingHead from "./ListingHead";
import ListingInfo from "./ListingInfo";
import useLoginModal from "@/app/hooks/useLoginModal";
import { useRouter } from "next/navigation";
import { differenceInCalendarDays, differenceInDays, eachDayOfInterval } from "date-fns";
import axios from "axios";
import toast from "react-hot-toast";
import {loadStripe} from '@stripe/stripe-js';
import ListingReservation from "./ListingReservation";
import { Range } from "react-date-range";

const initialDateRange ={
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
};

interface ListingClientProps{
    reservations?:Reservation[] | null,
    listing: Listing & {
        user:User
    },
    currentUser?:User | null
}

const ListingClient:React.FC<ListingClientProps> = ({
    reservations=[],
    listing,
    currentUser
}) => {
    const loginModal =useLoginModal();
    const router = useRouter();

    const disabledDates = useMemo(()=> {
        let dates: Date[]= [];
        reservations?.forEach((reservation)=>{
            const range = eachDayOfInterval({
                start: new Date(reservation.startDate),
                end: new Date(reservation.enddate)
            })

            dates =[...dates,...range]
        })
        return dates
    },[reservations])

    const [isloading,setIsloading] =useState(false);
    const [totalPrice,setTotalPrice] = useState(listing.price);
    const [dateRange,setDateRange] = useState<Range>(initialDateRange);

    const onCreateReservation =useCallback(async()=> {
        if(!currentUser){
            return loginModal.onOpen();
        }
        
        setIsloading(true);
            // async () => {
            const stripe = await loadStripe(String(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY));
            const items =[{
                price:totalPrice,
                name:listing.title,
                startDate: dateRange.startDate,
                enddate:dateRange.endDate,
                quantity:1,
                listingId:listing.id,
                userId:currentUser.id
            }]

            const response = await fetch("/api/create-payment-intent",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({items}),

            })
            const session=await response.json();
            
            const result=stripe?.redirectToCheckout({
                sessionId:session.id
            });
            setDateRange(initialDateRange);
            
            try {
                const response = await axios.post('/api/producer',{user:`${currentUser.email}`,msgData:`User Reservation for ${listing.title} having price INR ${totalPrice}`})
                // console.log('Response from Kafka producer')
            } catch (error) {
                // console.error('Error sending message:')
            }
        // axios.post('/api/reservations',{
        //     totalPrice,
        //     startDate: dateRange.startDate,
        //     enddate:dateRange.endDate,
        //     listingId:listing?.id
        // }).then(()=>{
        //     toast.success('Booking confirmed!');
        //     
        //     router.refresh();
        //     router.push('/trips')
        // })
        // .catch(()=>{
        //     toast.error('Something went wrong')
        // })
        // .finally(()=>{
        //     setIsloading(false)
        // })
    },[currentUser,reservations,isloading,listing,loginModal.isOpen,router,dateRange]);

    useEffect(()=>{
        if(dateRange.startDate && dateRange.endDate){
            let dayCount = differenceInDays(
                dateRange.endDate,
                dateRange.startDate
            )
            dayCount += 1
            if(dayCount && listing.price){
                setTotalPrice(dayCount * listing.price)
            }else{
                setTotalPrice(listing.price)
            }
        }
    },[dateRange,listing.price])
    const category = useMemo(()=> {
        return categories.find((item)=> 
            item.label === listing.category
        )
    },[listing.category])
    
    return ( 
        <Container >
            <div className="max-w-screen-lg mx-auto pb-4">
                <div className="flex flex-col gap-6">
                    <ListingHead 
                    title= {listing.title}
                    imageScr = {listing.imagesScr}
                    locationValue = {listing.locationValue}
                    id={listing.id}
                    currentUser={currentUser}

                    />
                    <div className="grid grid-cols-1 md:grid-cols-7 mt-6 gap-10">
                        <ListingInfo 
                        user={listing.user}
                        category={category}
                        description={listing.description}
                        roomCount={listing.roomCount}
                        guestCount ={listing.guestCount}
                        bathroomCount={listing.bathroomCount}
                        locationValue={listing.locationValue}
                        />
                        <div className="order-first mb-10 md:order-last col-span-4 md:col-span-3">
                            <ListingReservation
                            price={listing.price}
                            totalPrice={totalPrice}
                            onChangeDate={(value)=>{setDateRange(value)}}
                            dateRange={dateRange}
                            onSubmit={onCreateReservation}
                            disabled={isloading}
                            disabledDates={disabledDates}
                            />
                        </div>
                    </div>
                </div>
            </div>

        </Container>
     );
}
 
export default ListingClient;