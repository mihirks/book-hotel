
import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/app/libs/prismadb'
import { NextResponse } from 'next/server';


export async function POST(request:Request) {
    const currentUser =await getCurrentUser();
    if(!currentUser){
        return NextResponse.error();
    }

    const body = await request.json();

    const {
        title,
        description,
        imagesScr,
        category,
        roomCount,
        bathroomCount,
        guestCount,
        location,
        price,
    }= body;

    Object.keys(body).forEach((value:any)=>{
        if(!body[value]){
            NextResponse.error();
        }
    })

    const listing =await prisma.listing.create({
        data:{
            title,
            description,
            imagesScr,
            category,
            roomCount,
            bathroomCount,
            guestCount,
            locationValue: location.value,
            price:parseInt(price),
            userId: currentUser.id
        }
    })
    return NextResponse.json(listing);

} 