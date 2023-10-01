import React, { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { TfiHome, TfiCheckBox } from "react-icons/tfi";
import { BiBell, BiBarChartAlt, BiCalendar, BiCategoryAlt, BiNetworkChart } from 'react-icons/bi';
import { PiFolderSimpleStar } from "react-icons/pi";
import '../pages/App.css'

interface SideBarProps {
}

const SideBar: React.FC<SideBarProps> = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState<boolean>(false); //Aca ya se incia al cerrar los celus

  const toggleSideBar = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };

  return (
    <nav className={`${isSideBarOpen ? 'w-52' : 'w-16'} bg-gradient-to-b from-darkmode-azul1 to-darkmode-verdeagua2 h-screen text-darkmode-verdeagua1`}>
      <div className="flex flex-col gap-3">
        <div className="text-[#CAEDFF] p-4 text-2xl flex justify-end">
          <button onClick={toggleSideBar}>
            <AiOutlineMenu />
          </button>
        </div>
        <ul className={`flex flex-col gap-5`}>
          <li className={`p-2 m-1`}>
            <a href="#" className="text-cyan-300 no-underline rounded-lg">
              <span className={`flex items-center gap-2 ${isSideBarOpen ? 'ml-2' : 'ml-2'}`}>
                <TfiHome />
                <span>{isSideBarOpen ? 'Home' : ''}</span>
              </span>
            </a>
          </li>
          <li className={`p-2 m-1`}>
            <a href="#" className="text-cyan-300 no-underline rounded-lg">
              <span className={`flex items-center gap-2 ${isSideBarOpen ? 'ml-2' : 'ml-2'}`}>
                <TfiCheckBox />
                <span className={`${isSideBarOpen ? 'ml-2' : 'hidden'}`}>mus tareas</span>
              </span>
            </a>
          </li>
          <li className={`p-2 m-1`}>
            <a href="#" className="text-cyan-300 no-underline rounded-lg">
              <span className={`flex items-center gap-2 ${isSideBarOpen ? 'ml-2' : 'ml-2'}`}>
                <BiBell />
                <span className={`${isSideBarOpen ? 'ml-2' : 'hidden'}`}>Inbox</span>
              </span>
            </a>
          </li>
          <li className={`p-2 m-1`}>
            <a href="#" className="text-cyan-300 no-underline rounded-lg">
              <span className={`flex items-center gap-2 ${isSideBarOpen ? 'ml-2' : 'ml-2'}`}>
                <BiBarChartAlt />
                <span className={`${isSideBarOpen ? 'ml-2' : 'hidden'}`}>Estadisticas</span>
              </span>
            </a>
          </li>
          <li className={`p-2 m-1`}>
            <a href="#" className="text-cyan-300 no-underline rounded-lg">
              <span className={`flex items-center gap-2 ${isSideBarOpen ? 'ml-2' : 'ml-2'}`}>
                <BiNetworkChart />
                <span className={`${isSideBarOpen ? 'ml-2' : 'hidden'}`}>Share</span>
              </span>
            </a>
          </li>
          <li className={`p-2 m-1`}>
            <a href="#" className="text-cyan-300 no-underline rounded-lg">
              <span className={`flex items-center gap-2 ${isSideBarOpen ? 'ml-2' : 'ml-2'}`}>
                <BiCalendar />
                <span className={`${isSideBarOpen ? 'ml-2' : 'hidden'}`}>Calendario</span>
              </span>
            </a>
          </li>
          <li className={`p-2 m-1`}>
            <a href="#" className="text-cyan-300 no-underline rounded-lg">
              <span className={`flex items-center gap-2 ${isSideBarOpen ? 'ml-2' : 'ml-2'}`}>
                <BiCategoryAlt />
                <span className={`${isSideBarOpen ? 'ml-2' : 'hidden'}`}>More</span>
              </span>
            </a>
          </li>
        </ul>
        <ul className={`flex flex-col gap-5`}>
          <li className={`p-2 m-1`}>
            <span className={`flex items-center gap-2 ${isSideBarOpen ? 'ml-2' : 'ml-2'}`}>
              <PiFolderSimpleStar />
              <span className={`${isSideBarOpen ? 'ml-2' : 'hidden'}`}>Favorite</span>
            </span>
          </li>
        </ul>
      </div>
    </nav> 
  );
};

export default SideBar;
