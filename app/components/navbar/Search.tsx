'use client'
import useCountries from '@/app/hooks/useCountries';
import useSearchModal from '@/app/hooks/useSearchModal';
import { useSearchParams } from 'next/navigation';
import { BiSearch } from 'react-icons/bi'
import { useMemo } from 'react';
import { differenceInDays } from 'date-fns';

const Search = () => {
    const searchModal=useSearchModal();
    const params =useSearchParams();

    const {getByValue} = useCountries();
    const locationValue = params?.get('locationValue');
    const guestCount =params?.get('guestCount');
    const startDate =params?.get('startDate');
    const endDate =params?.get('endDate');
    const location =useMemo(()=>{
        if(locationValue){
            return getByValue(locationValue as string)?.label
        }
        return 'AnyWhere'
    },[locationValue])
    const durationLabel =useMemo(()=>{
        if(startDate && endDate){
            const start = new Date(startDate as string);
            const end = new Date(endDate as string);
            let diff =differenceInDays(end,start) + 1;

            return `${diff} Days`
        }
        return 'Any Week'
    },[startDate,endDate])

    const guestLabel = useMemo(()=>{
        if(guestCount){
            return `${guestCount} Guests`
        }

        return 'Add Guests'
    },[guestCount])
    return ( 
        <div 
        onClick={searchModal.onOpen}
        className="flex
        flex-row
        rounded-full
        shadow-sm
        hover:shadow-md
        transition
        border-[1px]
        p-2
        w-full
        md:w-auto
        cursor-pointer
        ">
            
            <div className="flex
            flex-row
            items-center
            justify-between
            w-full            
            ">

                <div className="text-sm font-semibold px-4">
                    {location}
                </div>

                <div className="hidden
                sm:block
                text-sm
                font-semibold
                px-6
                ">
                    {durationLabel}
                </div>
                <div className="text-sm
                text-gray-500
                flex
                flex-row
                justify-center
                items-center
                gap-3
                ">
                    <div className="hidden sm:block ">
                        {guestLabel}
                    </div>
                    <div className="
                    p-2
                    bg-blue-500
                    text-white
                    font-bold
                    rounded-full
                    ">
                        <BiSearch size={15} />
                    </div>
                </div>
            </div>

        </div>
     );
}
 
export default Search;
