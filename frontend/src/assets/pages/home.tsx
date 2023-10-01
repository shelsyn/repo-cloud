import { useState } from 'react';
import { NavBar, NavBarMobile } from '../components/navbar';
import { SideBar } from '../components/sidebarhome';
import { Workspace, NameWorkspace } from '../components/workspace';
import { Route, Routes, Link } from 'react-router-dom';
import Stadistics from './stadistics';
import Calendar from './calendar';
import Board from './board';
import { v4 as uuidv4 } from 'uuid';

function Home() {
  const [show, setShow] = useState(false);
  const [workspaces, setWorkspaces] = useState([]);
  const [theme, setTheme] = useState(true); 

  function addWorkspace(wksp) {
    const uuid = uuidv4();
    setWorkspaces([...workspaces, { title: wksp, isEditing: false, uuid }]);
  }

  function deleteWorkspace(title) {
    setWorkspaces(workspaces.filter(wksp => wksp.title !== title));
  }

  function editWorkspace(title) {
    setWorkspaces(workspaces.map(wksp =>
      wksp.title === title ? { ...wksp, isEditing: !wksp.isEditing } : wksp
    ));
  }

  function editName(title, item) {
    setWorkspaces(workspaces.map(wksp =>
      wksp === item ? { ...item, title, isEditing: !item.isEditing } : wksp
    ));
  }

  return (
    <>
      <NavBar theme={theme} changeTheme={() => setTheme(!theme)} />
      <NavBarMobile theme={theme} />
      <div>
        <Routes>
          <Route path='/inicio' element={<Home />} />
          <Route path='/Estadistica' element={<Stadistics />} />
          <Route path='/Calendario' element={<Calendar />} />
          <Route path='/boards/:uuid' element={<Board />} /> 
        </Routes>
      </div>
      <div className={`flex min-h-screen w-full ${theme ? 'dark:bg-[#031124]' : 'bg-[#E3F6EF]'}`}>
        <SideBar theme={theme} />
        <div className={`desktop:p-7 mobile:p-4 ${theme ? 'text-[#C6EDF6]' : 'text-lightmode-azul'} desktop:text-xl w-screen`}>
          <div className='py-3 z-2'>
            <h1 className=''>Bienvenido al gestor de tareas </h1>
            <ul></ul>
          </div>
          <div>
            <h1 className='pb-3'>Ingresa tu tarea </h1>
            <div className='workspace-container flex '>
              <ul></ul>
            </div>
            {!show ? (
              <button
                className={`cursor-pointer text-sm ${theme ? 'bg-darkmode-verdeagua2' : 'bg-lightmode-azul'} ${theme ? 'text-darkmode-azul2' : 'text-lightmode-blanco'} ${theme ? 'shadow-lg shadow-[#031124]' : 'shadow-lg shadow-[#dff5ed]'} p-2 rounded-md font-semibold`}
                onClick={() => setShow(!show)}
              >
                Agregar
              </button>
            ) : (
              <NameWorkspace addWorkspace={addWorkspace} close={() => setShow(!show)} theme={theme} />
            )}
            <ul>
              {workspaces.map((wksp, index) => (
                <li key={index}>
                  <Link
                    to={`/boards/${wksp.uuid}`}
                    className="cursor-pointer text-sm text-blue-500 hover:underline"
                  >
                    {wksp.title}
                  </Link>
                  <Workspace wksp={wksp} deleteWorkspace={deleteWorkspace} theme={theme} editWorkspace={editWorkspace} editName={editName} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
