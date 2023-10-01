import React from "react";
import { useState } from 'react';
import 'tailwindcss/tailwind.css'
import logodark from '../img/taks.png';
import logolight from '../img/taks.png';
import { MdLightMode } from 'react-icons/md';
import { MdDarkMode } from "react-icons/md";

interface HeaderProps {
    className?: string
}

const Header: React.FC<HeaderProps> = (theme: any, changeTheme: (arg0: boolean) => void) => {
    
    const [icon, setIcon] = useState(true);

    return (
    <>
        <header className={`flex justify-between p-2 items-center bg-darkmode-azul1`}>
        <img src={theme ? logodark : logolight} alt="logo" className="w-30 h-10 pl-2"/>
        <a className='px-2 cursor-pointer text-[#fff]' onClick={() => {setIcon(!icon); changeTheme(!theme)} }>
            {icon ? <MdLightMode/> : <MdDarkMode/>}
        </a>
        </header>
    </>      

    )
};

export default Header;