import {NextRequest,NextResponse} from "next/server"
import prisma from '@/app/libs/prismadb'
import Stripe from 'stripe';

const stripe = new Stripe(String(process.env.STRIPE_SECRET_KEY));

export async function POST(req:Request) {

    // console.log("in")
      // Create a PaymentIntent with the specified amount
      try {
        const { items } = await req.json();
        const ListingId= items[0].listingId;
        // console.log(ListingId);
        if (!Array.isArray(items) || !items.length) {
            return NextResponse.json({ error: 'Invalid items' }, { status: 400 });
          }
        const session = await stripe.checkout.sessions.create({
            payment_method_types:["card"],
            line_items: items.map((item) => ({
                price_data: {
                  currency: 'inr',
                  product_data: {
                    name: item.name,
                  },
                  unit_amount: item.price * 100, // amount in cents
                },
                quantity: item.quantity,
              })),
            mode:"payment",
            success_url:`http://localhost:3000/payment-sucess?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url:`http://localhost:3000/listings/${ListingId}`,

            })
            // console.log(session)

            await prisma.paymentstripe.create({
              data:{
                sessionId:session.id,
                userId:items[0].userId,
                endDate:items[0].enddate,
                startDate:items[0].startDate,
                price:items[0].price,
                listingId:ListingId
              }
          })
            return NextResponse.json({id:session.id})
      } catch (error) {
        
      }


      

      
}