'use client'

import { ChangeEvent, KeyboardEvent } from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface inputProps {
    id_1:string;
    id_2:string;
    id_3:string;
    id_4:string;
    id_5:string;
    id_6:string;
    label:string;
    disabled?:boolean;
    required?:boolean;
    register: UseFormRegister<FieldValues>;
    errors:FieldErrors
}
const Input:React.FC<inputProps> = ({
    id_1,
    id_2,
    id_3,
    id_4,
    id_5,
    id_6,
    label,
    disabled,
    register,
    required,
    errors,
}) => {
    const handleChange1 = (e: ChangeEvent<HTMLInputElement>) =>{

        const {maxLength,value,id}=e.target;
        const [fieldName,fieldIndex]=id.split("_");
        // console.log(fieldIndex);
        
        register(id,{required}).onChange(e)
        if(value.length >= maxLength){
            const nextSbiling =document.getElementById(`o_${Number(fieldIndex)+1}`);
            // console.log(nextSbiling);
            if(nextSbiling !==null){
                nextSbiling.focus();
            }
        }
        if(value.length==0){
            const prevSbiling =document.getElementById(`o_${Number(fieldIndex)-1}`);
            // console.log(prevSbiling);
            if(prevSbiling !==null){
                prevSbiling.focus();
            }
        }
        return
    }



    
    return ( 
        <div className="w-full relative flex-col">
            <label className={`
            text-lg
            font-light
            mt-10
            text-neutral-500
            ${errors[id_1] ? 'text-blue-500' : 'text-zinc-400'}
            `}>
                {label}
            </label>
            <div className="flex gap-3">
            <input id={id_1} 
            disabled={disabled}
            maxLength={1}
            // onKeyDown={(e) =>handleChange1(e)}
            // onChange={e => handleChange1(e)}
            
            type="text"
            {...register(id_1, {required,onChange(e) {
                const {value,id}=e.target;
                const [fieldName,fieldIndex]=id.split("_");
                
                if(value.length >= 1){
                    const nextSbiling =document.getElementById(`o_${Number(fieldIndex)+1}`);
                    // console.log(nextSbiling);
                    if(nextSbiling !==null){
                        nextSbiling.focus();
                    }
                }
                if(value.length==0){
                    const prevSbiling =document.getElementById(`o_${Number(fieldIndex)-1}`);
                    // console.log(prevSbiling);
                    if(prevSbiling !==null){
                        prevSbiling.focus();
                    }
                }

            },})}
            // placeholder=" "
            className="
            p-2
            focus:border-cyan-200 focus:shadow-cyan-500 focus:shadow
            bg-white
             w-8
            font-light
            border-2
            rounded-md
            outline-none
            transition
            disabled:opacity-70
            disabled:cursor-not-allowed
            ${errors[id] ? 'border-red-500':'border-neutral-300'}
            ${errors[id] ? 'focus:border-red-500':'focus:border-black'}"
            />
            <input id={id_2} 
            disabled={disabled}
            maxLength={1}
            type="text"
            {...register(id_2, {required,onChange(e) {
                const {value,id}=e.target;
                const [fieldName,fieldIndex]=id.split("_");
                
                if(value.length >= 1){
                    const nextSbiling =document.getElementById(`o_${Number(fieldIndex)+1}`);
                    // console.log(nextSbiling);
                    if(nextSbiling !==null){
                        nextSbiling.focus();
                    }
                }
                if(value.length==0){
                    const prevSbiling =document.getElementById(`o_${Number(fieldIndex)-1}`);
                    // console.log(prevSbiling);
                    if(prevSbiling !==null){
                        prevSbiling.focus();
                    }
                }

            },})}
            className="
            p-2
             bg-white
             w-8
             focus:border-cyan-200 focus:shadow-cyan-500 focus:shadow
            font-light
            border-2
            rounded-md
            outline-none
            transition
            disabled:opacity-70
            disabled:cursor-not-allowed
            ${errors[id] ? 'border-red-500':'border-neutral-300'}
            ${errors[id] ? 'focus:border-red-500':'focus:border-black'}"
            />
                        <input id={id_3} 
            disabled={disabled}
            maxLength={1}
            {...register(id_3, {required,onChange(e) {
                const {value,id}=e.target;
                const [fieldName,fieldIndex]=id.split("_");
                
                if(value.length >= 1){
                    const nextSbiling =document.getElementById(`o_${Number(fieldIndex)+1}`);
                    // console.log(nextSbiling);
                    if(nextSbiling !==null){
                        nextSbiling.focus();
                    }
                }
                if(value.length==0){
                    const prevSbiling =document.getElementById(`o_${Number(fieldIndex)-1}`);
                    // console.log(prevSbiling);
                    if(prevSbiling !==null){
                        prevSbiling.focus();
                    }
                }

            },})}
            type="text"
            className="
            p-2
             bg-white 
             w-8
             focus:border-cyan-200 focus:shadow-cyan-500 focus:shadow
            font-light
            border-2
            rounded-md
            outline-none
            transition
            disabled:opacity-70
            disabled:cursor-not-allowed
            ${errors[id] ? 'border-red-500':'border-neutral-300'}
            ${errors[id] ? 'focus:border-red-500':'focus:border-black'}"
            />
            <input id={id_4} 
            maxLength={1}
            {...register(id_4, {required,onChange(e) {
                const {value,id}=e.target;
                const [fieldName,fieldIndex]=id.split("_");
                
                if(value.length >= 1){
                    const nextSbiling =document.getElementById(`o_${Number(fieldIndex)+1}`);
                    // console.log(nextSbiling);
                    if(nextSbiling !==null){
                        nextSbiling.focus();
                    }
                }
                if(value.length==0){
                    const prevSbiling =document.getElementById(`o_${Number(fieldIndex)-1}`);
                    // console.log(prevSbiling);
                    if(prevSbiling !==null){
                        prevSbiling.focus();
                    }
                }

            },})}
            disabled={disabled}
            type="text"
            className="
            p-2
             bg-white              
             w-8
             focus:border-cyan-200 focus:shadow-cyan-500 focus:shadow
            font-light
            border-2
            rounded-md
            outline-none
            transition
            disabled:opacity-70
            disabled:cursor-not-allowed
            ${errors[id] ? 'border-red-500':'border-neutral-300'}
            ${errors[id] ? 'focus:border-red-500':'focus:border-black'}"
            />
            <input id={id_5} 
            maxLength={1}
            {...register(id_5, {required,onChange(e) {
                const {value,id}=e.target;
                const [fieldName,fieldIndex]=id.split("_");
                
                if(value.length >= 1){
                    const nextSbiling =document.getElementById(`o_${Number(fieldIndex)+1}`);
                    // console.log(nextSbiling);
                    if(nextSbiling !==null){
                        nextSbiling.focus();
                    }
                }
                if(value.length==0){
                    const prevSbiling =document.getElementById(`o_${Number(fieldIndex)-1}`);
                    // console.log(prevSbiling);
                    if(prevSbiling !==null){
                        prevSbiling.focus();
                    }
                }

            },})}
            disabled={disabled}
            type="text"
            className="
            p-2
             bg-white 
             w-8
             focus:border-cyan-200 focus:shadow-cyan-500 focus:shadow
            font-light
            border-2
            rounded-md
            outline-none
            transition
            disabled:opacity-70
            disabled:cursor-not-allowed
            ${errors[id] ? 'border-red-500':'border-neutral-300'}
            ${errors[id] ? 'focus:border-red-500':'focus:border-black'}"
            />
            <input id={id_6} 
            maxLength={1}
            {...register(id_6, {required,onChange(e) {
                const {value,id}=e.target;
                const [fieldName,fieldIndex]=id.split("_");
                
                if(value.length >= 1){
                    const nextSbiling =document.getElementById(`o_${Number(fieldIndex)+1}`);
                    // console.log(nextSbiling);
                    if(nextSbiling !==null){
                        nextSbiling.focus();
                    }
                }
                if(value.length==0){
                    const prevSbiling =document.getElementById(`o_${Number(fieldIndex)-1}`);
                    // console.log(prevSbiling);
                    if(prevSbiling !==null){
                        prevSbiling.focus();
                    }
                }

            },})}
            disabled={disabled}
            type="text"
            className="
            p-2
             bg-white 
             w-8
             focus:border-cyan-200 focus:shadow-cyan-500 focus:shadow
            font-light
            border-2
            rounded-md
            outline-none
            transition
            disabled:opacity-70
            disabled:cursor-not-allowed
            ${errors[id] ? 'border-red-500':'border-neutral-300'}
            ${errors[id] ? 'focus:border-red-500':'focus:border-black'}"
            />

            
            </div>

        </div>
     );
}
 
export default Input;