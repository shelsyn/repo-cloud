import { IoMdClose } from 'react-icons/io';
import { BsPersonFillAdd } from 'react-icons/bs';
import { TiTick } from 'react-icons/ti';
import { BsThreeDotsVertical } from 'react-icons/bs'
import { useState } from 'react';
import { SketchPicker } from 'react-color';

function BoardModal({closeModal, addBoard, theme}) {
    const [title, setTitle] = useState('');
    const [color, setColor] = useState('#fff');
    
    
    function handleSubmit(e) {
        e.preventDefault();
        addBoard(title, color)
        setTitle('')
        setColor('#fff')
        closeModal()
    }
    
    function handleKeyPress(e) {
        if(e.key === 'Enter') {
            handleSubmit(e)
        }
    }
    return (
        <div className='bg-[#000] bg-opacity-40 backdrop-blur-sm flex justify-center items-center fixed inset-0 z-10 left-0 w-screen h-100vh m-0'>
            <form className={`my-3 flex flex-col w-fit px-2 ${theme ? 'bg-darkmode-verdeagua1' : 'bg-lightmode-verdeagua1'}  ${theme ? 'text-darkmode-azul1' : 'text-lightmode-azul'} rounded-md drop-shadow-lg`} onSubmit={handleSubmit}>
                <button onClick={closeModal} className='place-self-end my-2'><IoMdClose/></button>
                <div className='flex pb-2'>
                    <label htmlFor="title" className='pr-3'>Title:</label>
                    <input type="text" name='title' required value={title} onChange={(e) => setTitle(e.target.value)} className='w-60 rounded-md' onKeyDown={handleKeyPress}/>
                </div>
                <label htmlFor="">Color: </label>
                <SketchPicker onChangeComplete={updated => setColor(updated.hex)} color={color} className='place-self-center'/>
                <div className='flex justify-between pt-2'>
                    <button><BsPersonFillAdd className='pb-1 font-xl'/></button>
                    <button type='submit' className='pb-1 font-l'><TiTick/></button>
                </div>
            </form>
        </div>
    )
}

function BoardHomeView({name, bgcolor}) {

    return (
        <>
            <li className="w-40 h-28 rounded-md mr-3 flex flex-col cursor-pointer shrink-0" style={{backgroundColor: bgcolor}}>
                <div className='place-self-end pr-1 pt-1'><BsThreeDotsVertical/></div>
                <span className='place-self-center mt-5 text-center'>{name}</span>
            </li>
        </>
    )
}

export {BoardHomeView, BoardModal}