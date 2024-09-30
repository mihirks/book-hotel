'use client'
import { signIn } from 'next-auth/react'
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { useState,useCallback, useMemo } from 'react';
import { FieldValues,SubmitHandler,useForm } from 'react-hook-form';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/Input';
import OTPInput from '../inputs/OTPinput';
import axios from 'axios';
import { toast } from 'react-hot-toast'
import Button from '../Button';
import { useRouter } from 'next/navigation';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import useResetPwdModal from '@/app/hooks/useResetPwdModal';
import useOTPModal from '@/app/hooks/useOTPModal';
import OTPModal from './OTPModal';
import Container from '../Container';


const ResetPwdModal = () => {
const router =useRouter();
const registerModal =useRegisterModal();
const resetPwdModal =useResetPwdModal();
const [isLoading,setisLoading] =useState(false);
const [value,setValue]=useState(1);
const [password,setPassword]=useState('');
const [mailValue,setMailValue]=useState('');
const otpModal = useOTPModal();




const {
    register,
    handleSubmit,
    resetField,
    formState:{
        errors,
    }
} =useForm<FieldValues>({
    defaultValues:{
        email: '',
        password: '',
    },
});





const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    
    
    var num=Math.floor(100000 + Math.random() * 900000)
    setValue(num);
    const {name,email,password} = data
    setMailValue(email);
    setPassword(password);
    const Subject = "OTP for Pasword Reset Hotel Bookings!"
    const text="Your OTP is " + num + " Please note that we,at Hotel Bookings will never ask OTP via call or text"
    const html = ``


    const emailRes = await axios.get(`/api/checkuserbyemail/${mailValue}`)
    // console.log(email);
    // console.log(emailRes.data);

    if(emailRes.data < 1){
        toast.error('User Not Found, Please SignUp')
        return
    }
    
    

        axios.post('/api/nodemailer',{email,Subject,text,html})
        .then(() => {
            toast.success('OTP Sent');
        })
        .catch((error) => {
            toast.error('Something went wrong to send OTP')
        })
        .finally(() => {
            resetPwdModal.onClose();
            resetField("password")
            otpModal.onOpen();

        }
        )

    

    
}


const bodyContent =(
    <div className='flex flex-col gap-3'>
        <Heading 
        title='Reset Password'
        subtitle='Change your login password' />

        <Input 
        id='email'
        label='Email'
        register={register}
        errors={errors}
        required
        />


        <Input 
        id='password'
        type="password"
        label='Password'
        register={register}
        errors={errors}
        required
        />



    </div>
)
    const footerContent = (
        <div className='flex flex-col gap-4 mt-3'>
            <hr />
            <div className='flex flex-row gap-2 justify-center'>
                <div>
                    Don't have an account?
                </div>
                <div className='text-neutral-800 hover:underline hover:cursor-pointer' onClick={() =>{
                    resetPwdModal.onClose();
                    
                    setTimeout(registerModal.onOpen,100)
                }}>
                    Sign Up
                </div>
            </div>

        </div>
        
    )

    return ( 
        <Container>
        <Modal 
        disabled={isLoading}
        isOpen={resetPwdModal.isOpen}
        onClose={resetPwdModal.onClose}
        title='Change Password'
        actionlabel="Send OTP"
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}
        footer={footerContent}
        />
        <OTPModal genotp={value} email={mailValue} password={password}/>
        
        </Container>


     );
}
 
export default ResetPwdModal
