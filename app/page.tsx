export const dynamic = 'force-dynamic'


import ClientOnly from './components/ClientOnly'
import Container from './components/Container'
import EmptyState from './components/EmptyState';

import getListings, { IListingParams } from './actions/getListings';
import ListingCard from './components/listings/ListingCard';
import getCurrentUser from './actions/getCurrentUser';


export const metadata = {
  title: 'Hotel Bookings',
  description: 'Travel to explore yourself',
  // icon: '/landscape.png'
}

interface HomeProps{
  searchParams:IListingParams
}
export default async function Home(
  {searchParams}:HomeProps
) {
  const listings =await getListings(searchParams);
  const currentUser = await getCurrentUser();
  
  if (listings?.length === 0){
    return(
      <ClientOnly>
        <EmptyState showReset/>
      </ClientOnly>
    )
  }
  return (

    <ClientOnly>
      <Container>
        <div
        className='pt-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-6 2xl:grid-cols-7 gap-8'
        >
          {listings?.map((listing:any)=> {
            return(
              <ListingCard 
              currentUser={currentUser}
              key={listing.id}
              data={listing}
              />

            )
          })}
        </div>
      </Container>
    </ClientOnly>

  )
}
