import prisma from '@/app/libs/prismadb'

interface IParams{
    listingId?:string,
    userId?:string,
    authorId?:string
}


export default async function getReservations(params:IParams) {
    const {listingId,userId,authorId} = params

    const query:any ={}

    if(listingId){
        query.listingId=listingId
    }
    if(authorId){
        query.listing={userId:authorId}
    }

    if(userId){
        query.userId=userId
    }




    try {
        const reservations = await prisma?.reservation.findMany({
            where:query,
            orderBy:{
                createdAt:'desc'
            },
            include:{
                listing:true
            }
        });
        if(!reservations){
            return null
        }
        return(reservations)
    } catch (error:any) {
        throw new Error(error)
    }
}