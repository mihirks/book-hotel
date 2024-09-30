export const dynamic = 'force-dynamic'

import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById";
import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import ListingClient from "./ListingClient";
import getReservations from "@/app/actions/getReservations";



interface Iparams{
    listingId?:string 
}
const ListingPage = async ({params} : {params: Iparams}) => {
    
    // console.log(params)
    const listing =  await getListingById(params);
    const currentUser = await getCurrentUser();
    const reservation =await getReservations(params);
    
    if (!listing){
        return(
            <ClientOnly>
                <EmptyState />
            </ClientOnly>
        )
    }
    return ( 
        <ClientOnly>
            <ListingClient 
            listing={listing}
            currentUser={currentUser}
            reservations={reservation}
            />
        </ClientOnly>
     );
}
 
export default ListingPage;