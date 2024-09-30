import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import useLoginModal from "./useLoginModal";
import { useCallback, useMemo } from "react";
import toast from "react-hot-toast";



interface IUseFavourite {
    listingId: string,
    currentUser?: User | null
}

const useFavorite =({
    listingId,
    currentUser
}: IUseFavourite)=> {


    const router = useRouter();

    const loginModal =useLoginModal();

    const hasFavorited = useMemo(()=> {
        const list = currentUser?.favouriteIds || [];
        return list.includes(listingId);
    },[currentUser,listingId])

    const toggleFavorite = useCallback(async(
        e:React.MouseEvent<HTMLDivElement>
    )=>{
        e.stopPropagation();
        if(!currentUser){
            loginModal.onOpen();
            return
        }

        try {
            let request;

            if (hasFavorited){
                request = ()=> axios.delete (`/api/favorites/${listingId}`);

            }
            else{
                request = ()=> axios.post(`/api/favorites/${listingId}`);
            }

            await request();

            router.refresh();
            toast.success('Success');

        } catch (error) {
            toast.error('Something went wrong')
        }
    },[currentUser,hasFavorited,listingId,loginModal,router]);

    return {
        hasFavorited,
        toggleFavorite
    }

}

export default useFavorite;