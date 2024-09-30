'use client'

import { IconType } from "react-icons/lib";

interface CategororyInputProps{
    icon:IconType,
    label: string,
    selected?: boolean,
    onClick: (value:string) => void,
}

const CategoryInput:React.FC<CategororyInputProps> = ({
    icon:Icon,
    label,
    selected,
    onClick
}) => {
    return ( 
        <div onClick={() => {onClick(label)}}
        className={`rounded-xl border-2 p-2 flex flex-col gap-1 hover:border-black transition cursor-pointer 
        ${selected ? 'border-black' : 'border-neutral-200'}
        `}
        >
            <Icon  size={25}/>
            <div className="font-semibold">
                {label}
            </div>
        </div>
     );
}
 
export default CategoryInput;