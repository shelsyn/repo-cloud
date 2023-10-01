import React from 'react';
import NumberError from '../components/number404';


const Error: React.FC = () => {
    return (
        <>
        <div className='bg-gradient-to-r from-[#0D4671] to-[#92e1e2] h-screen'>
            <NumberError />
        </div>
        </>
    )
}

export default Error