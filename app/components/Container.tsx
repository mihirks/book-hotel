'use client'
interface ContainerProps {
    children:React.ReactNode;
}


const Container: React.FC<ContainerProps> = ({children}) => {
    return ( <div className="
    max-w-[2520px]
    xl:px-8
    md:px-5
    px-3
    "
    >
        {children}
        </div> );
}
 
export default Container;