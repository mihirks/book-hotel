'use client'

import Button from '@/app/components/Button';
import Calender from '@/app/components/inputs/Calender';
import {Range} from 'react-date-range';

interface ListingReservationProps{
    disabled:boolean,
    totalPrice:number,
    disabledDates:Date[],
    dateRange:Range,
    onSubmit:()=> void,
    onChangeDate: (value:Range)=>void,
    price:number
}

const ListingReservation:React.FC<ListingReservationProps> = ({
    disabled,totalPrice,disabledDates,dateRange,onChangeDate,onSubmit,price
}) => {
    return ( 
        <div className='bg-white rounded-xl border-[1px]  overflow-hidden flex flex-col gap-2 p-4 '>
            
                <div className='flex flex-row items-center gap-2 '>
                <div className='text-2xl font-semibold'>
                ₹ {price}
                </div>
                <div className='font-light text-neutral-600 '>
                    per night
                </div>
                </div>       
                <hr />      
                <Calender 
                value={dateRange}
                disabledDates={disabledDates}
                onChange={(value)=>onChangeDate(value.selection)}
                />
                <hr />

                    <Button 
                    disabled={disabled}
                    label='Reserve'
                    onClick={onSubmit}
                    />

                <div className='p-4 flex flex-row items-center justify-between font-semibold text-lg'>
                    <div>
                        Total
                    </div>
                    <div >
                    ₹ {totalPrice}
                    </div>
                </div>
            
        </div>
     );
}
 
export default ListingReservation;