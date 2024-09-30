import { IconType } from "react-icons/lib";


interface ButtonProps {
    label:string;
    disabled?:boolean;
    outline?:boolean;
    small?:boolean;
    icon?:IconType;
    onClick:(e: React.MouseEvent<HTMLButtonElement>) => void;
}
const Button: React.FC<ButtonProps> = ({
    label,
    disabled,
    outline,
    small,
    icon:Icon,
    onClick
}) => {
    return ( 
        <button 
        disabled={disabled}
        onClick={onClick}
        className={`relative disabled:opacity-70 disabled:cursor-not-allowed rounded-lg transition w-full
        justify-center
        hover:cursor-pointer
        hover:shadow-md
        flex
        items-center
        ${outline ? 'text-black':'text-white'}
        ${outline ? 'border-black':'border-blue-500'}
        ${outline ? 'bg-white':'bg-blue-500'}
        ${small ? 'text-sm':'text-md'}
        ${small ? 'font-light':'font-semibold'}
        ${small ? 'border-[1px]':'border-2'}
        ${small ? 'py-1' : 'py-3'}
        `}
        >

            {Icon &&
            <Icon size={24}
            className="absolute left-4 top-3"
            />
            }
            {label}
        </button>
     );
}
 
export default Button;
