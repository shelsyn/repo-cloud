import { useState } from 'react';
import { AiFillHome } from 'react-icons/ai';
import { ImStatsDots } from 'react-icons/im';
import {BsFillCalendarFill} from 'react-icons/bs';
import { AiFillStar } from 'react-icons/ai';
import { BsChevronDown } from 'react-icons/bs';
import { MdLogout } from 'react-icons/md';
import { RxDoubleArrowLeft } from 'react-icons/rx'; 
import {Link} from 'react-router-dom';

function SideBar({theme}) {
    const [open, setOpen] = useState(false);
    const [submenuOpen, setSubmenuOpen] = useState(false);

    const menus = [
        {title: 'Tareas', icon: <AiFillHome/>, path: '/'},
        {title: 'Estadisticas', icon: <ImStatsDots/>, path: '/stats'},
        {title: 'Calendario', icon: <BsFillCalendarFill/>, path: '/calendar'},
        {title: 'Favorito', 
        icon: <AiFillStar/>,
        spacing: true, 
        submenu: true, 
        submenuItems: [
            {title: 'Favorite 1'},
            {title: 'Favorite 2'},
            {title: 'Favorite 3'}
        ]},
        {title: 'Salir', icon: <MdLogout/>, path: '/login'}
    ]
    
    return (
        <>
        <div className={`bg-gradient-to-b ${theme ? 'text-[#C6EDF6]' : 'text-lightmode-azul'} ${theme ? 'from-darkmode-azul1 ' : 'from-lightmode-blanco'} ${theme ? 'to-darkmode-verdeagua1' : 'to-lightmode-azul'} p-5 ${open ? "w-72" : "w-20"} relative mobile:hidden`}>
            <RxDoubleArrowLeft className={`cursor-pointer bg-[#ffffff] bg-opacity-5 ${theme ? 'text-[#C6EDF6]' : 'text-lightmode-azul'} border ${theme ? 'border-[#C6EDF6]' : 'border-lightmode-azul'} text-3xl p-1 rounded-full absolute -right-3 top-9 ${!open && "rotate-180"}`} onClick={() => setOpen(!open)}/>
            <ul className='pt-2'>
                { menus.map((menu, index) => (
                    <>
                        {menu.hasOwnProperty('path') ? (
                            <Link key={index} to={menu.path} className={`${theme ? 'dark:text-[#C6EDF6]' : 'text-lightmode-azul'} text-s flex items-center gap-x-4 cursor-pointer p-2 ${theme ? 'dark:hover:bg-darkmode-azul2/50' : 'hover:bg-lightmode-verdeagua1/75'} rounded-md mt-2 ${menu.spacing ? "mt-9" : "mt-2"}`}>
                            <span className='text-xl block float-left'>
                                {menu.icon}
                            </span>
                            <span className={`text-base flex-1 duration-200 ${!open && "hidden"}`}>
                                {menu.title}
                            </span>
                            {menu.submenu && open && (
                                <BsChevronDown className={`cursor-pointer ${theme ? 'dark:text-[#C6EDF6]' : 'text-lightmode-azul'}  ${submenuOpen && "rotate-180"}`} onClick={() => setSubmenuOpen(!submenuOpen)}/>
                            )}
                        </Link>
                        ) : (
                            <li key={index} className={`${theme ? 'dark:text-[#C6EDF6]' : 'text-lightmode-azul'} text-s flex items-center gap-x-4 cursor-pointer p-2 ${theme ? 'dark:hover:bg-darkmode-azul2/50' : 'hover:bg-lightmode-verdeagua1/75'} rounded-md mt-2 ${menu.spacing ? "mt-9" : "mt-2"}`}>
                            <span className='text-xl block float-left'>
                                {menu.icon}
                            </span>
                            <span className={`text-base flex-1 duration-200 ${!open && "hidden"}`}>
                                {menu.title}
                            </span>
                            {menu.submenu && open && (
                                <BsChevronDown className={`cursor-pointer ${theme ? 'dark:text-darkmode-verdeagua2' : 'text-lightmode-azul'}  ${submenuOpen && "rotate-180"}`} onClick={() => setSubmenuOpen(!submenuOpen)}/>
                            )}
                        </li>
                        )
                        }
                        
                        {menu.submenu && submenuOpen && open && (
                                <ul>
                                    {menu.submenuItems.map((subitem, index) => (
                                        <li key={index} className={`${theme ? 'text-[#C6EDF6]' : 'text-lightmode-azul'} text-sm flex items-center gap-x-4 cursor-pointer p-2 px-5 rounded-md mt-2`}>
                                            {subitem.title}
                                        </li>
                                    ))}
                                </ul>
                            )}
                    </>
                ))}
            </ul>
        </div>
        </>

    )
}

export {SideBar}