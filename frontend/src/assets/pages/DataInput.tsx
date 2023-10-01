import { useState } from 'react';

const DataInput = ({ onAddData, placeholder }) => {
  const [labelValue, setLabelValue] = useState('');
  const [value, setValue] = useState('');

  const addDataPoint = () => {
    if (value && labelValue) {
      onAddData(labelValue, parseInt(value));
      setLabelValue('');
      setValue('');
    }
  };

  return (
    <div className='pb-1 mb-2'>
      <input className='m-1 rounded-lg p-0.5 pl-1 bg-darkmode-blanco'
        type="number"
        placeholder={` ${placeholder}`}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <input className='m-1 rounded-lg p-0.5 pl-1 bg-darkmode-blanco'
        type="date"
        placeholder="Día de trabajo"
        value={labelValue}
        onChange={(e) => setLabelValue(e.target.value)}
      />
      <button className='ml-2 bg-darkmode-blanco rounded-lg p-0.5 pl-0.5 pl-2 pr-2 hover:bg-darkmode-verdeagua1' onClick={addDataPoint}>Valorar</button>
    </div>
  );
};

export default DataInput;


