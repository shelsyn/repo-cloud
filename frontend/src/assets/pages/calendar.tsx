import React, { useState } from 'react';
import Calendar from 'react-calendar';
import "./calendar.css";
import { NavBar, NavBarMobile } from '../components/navbar';
import {SideBar} from '../components/sidebarhome';
import { FaStickyNote } from 'react-icons/fa';


type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

type Event = {
  date: Date;
  note: string;
};

const MyApp: React.FC = () => {
  const [value, onChange] = useState<Date>(new Date());
  const [note, setNote] = useState<string>("");
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEventIndex, setSelectedEventIndex] = useState<number | null>(null);
  const [theme, setTheme] = useState(true);

  const handleNoteInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNote(e.target.value);
  };

  const handleAddNote = () => {
    const newEvent: Event = {
      date: value,
      note,
    };

    setEvents([...events, newEvent]);

    setNote("");
  };

  const handleDeleteNote = () => {
    if (selectedEventIndex !== null) {
      const updatedEvents = [...events];
      updatedEvents.splice(selectedEventIndex, 1);
      setEvents(updatedEvents);
      setSelectedEventIndex(null);
    }
  };

  // Obtener las notas para la fecha seleccionada
  const selectedDateNotes = events.filter((event) =>
    event.date.toDateString() === value.toDateString()
  );

  return (
    <div>
      <NavBar theme={theme} changeTheme={() => {setTheme(!theme)}} />
      <NavBarMobile theme={theme}/>
      <div className={`flex antialiased sans-serif h-screen ${theme ? 'bg-darkmode-azul1 text-darkmode-blanco' : 'bg-lightmode-blanco text-lightmode-azul'} ${theme ? 'dark:text-darkmode-verdeagua1' : 'text-lightmode-azul'}`}>
        <SideBar theme={theme}/>
        <div className={'flex justify-center  m-auto '}>
          <div className='contenido-prueba flex' >
        <Calendar
            onChange={onChange}
             value={value}
             className={`${theme ? 'dark:text-darkmode-verdeagua1' : 'text-lightmode-azul'}`}
             tileContent={({ date, view }) => {
    // Verifica si hay notas para esta fecha
    const hasNotes = events.some(event => event.date.toDateString() === date.toDateString());

    // Si hay notas, muestra el ícono de la nota
    if (hasNotes) {
      return <FaStickyNote className="note-icon" />;
    }

    // Si no hay notas, no muestra ningún contenido
    return null;
  }}
/>

        </div>
        <div className='flex p-10 flex-col'>
        <div className='flex justify-center bg-darkmode-verdeagua1 p-8 shadow-md rounded-lg h-38 flex-col max-w-sm'>
          
         
           <input className='h-4'
             type="text"
            value={note}
            onChange={handleNoteInputChange}
            placeholder="Escribe tu nota aquí"
            />
            <button className='boton' onClick={handleAddNote}>Agregar Nota</button>
             <button className='boton' onClick={handleDeleteNote} disabled={selectedEventIndex === null}>
              Eliminar Nota
             </button>
              </div>
              <div className='container-notes flex'>
              <ul className="notes-list" style={{ maxHeight: '300px', overflowY: 'auto', maxWidth: '250px', overflowX: 'scroll' }}>
              {selectedDateNotes.map((event, index) => (
                <li
                  key={index}
                  className={`flex p-4 rounded-lg shadow-md ${
                    selectedEventIndex === index ? 'bg-darkmode-verdeagua2' : ''
                  }`}
                  onClick={() => setSelectedEventIndex(index)}
                >
                  Date: {event.date.toDateString()} - Note: {event.note}
                </li>
              ))}
            </ul>
              </div>
          </div>
        </div>
        </div>
    </div>
  );
};

export default MyApp;
