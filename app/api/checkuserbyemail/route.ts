// import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/app/libs/prismadb'
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';


export async function PUT(
    request:Request,
){
    const body =await request.json();
    const {
        emailId,
        name,
        passwd
    } =body 

    if(!emailId || typeof emailId !== 'string'){
        throw new Error ('Invalid Email')
    }
    if(!passwd || typeof passwd !== 'string'){
        throw new Error ('Invalid Password')
    }
    const hashedPassword = await bcrypt.hash(passwd,12);
    const userEmail = await prisma.user.update({
        where:{
            email:emailId
        },
        data:{
            hashedPassword:hashedPassword
        }
    })

    return NextResponse.json(userEmail)


}

