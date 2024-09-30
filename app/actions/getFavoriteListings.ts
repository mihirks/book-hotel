import getCurrentUser from "./getCurrentUser";

export default async function getFavoriteListings() {
    
    try {

        const currentUser = await getCurrentUser();
        

        const favoriteListings = await prisma?.listing.findMany({
            where:{
                id:{
                    in:[...(currentUser?.favouriteIds || [])]
                }
            }
            }
        );
        if(!favoriteListings){
            return null
        }
        return(favoriteListings)
    } catch (error:any) {
        throw new Error(error)
    }
}