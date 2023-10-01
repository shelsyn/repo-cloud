import React, { useState, createContext, useContext } from 'react';
import { AiOutlineStar } from "react-icons/ai";
import { BsFillSaveFill } from 'react-icons/bs';

// Crea un contexto con un valor inicial (puede ser un objeto vacío)
const SubheaderContext = createContext<{ boardName: string; setBoardName: React.Dispatch<React.SetStateAction<string>> }>({
  boardName: '',
  setBoardName: () => {},
});

interface SubheaderProps {
  className?: string;
  theme: boolean;
}

const Subheader: React.FC<SubheaderProps> = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [boardName, setBoardName] = useState('Tabler Name');
  const [errorMessage, setErrorMessage] = useState('');

  const handleNameClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBoardName(e.target.value);
    setErrorMessage('');
  };

  const handleInputBlur = () => {
    setIsEditing(false);
    if (boardName.trim() === '') {
      setErrorMessage('Campo Necesario!!');
      setBoardName('');
      setTimeout(() => {
        setErrorMessage('');
        setIsEditing(true);
      }, 2000);
    }
  };

  const handleInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setIsEditing(false);
      if (boardName.trim() === '') {
        setErrorMessage('Campo Necesario!!');
        setBoardName('');
        setTimeout(() => {
          setErrorMessage('');
          setIsEditing(true);
        }, 2000);
      }
    }
  };

  return (
    <SubheaderContext.Provider value={{ boardName, setBoardName }}>
      <div className={`${props.className} ${props.theme ? 'bg-[#053B50] text-darkmode-blanco' : 'bg-[#91C8E4] text-lightmode-azul'} flex bg-opacity-70 text-[14px] w-full justify-between items-center h-9 pl-5 `}>
        {isEditing ? (
          <input
            type="text"
            value={boardName}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            onKeyPress={handleInputKeyPress}
            autoFocus
          />
        ) : (
          <h4 className="flex" onClick={handleNameClick}>
            {errorMessage || boardName}
          </h4>
        )}
        <div className={`flex gap-3 m-2 `}>
          <button> 
          <span className="icon"><AiOutlineStar /></span>
          </button>
          <button onClick={handleNameClick}>
            <span><BsFillSaveFill/></span>
          </button>
        </div>
      </div>
    </SubheaderContext.Provider>
  );
};

export default Subheader;

// Exporta el hook personalizado para utilizar el contexto
export const useSubheaderContext = () => {
  return useContext(SubheaderContext);
};
