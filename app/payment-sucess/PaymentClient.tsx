'use client'

import axios from "axios"
import Loading from "../loading"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import Container from "../components/Container"

interface PaymentClientProps{
    session_id:String | null,
}

const PaymentClient:React.FC<PaymentClientProps> =({
    session_id
}) =>{

    // console.log(session_id);
    const router=useRouter()
    const op=axios.post('/api/payment-verification',{session_id})
    .catch((error)=>{
        toast.error("Payment Verfication Failed")
        router.push('/')
    })
    .then(()=>{
        toast.success("Booking Succesful")
        router.push('/trips')
    })


    return (
        <Container>
        <Loading />
        </Container>
    )
}

export default PaymentClient