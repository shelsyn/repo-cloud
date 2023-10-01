import { useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { TiTickOutline } from 'react-icons/ti';
import { AiFillEdit } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';
import { BoardModal } from './board';
import { BoardHomeView } from './board';



function Workspace({wksp, deleteWorkspace, editWorkspace, editName, theme} ) {
    const [boards, setBoards] = useState([]);
    const [openModal, setOpenModal] = useState(false);


    function addBoard(name, bgcolor) {
        setBoards([...boards, {name: name, bgcolor: bgcolor, isEditing: false}])
    }

    
    return (
        <>
        {openModal && <BoardModal closeModal={() => setOpenModal(!openModal)} addBoard={addBoard} theme={theme}/>}
        <div className='desktop:pl-4 py-3 h-full w-auto'>

            <div className='flex items-center pb-2'>
                {wksp.isEditing ? (<ChangeName editName={editName} wksp={wksp} theme={theme}/>) : <h2>{wksp.title}</h2>}
                <span className='px-1 pl-2 cursor-pointer' onClick={() => editWorkspace(wksp.title)}>{!wksp.isEditing && <AiFillEdit className={`${theme ? 'text-[#C6EDF6]' : 'text-lightmode-azul'}`}/>}</span>
                <span className='px-1 cursor-pointer' onClick={() => deleteWorkspace(wksp.title)}> <MdDelete className={`${theme ? 'text-[#C6EDF6]' : 'text-lightmode-azul'}`}/></span>
            </div>
            <ul className={`flex flex-row gap-2 overflow-x-auto ${theme ? 'text-darkmode-verdeagua2' : 'text-lightmode-azul'} rounded-md`}>
                {boards.slice(0).reverse().map((board, index) => <BoardHomeView name={board.name} bgcolor={board.bgcolor} key={index}/>)}
                <li className={`w-40 h-28 shrink-0 ${theme ? 'bg-darkmode-azul1' : 'bg-lightmode-azul'} rounded-md flex flex-row text-center items-center justify-center cursor-pointer`} onClick={() => setOpenModal(!openModal)}>
                  <FiPlus className={`text-xl text-center ${theme ? 'text-[#C6EDF6]' : 'text-lightmode-blanco'}`}/>
                </li>
            </ul>
        </div>
        </>
    )
}


function NameWorkspace({addWorkspace, close, theme}) {
    const [title, setTitle] = useState('');
    
    function handleSubmit(e) {
        e.preventDefault()

        addWorkspace(title)

        setTitle('')

        close()
    }

    return (
        <form onSubmit={handleSubmit} className='flex items-center mobile:text-sm'>
            <label className='pr-2' htmlFor="string">Titulo de la tarea:</label>
            <input className={`${theme ? ('bg-darkmode-azul1' && 'text-darkmode-verdeagua1') : ('bg-lightmode-azul' && 'text-lightmode-verdeagua1' && 'border-lightmode-azul')} rounded-md`} type="text" name='title' value={title} onChange={(e) => {
                setTitle(e.target.value) 
            }} required/>
            <button className={ `${theme ? 'bg-darkmode-verdeagua2' : 'bg-lightmode-azul'} ${theme ? 'text-darkmode-azul2' : 'text-lightmode-verdeagua1'} rounded-full text-center ml-2 p-1`} type='submit'><TiTickOutline/></button>
        </form>
    )
}


function ChangeName({editName, theme, wksp}) {
    const [newTitle, setNewTitle] = useState('');

    function handleSubmit(e) {
        e.preventDefault()

        editName(newTitle, wksp)

        setNewTitle('')

        wksp.isEditing = true;
    }

    return (
        <form onSubmit={handleSubmit} className='flex items-center desktop:pt-3 mobile:text-sm'>
            <label className='pr-2' htmlFor="string">New title:</label>
            <input className={`${theme ? ('bg-darkmode-azul1' && 'text-darkmode-verdeagua1') : ('bg-lightmode-azul' && 'text-lightmode-verdeagua1' && 'border-lightmode-azul')} rounded-md`} type="text" name='title' value={newTitle} onChange={(e) => {
                setNewTitle(e.target.value)
            }} required/>
            <button className={ `${theme ? 'bg-darkmode-verdeagua2' : 'bg-lightmode-azul'} ${theme ? 'text-darkmode-azul2' : 'text-lightmode-verdeagua1'} rounded-full ml-2 p-1`} type='submit'><TiTickOutline/></button>
        </form>
    )
}


export { Workspace, NameWorkspace, ChangeName }