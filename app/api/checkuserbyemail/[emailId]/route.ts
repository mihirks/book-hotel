import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/app/libs/prismadb'
import { NextResponse } from 'next/server';

interface IParams{
    emailId?:string
}

export async function GET(
    request:Request,
    {params}:{params :IParams}
){

    const {emailId} =params

    if(!emailId || typeof emailId !== 'string'){
        return 0;
    }

    const usercount = await prisma.user.count({
        where:{
            email:emailId
        }
    })

    return NextResponse.json(usercount)


}