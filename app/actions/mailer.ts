import { createTransport} from 'nodemailer';

const email= process.env.EMAIL;
const pass = process.env.EMAIL_PASS;

export const transporter = createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: false,
    auth:{
        user: email,
        pass,
    },

  });

  export const mailOptions ={
    from:email,
    to:email,
  }