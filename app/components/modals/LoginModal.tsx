'use client'
import { signIn } from 'next-auth/react'
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { useState,useCallback } from 'react';
import { FieldValues,SubmitHandler,useForm } from 'react-hook-form';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/Input';
import axios from 'axios';
import { toast } from 'react-hot-toast'
import Button from '../Button';
import { useRouter } from 'next/navigation';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';
import useResetPwdModal from '@/app/hooks/useResetPwdModal';

const LoginModal = () => {
const router =useRouter();
const registerModal =useRegisterModal();
const loginModal =useLoginModal();
const resetPwdModal =useResetPwdModal();
const [isLoading,setisLoading] =useState(false);

const {
    register,
    handleSubmit,
    formState:{
        errors,
    }
} =useForm<FieldValues>({
    defaultValues:{
        email: '',
        password: '',
    },
});


const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setisLoading(true);
    const {name,email,password} = data
    signIn('credentials',{...data,redirect:false})
    .then((callback) => {
        setisLoading(false)

        if(callback?.ok){
            toast.success('Logged in');
            try {
                const response = axios.post('/api/producer',{user:`${email}`,msgData:"User Logged in"})
                // console.log('Response from Kafka producer')
            } catch (error) {
                // console.error('Error sending message:')
            }
            router.refresh();
            loginModal.onClose();
        }

        if(callback?.error){
            toast.error(callback.error);
        }
    })

    
}

const bodyContent =(
    <div className='flex flex-col gap-3'>
        <Heading 
        title='Welcome back'
        subtitle='Login to your account' />

        <Input 
        id='email'
        label='Email'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        />


        <Input 
        id='password'
        type="password"
        label='Password'
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

            <Button 
                outline
                label='Continue with Google'
                icon={FcGoogle}
                onClick={() => signIn('google')}            
            />
            <Button 
                outline
                label='Continue with GitHub'
                icon={AiFillGithub}
                onClick={() => signIn('github')}            
            />

            <div className='flex flex-row gap-2 justify-center'>
                <div>
                    Don't have an account?
                </div>
                <div className='text-neutral-800 hover:underline hover:cursor-pointer' onClick={() =>{
                    loginModal.onClose();
                    setTimeout(registerModal.onOpen,100)
                }}>
                    Sign Up
                </div>
            </div>
            <div className='flex flex-row gap-2 justify-center'>
                <div className='text-neutral-800 hover:underline hover:cursor-pointer' onClick={() =>{
                    loginModal.onClose();
                    setTimeout(resetPwdModal.onOpen,100)
                }}>
                    Forgot Password?
                </div>
            </div>
        </div>
        
    )

    return ( 
        <Modal 
        disabled={isLoading}
        isOpen={loginModal.isOpen}
        onClose={loginModal.onClose}
        title='Login'
        actionlabel='Submit'
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}
        footer={footerContent}
        />
     );
}
 
export default LoginModal
