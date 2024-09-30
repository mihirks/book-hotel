import { NextResponse } from 'next/server';
import { mailOptions,transporter } from '../../actions/mailer'
export async function POST(request: Request) {
    const body =await request.json();
    const {
        email,
        Subject,
        text,
        htmlData
    } =body ;

    // console.log(body);
    
    const mail =   await transporter.sendMail({
            ...mailOptions,
            to: email,
            subject:Subject ,
            text,
            html:htmlData 
        })
    
    return NextResponse.json(mail);
}