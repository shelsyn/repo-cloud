import React from 'react';
import Pet from '../img/VirtualPET/cry-notepad.png'
import { Link } from 'react-router-dom';


const NumberError: React.FC = () => {
    return (
        <>
        <div className="grid place-items-center h-screen w-full">
           <div className='justify-center items-center'>
            <p className='flex font-[Cute Font] items-center text-[19rem] text-[#dafdff]' >4
            <img src={ Pet } alt="" className='w-[17rem] h-[17rem] m-6 bg-[#dafdff] rounded-full' />
            4</p>
            </div>
        <div className='flex flex-col'>
            <h2 className='text-[#eafbff] text-[5rem]'>There's NOTHING here..</h2>
        </div>
            <button className='pointer mb-6 bg-[#112d60] hover:bg-[#000] text-[#a6dbea] hover:text-[#daf] font-bold py-2 px-7 rounded-xl'>
                <Link to='/' className='text-[20px] p-2 border-transparent rounded-lg' >Go back home →</Link>
            </button>
        </div>
        </>
    )
}

export default NumberError;