export const dynamic = 'force-dynamic'

import getCurrentUser from "../actions/getCurrentUser";
import getFavoriteListings from "../actions/getFavoriteListings";
import ClientOnly from "../components/ClientOnly";
import EmptyState from "../components/EmptyState";
import FavoritesClient from "./FavoritesClient";





const FavoritePage = async () => {

    const currentUser= await getCurrentUser();

    if(!currentUser){
        return (
            <ClientOnly>
                <EmptyState 
                title="Unauthorised"
                subtitle="Please login"

                />
            </ClientOnly>
        )
    }

    const favoritesList =await getFavoriteListings()
    
    if(favoritesList?.length === 0){
        return(
        <ClientOnly>
            <EmptyState 
            title="No favorites found"
            subtitle="Looks like you have no favorite listings"
            />
        </ClientOnly>
        )
    }
    return ( 
        <ClientOnly>
            <FavoritesClient 
            favoritesList={favoritesList}
            currentUser={currentUser}
            />
        </ClientOnly>
     );
}
 
export default FavoritePage;