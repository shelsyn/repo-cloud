import React, { useEffect, useRef, useState } from 'react';
import LinesCharts from './stats';
import { NavBar, NavBarMobile } from '../components/navbar';
import { SideBar } from '../components/sidebarhome';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import './Custom-Slick.css';
import Slider from 'react-slick';

const Stats: React.FC = () => {
  const sliderRef = useRef<Slider | null>(null);
  const [currentMonthIndex, setCurrentMonthIndex] = useState(getCurrentMonthIndex());
  const [totalHours, setTotalHours] = useState(Array(12).fill(0));
  const [theme, setTheme] = useState(true);

  function getCurrentMonthIndex() {
    const currentDate = new Date();
    return currentDate.getMonth();
  }

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(currentMonthIndex);
    }
  }, []);

  const receiveHoursData = (totalHours, graphIndex) => {
    setTotalHours((prevTotalHours) => {
      const newTotalHours = [...prevTotalHours];
      newTotalHours[graphIndex] = totalHours;
      return newTotalHours;
    });
  };

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (_, next) => setCurrentMonthIndex(next),
  };

  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  
  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedMonth = event.target.value;
    const monthIndex = monthNames.indexOf(selectedMonth);
    
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(monthIndex);
      setCurrentMonthIndex(monthIndex);
    }
  };

  const handlePreviousMonth = () => {
    const previousMonthIndex = (currentMonthIndex - 1 + 12) % 12; // Calculate the previous month
    setCurrentMonthIndex(previousMonthIndex); // Updates the index for the current month
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(previousMonthIndex); // Change the slider to the previous month
    }
  };

  

  return (
    <>
      <div className={`${theme ? 'bg-darkmode-azul' : 'bg-lightmode-blanco'}`}>
      <NavBar  theme={theme} changeTheme={() => {setTheme(!theme)}} />
      
      <NavBarMobile theme={theme}/>
      <div className='flex'>
        <SideBar theme={theme} />
        <div className='w-5/6 h-screen'>
          <div className='flex justify-around ml-10'>
            <div className='mt-8'>
              <button className={`mr-20 rounded-lg p-1 pl-2 pr-2 cursor-auto transform scale-105 transition-transform duration-300 hover:scale-110 ${theme ? 'bg-darkmode-verdeagua2' : 'bg-lightmode-verdeagua2'}`}>Total de horas: {totalHours[currentMonthIndex]} horas</button>
              <button className={`items-end rounded-tl-lg rounded-bl-lg p-1 mr-0.5 hover:bg-darkmode-verdeagua2 ${theme ? 'bg-darkmode-verdeagua1' : 'bg-[#4684F2]'}`}>La semana pasada</button>
              <button className={`items-end p-1 mr-0.5 hover:bg-darkmode-verdeagua2 ${theme ? 'bg-darkmode-verdeagua1' : 'bg-[#4684F2]'}`} onClick={handlePreviousMonth}>Mes pasado</button>
              <button className={`items-end rounded-br-lg rounded-tr-lg p-1 mr-20 hover:bg-darkmode-verdeagua2 ${theme ? 'bg-darkmode-verdeagua1' : 'bg-[#4684F2]'}`}>Año pasado</button>
              {/* Month drop down bar */}
            <select className={`items-end rounded-lg p-1 pl-2 pr-2 mr-20 hover:cursor-pointer ${theme ? 'bg-darkmode-verdeagua2' : 'bg-lightmode-verdeagua2'}`} onChange={handleMonthChange} value={monthNames[currentMonthIndex]}>
              {monthNames.map((month, index) => (
                <option key={index} value={month}>
                  {month}
                </option>
              ))}
            </select>
            </div>
          </div>
          <div className='flex justify-center max-w-3/5'>
            <Slider ref={sliderRef} className='w-4/5' {...settings} theme={theme}>
              {monthNames.map((_, index) => (
                <div key={index} className='flex justify-center mt-10 rounded'>
                  <div className={`text-center mt-2 p-2 font-bold text-lg ${theme ? 'bg-darkmode-azul2' : 'bg-[#044F96]'}`}>{monthNames[index]}</div>
                  <div className={`flex justify-center p-10 min-w-3/5 ${theme ? 'bg-darkmode-azul3' : 'bg-[#4C7FFF]'}`}>
                    <LinesCharts graphIndex={index} onReceiveHoursData={receiveHoursData}/>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default Stats;

