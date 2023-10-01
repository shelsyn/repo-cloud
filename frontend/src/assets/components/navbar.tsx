import { useState } from 'react';
import { BsFillBellFill } from 'react-icons/bs';
import { FaUser } from 'react-icons/fa';
import { MdLightMode } from 'react-icons/md';
import { MdDarkMode } from 'react-icons/md';
import { AiFillHome } from 'react-icons/ai';
import { ImStatsDots } from 'react-icons/im';
import { BsFillCalendarFill } from 'react-icons/bs';
import { BsGearFill } from 'react-icons/bs';
import { BiSolidHelpCircle } from 'react-icons/bi';
import { MdLogout } from 'react-icons/md';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import { CgMenu } from 'react-icons/cg';
import logodark from '../img/taks.png';
import logolight from '../img/taks.png';

function NavBar({theme, changeTheme}) {
    const [open, setOpen] = useState(false);

    const sectionsDesktop = [
        {name: 'Profile', icon: <FaUser/>},
        {name: 'Help', icon: <BiSolidHelpCircle/>},
        {name: 'Logout', icon: <MdLogout/>, path: '/login'}
    ]
// as
    return (
        <>        
            <nav className={`${theme ? 'bg-darkmode-azul1' : 'bg-lightmode-blanco'} desktop:flex hidden text-m justify-between leading-normal content-center font-medium ${theme ? 'text-[#C6EDF6]' : 'text-lightmode-azul'}`}>
                <div className='flex items-center'>
                    <img src={theme ? logodark : logolight} alt="logo" className="w-30 h-10 pl-2"/>
                    <CustomLink to='/' className='px-3 cursor-pointer'>Agregar tarea +</CustomLink>
              
                </div>
                
                <div className={`flex pr-2 text-xl ${theme ? 'text-[#C6EDF6]' : 'text-lightmode-azul'} flex-row items-center`}>
                    <a className='px-2 cursor-pointer' onClick={() => {changeTheme(!theme)} }>
                        {theme ? <MdLightMode/> : <MdDarkMode/>}
                    </a>
                    <a className='px-2 cursor-pointer'><BsFillBellFill/></a>
                    <a className='px-2 cursor-pointer' onClick={() => setOpen(!open)}><FaUser/></a>
                </div>
            </nav>
            {open && (
                <ul className={`${theme ? 'dark:bg-darkmode-azul1' : 'bg-lightmode-blanco'} ${theme ? 'text-[#C6EDF6]' : 'text-lightmode-azul'} hidden desktop:flex flex-col absolute right-0 top-10 z-20 text-m rounded-b-lg py-2 text-center`}>
                    {sectionsDesktop.map((section, index) => 
                        (
                            section.hasOwnProperty('path') ? (
                                <Link key={index} to={section.path} className='flex px-2 cursor-pointer'>
                                    <span className='px-1'>{section.icon}</span>{section.name}
                                </Link>
                            ) : (
                                <li key={index} className='flex px-2 cursor-pointer'>
                                    <span className='px-1'>{section.icon}</span>{section.name}
                                </li>
                            )
                        )
                    )}

                </ul>
            )}
        </>
    )
}




function NavBarMobile({theme}) {
    const [open, setOpen] = useState(false);

    const sectionsMobile = [
        {name: 'Home', icon: <AiFillHome/>, path: '/'},
        {name: 'Stadistics', icon: <ImStatsDots/>, path: '/stats'},
        {name: 'Calendar', icon: <BsFillCalendarFill/>, path: '/calendar'},
        {name: 'Config', icon: <BsGearFill/>},
        {name: 'Help', icon: <BiSolidHelpCircle/>},
        {name: 'Logout', icon: <MdLogout/>, path: '/login'}   
    ]

    return (
    <>  
    <nav className={`mobile:flex hidden justify-between ${theme ? 'dark:bg-darkmode-azul1' : 'bg-lightmode-blanco'} ${theme ? 'text-[#C6EDF6]' : 'text-lightmode-azul'}`}>
       <img src={theme ? logodark : logolight} alt="logo" className="w-30 h-10 pl-2"/>
       
       <div className={`${theme ? 'dark:text-[#C6EDF6]' : 'text-lightmode-azul'} flex-row items-center flex pr-2 text-xl`}>
            <a className='px-2 cursor-pointer'><BsFillBellFill/></a>
            <a className='px-2 cursor-pointer' onClick={() => setOpen(!open)}><CgMenu/></a>
       </div>
    </nav>
    {open && (
        <ul className={`${theme ? 'bg-darkmode-azul1' : 'bg-lightmode-blanco'} ${theme ? 'text-[#C6EDF6]' : 'text-lightmode-azul'} desktop:hidden flex flex-col absolute right-0 text-m rounded-b-lg w-40 py-2`}>
            {
                sectionsMobile.map((section, index) => (
                    
                    section.hasOwnProperty('path') ? (
                        <Link to={section.path} className='flex' key={index}>
                            <span className='px-2'>
                                {section.icon}
                            </span>
                            {section.name}
                        </Link>
                    ) : (
                        <li className='flex' key={index}>
                            <span className='px-2'>{section.icon}</span>
                            {section.name}
                        </li>
                    )
                    
                ))
            }

        </ul>    
    )}
    </> 
    )
}

function CustomLink({to, children, ...props}) {
    const resolvedPath = useResolvedPath(to);
    const isActive = useMatch({path: resolvedPath.pathname, end: true})
    
    return (
        <li className={isActive ? "active" : ""}>
            <Link to={to} {...props}>
            {children}
            </Link>

        </li>
    )
}
export { NavBar, NavBarMobile }