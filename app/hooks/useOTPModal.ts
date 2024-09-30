import {create} from 'zustand';

interface OTPModalStore{
    isOpen:boolean;
    onOpen:() => void;
    onClose:() => void;
}

const useOTPModal =  create<OTPModalStore>((set) => ({
    isOpen:false,
    onOpen:() => set ({ isOpen:true}),
    onClose:() => set({isOpen:false})
}))

export default useOTPModal