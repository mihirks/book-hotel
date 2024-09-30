export const dynamic = 'force-dynamic'

import ClientOnly from "../components/ClientOnly";
import Container from "../components/Container";
import PaymentClient from "./PaymentClient";


interface paymentProps{
    searchParams:{
        session_id:String
    }
}

const PaymentPage = (searchParams:paymentProps) => {
    // console.log(searchParams.searchParams);
    const {session_id}=searchParams.searchParams

    return ( 
        
        <ClientOnly>
            {/* <Container> */}
            <PaymentClient session_id={session_id}/> 
            {/* </Container> */}
                     
        </ClientOnly>
        
     );
}
 
export default PaymentPage;