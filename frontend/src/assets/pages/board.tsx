import { useState, useEffect } from 'react';
import { SideBar } from '../components/sidebarhome';
import Subheader from '../components/subHeader';
import TaskManager from '../components/tablers'; 
import { NavBar, NavBarMobile } from '../components/navbar';

function Seccion2() {
  const [theme, setTheme] = useState(true); 
  const [tableros, setTableros] = useState([]);

  useEffect(() => {
    fetch("/boards")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener los tableros");
        }
        return response.json();
      })
      .then((data) => {
        setTableros(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []); 

  return (
    <div className={`${theme ? 'text-darkmode-blanco' : 'text-lightmode-azul'}`}>
      <NavBar theme={theme} changeTheme={() => { setTheme(!theme) }} />
      <NavBarMobile theme={theme} />
      <Subheader theme={theme} />
      <div className={`${theme ? 'bg-darkmode-azul1 text-darkmode-blanco' : 'bg-lightmode-blanco text-lightmode-azul'} flex h-screen`}>
        <SideBar theme={theme} />
        <TaskManager theme={theme} tableros={tableros} /> 
      </div>
    </div>
  );
}

export default Seccion2;
