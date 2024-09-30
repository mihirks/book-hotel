'use client'

interface MenuItemProps{
    onClick: () =>void;
    label: string;
}
const MenuItems: React.FC<MenuItemProps> = ({
    onClick,
    label
}) => {
    return ( 
            <div className="p-2 cursor-pointer border-b-[1px] border-neutral-50 hover:bg-neutral-50" onClick={onClick}>{label}</div>
     );
}
 
export default MenuItems;