import {create} from 'zustand';

interface ResetPwdModalStore{
    isOpen:boolean;
    onOpen:() => void;
    onClose:() => void;
}

const useResetPwdModal =  create<ResetPwdModalStore>((set) => ({
    isOpen:false,
    onOpen:() => set ({ isOpen:true}),
    onClose:() => set({isOpen:false})
}))

export default useResetPwdModal