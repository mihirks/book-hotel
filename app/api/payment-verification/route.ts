import Stripe from "stripe";
import prisma from '@/app/libs/prismadb'
import { NextResponse } from 'next/server';

const sec_k=process.env.STRIPE_SECRET_KEY
const stripe = new Stripe(String(process.env.STRIPE_SECRET_KEY));

export async function POST(request:Request){
    const body = await request.json();
    const {
        session_id
    }= body;
    // return NextResponse.error();
    try {
        const session_new=await stripe.checkout.sessions.retrieve(session_id)
        if(!session_new){
            return NextResponse.error();
        }
        // console.log('after session')
        const payment=await prisma.paymentstripe.findFirst({
            where:{
                sessionId:session_new.id,
                isProcessed:false
            }
        })
        // console.log('after payment')
        if(!payment){
            return NextResponse.error();
        }
        
        // console.log(payment?.isProcessed);
        if(session_new.payment_status === 'paid'){
            const listingAndReservation =await prisma.listing.update({
                where:{
                    id:payment?.listingId
                },
                data:{
                    reservations:{
                        create:{
                            userId: payment?.userId,
                            startDate:payment.startDate,
                            enddate:payment.endDate,
                            totalPrice:payment.price
                        }
                    }
                }
            });
            await prisma.paymentstripe.updateMany({where:{
                AND:[
                    {sessionId:session_new.id},
                    {isProcessed:false}
                ]
            },data:{
                isProcessed:true
            }})
    }else{
        return NextResponse.error();
    }
        
    } catch (error) {
        return NextResponse.error();
    }
    



return NextResponse.json(true);
};