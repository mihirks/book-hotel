'use client'

import { DateRange, Range,RangeKeyDict } from "react-date-range";
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'

interface CalenderProps{
    value:Range,
    disabledDates?:Date[],
    onChange:(value:RangeKeyDict)=> void,

}

const Calender:React.FC<CalenderProps> = ({
    value,
    disabledDates,
    onChange
}) => {
    return ( 
        <DateRange 
         date={new Date()}
         direction="vertical"
         rangeColors={['#254581']}
         ranges={[value]}
         showDateDisplay={false}
         onChange={onChange}
         minDate={new Date()}
         disabledDates={disabledDates}
        />
     );
}
 
export default Calender;