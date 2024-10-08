'use client'


import Modal from "./Modal";
import { useMemo, useState } from "react";
import { categories } from "../navbar/Categories";
import Heading from "../Heading";
import CategoryInput from "../inputs/CategoryInput";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Counter from "../inputs/Counter";
import ImageUpload from "../inputs/ImageUpload";
import Input from "../inputs/Input";
import dynamic from "next/dynamic";
import axios from 'axios';
import { toast } from 'react-hot-toast'
import { useRouter } from "next/navigation";
import useRentModal from "@/app/hooks/useRentModal";
import CountrySelect from "../inputs/CountrySelect";

enum STEPS {
    CATEGORY =0,
    LOCATION =1,
    INFO=2,
    IMAGES=3,
    DESCRIPTION=4,
    PRICE=5
}

const RentModal = () => {

    const rentModal =useRentModal();
    const [step,setStep] =useState(STEPS.CATEGORY);
    const [isLoading,setLoading] =useState(false);
    const {register,
        handleSubmit,
        setValue,
        watch,
        formState:{
            errors
        },
        reset
        
    } =useForm<FieldValues>({
        defaultValues: {
            category:'',
            location: null,
            guestCount: 1,
            roomCount: 1,
            bathroomCount: 1,
            imagesScr: '',
            price: 1,
            title: '',
            description: ''
        },
    })


    const category = watch('category')
    const location =watch('location')
    const guestCount =watch('guestCount')
    const roomCount =watch('roomCount')
    const bathroomCount =watch('bathroomCount')
    const imagesScr =watch('imagesScr')

    const Map =useMemo(()=> dynamic(() => import('../Map'),{ssr:false}),[location]);
    const router =useRouter();

    const setCustomValue = (id: string ,value:any)=> {
        setValue(id,value , {
            shouldValidate:true,
            shouldDirty:true,
            shouldTouch: true,
        })
    }
    const onBack= () => {
        setStep((value) => value - 1)
        
    }

    const onNext = () => {
        setStep((value) => value + 1)
        
    }

    const onSubmitList: SubmitHandler<FieldValues> = (data) => {

        if(step !== STEPS.PRICE){
            return onNext();
        }

        // console.log('in step 5')
        setLoading(true);
        axios.post('/api/listings',data)
        .then(()=> {
            toast.success('Listing Created');
            router.refresh();
            reset();
            setStep(STEPS.CATEGORY);
            rentModal.onClose();

        })
        .catch(()=>{
            toast.error('Something went wrong');
        })
        .finally(()=> {
            setLoading(false);
        })

    }

    const actionLabel =useMemo(()=> {
        if(step === STEPS.PRICE){
            return 'Create'
        }
        return 'Next'
    },[step])

    const secondaryActionLabel =useMemo(()=> {
        if(step === STEPS.CATEGORY){
            return undefined
        }
        return 'Back'
    },[step])
    

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading
            title="Which of these best describes your place?"
            subtitle="Pick a category"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 max-h-[50vh] overflow-y-auto gap-3">
                {categories.map((item) => (
                    <div key={item.label} className="col-span-1">
                        <CategoryInput 
                        selected={category === item.label}
                        icon={item.icon}
                        key={item.label}
                        label={item.label}
                        onClick={(category) => setCustomValue('category',category)}
                        />
                    </div>
                ))}
            </div>
        </div>
    )

    if(step === STEPS.LOCATION){
        bodyContent =(
            <div className="flex flex-col gap-8 ">
                <Heading 
                title="Where is your place located?"
                subtitle="Help guests find you!"
                />

                <CountrySelect  
                value={location}
                onChange={(value) => setCustomValue('location',value)}
                />

                <Map center={location?.latlng} />
            </div>
        )
    }

    if(step === STEPS.INFO){
        bodyContent= (
            <div className="flex flex-col gap-8 ">
                <Heading 
                title="Share some basics about your place"
                subtitle="What amenties do you have?"
                />
                <Counter title="Guests" 
                subtitle="How many guests do you allow?"
                value={guestCount}

                onChange={(value) => setCustomValue('guestCount',value)}
                />
                <Counter title="Rooms" 
                subtitle="How many rooms do you have?"
                value={roomCount}

                onChange={(value) => setCustomValue('roomCount',value)}
                />
                <Counter title="Bathrooms" 
                subtitle="How many bathrooms do you have?"
                value={bathroomCount}

                onChange={(value) => setCustomValue('bathroomCount',value)}
                />
            </div>
        )
    }

    if(step === STEPS.IMAGES){
        bodyContent=(
            <div className="flex flex-col gap-8">
                <Heading 
                title="Add a Photo of your place"
                subtitle="Show guests what your place looks like!"
                />
                <ImageUpload 
                value={imagesScr}
                onChange={(value) => setCustomValue('imagesScr',value)}
                />
            </div>
        )
    }

    if(step=== STEPS.DESCRIPTION){
        bodyContent=(
            <div className="flex flex-col gap-8">
                <Heading 
                title="How would you describe your place?"
                subtitle="Short and sweet works best"
                />

                <Input 
                id="title"
                label="Title"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
                />
                <hr />

                <Input 
                id="description"
                label="Description"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
                />                

            </div>
        )
    }

    if(step === STEPS.PRICE){
        bodyContent=(
            <div className="flex flex-col gap-8">
                <Heading 
                title="Now, set your price"
                subtitle="How much do you charge per night?"
                />
                <Input 
                id="price"
                label="Price"
                type="number"
                formatPrice
                register={register}
                errors={errors}
                disabled={isLoading}
                required
                />
            </div>
        )
    }





    
    return (
        <Modal
        disabled={isLoading}
        isOpen={rentModal.isOpen}
        title="Airbnb your home!"
        actionlabel={actionLabel}
        onSubmit={handleSubmit(onSubmitList)}
        secondarylabel={secondaryActionLabel}
        secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
        onClose={rentModal.onClose}
        body={bodyContent}
      />
    );
}
 
export default RentModal;