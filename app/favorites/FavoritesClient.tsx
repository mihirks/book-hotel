'use client'

import { Listing, Reservation, User } from "@prisma/client";
import Container from "../components/Container";
import Heading from "../components/Heading";

import ListingCard from "../components/listings/ListingCard";


interface FavoritesClientProps{
    favoritesList:Listing[] | null
    currentUser:User | null
}

const FavoritesClient:React.FC<FavoritesClientProps> = ({
    favoritesList,
    currentUser
}) => {

     
    return (  
        <Container>
            <Heading 
            title="Favorites"
            subtitle=""
            />
            <div className='mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-6 2xl:grid-cols-7 gap-8'>
                {favoritesList?.map((item)=>(
                    <ListingCard 
                    // @ts-ignore
                    data={item}
                    currentUser={currentUser}
                    key={item.id}
                    />
                ))}
            </div>
        </Container>
    );
}
 
export default FavoritesClient;