'use client'
import { useCallback, useEffect, useState } from "react";
import { IoMdClose } from 'react-icons/io'
import Button from "../Button";

interface ModalProps {
    isOpen?:boolean;
    onClose:()=> void;
    onSubmit:() => void;
    title?:string;
    body?:React.ReactElement;
    footer?:React.ReactElement;
    actionlabel: string;
    disabled?: boolean;
    secondaryAction?: () => void;
    secondarylabel?: string;

}
const Modal:React.FC<ModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    title,
    body,
    footer,
    actionlabel,
    disabled,
    secondaryAction,
    secondarylabel
}) => {
    const [showModal,setShowModal] =useState(isOpen);
        
    useEffect(()=>{
        setShowModal(isOpen);
    },[isOpen])
    
    const handleClose =useCallback(()=>{
        if(disabled){
            return
        }

        setShowModal(false);
        setTimeout(onClose,300);
    },[onClose,disabled])

    const handleSubmit =useCallback(()=> {
        if(disabled){
            return
        }
        // console.log('in handle submit')
        onSubmit();

    },[onSubmit,disabled])

   
    const handleSecondaryAction =useCallback(()=>{
        if(disabled || !secondaryAction){
            return
        };

        secondaryAction()
    },[secondaryAction,disabled])
    
    if(!isOpen){
        return
    }

    return (
        <div className="flex 
        justify-center
        items-center
        fixed
        z-50
        inset-0
        outline-none
        overflow-x-hidden
        overflow-y-auto
        focus:outline-none
        bg-neutral-800/70
        ">
            <div className={`
            translate 
            duration-300 
            h-full 
            md:h-auto 
            w-full 
            m-auto
            md:w-4/6
            lg:w-3/6
            xl:w-2/5
            lg:h-auto
            xl:h-auto
            bg-white
            shadow-lg
            rounded-lg
            ${showModal ? 'translate-y-0' : 'translate-y-full'}
            ${showModal ? 'opacity-100' : 'opacity-0'}
            `}>
                {/* Header */}
                <div className="flex items-center p-6 justify-center relative rounded-t">
                    <button onClick={handleClose}
                    className=" hover:opacity-70 absolute left-6">

                        <IoMdClose size={18} /> 
                    </button>

                    <div className="font-semibold">
                        {title}
                    </div>
                </div>

                {/* Body */}
                <div className="relative p-6">
                    {body}
                </div>

                {/* Footer */}
                <div className="flex flex-col p-6 gap-2">


                    <div className="flex flex-row w-full items-center gap-3">

                    {secondaryAction && secondarylabel && (

                    <Button disabled={disabled}
                    label={secondarylabel}
                    onClick={secondaryAction}
                    outline
                    />

                    )}
                        <Button disabled={disabled}
                         label={actionlabel}
                        onClick={handleSubmit}
                        />
                    </div>
                        {footer}
                </div>
            </div>
        </div>
     );
}
 
export default Modal;