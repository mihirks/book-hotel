'use client'
import { useState,useCallback } from 'react';
import { FieldValues,SubmitHandler,useForm } from 'react-hook-form';
import Modal from './Modal';
import Heading from '../Heading';
import OTPInput from '../inputs/OTPinput';
import axios from 'axios';
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import useResetPwdModal from '@/app/hooks/useResetPwdModal';
import useOTPModal from '@/app/hooks/useOTPModal';
import useLoginModal from '@/app/hooks/useLoginModal';

// const correct=true;
interface OTPModalProps{
    genotp:number | null,
    email:string | null,
    password: string | null

}

const OTPModal:React.FC<OTPModalProps>=({
    genotp,
    email,
    password
}) => {
const router =useRouter();
const registerModal =useRegisterModal();
const loginModal = useLoginModal();
const resetPwdModal =useResetPwdModal();
const otpModal = useOTPModal();
const [isLoading,setisLoading] =useState(false);
var ButtonLabel="Verify OTP & Update Password";
const goBack =()=>{

    otpModal.onClose();
    resetField("o_1");
    resetField("o_2");
    resetField("o_3");
    resetField("o_4");
    resetField("o_5");
    resetField("o_6");
    resetPwdModal.onOpen();
}


const {
    register,
    handleSubmit,
    resetField,
    formState:{
        errors,
    }
} =useForm<FieldValues>({
    defaultValues:{
        o_1: '',
        o_2: '',
        o_3: '',
        o_4: '',
        o_5: '',
        o_6: '',
    },
});



const onSubmit: SubmitHandler<FieldValues> = async (otpdata) => {
    
    setisLoading(true);
    // console.log('hello')
    // console.log(register);
    const {o_1,o_2,o_3,o_4,o_5,o_6} = otpdata
    const userOTP=o_1+o_2+o_3+o_4+o_5+o_6
    // console.log(userOTP);
    // console.log(genotp);
    // console.log(email);
    // console.log("in submit")

    if (Number(userOTP) === genotp) {
        
    } else {
        toast.error("Incorrect OTP")
        return
    }
    const data ={
        emailId:email,
        name:'',
        passwd:password
    }
    await axios.put('/api/checkuserbyemail',data)
    .then(()=>{
        toast.success('Password Reset Done')
        router.refresh();
        otpModal.onClose();
        loginModal.onOpen();
        
    })
    .catch(error =>{
        toast.error('Something went wrong')
    })
    .finally(()=>{
        setisLoading(false)

    })

    
}

const bodyContent =(
    <div className='flex flex-col gap-3'>
        <Heading 
        title='Reset Password'
        subtitle='Change your login password' />


        <OTPInput  
        id_1='o_1'
        id_2='o_2'
        id_3='o_3'
        id_4='o_4'
        id_5='o_5'
        id_6='o_6'
        label='OTP'
        disabled={isLoading}
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
        <Modal 
        disabled={isLoading}
        isOpen={otpModal.isOpen}
        onClose={otpModal.onClose}
        title='Change Password'
        actionlabel={ButtonLabel}
        onSubmit={handleSubmit(onSubmit)}
        secondarylabel='Back'
        secondaryAction={goBack}
        body={bodyContent}
        footer={footerContent}
        />
     );
}
 
export default OTPModal
