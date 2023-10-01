import { useState } from 'react';
import { Line } from 'react-chartjs-2';
import DataInput from './DataInput';
import{
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const LinesCharts = ({ graphIndex, onReceiveHoursData }) => {
  const [line1Data, setLine1Data] = useState({ labels: [], values: [] });
  const [line2Data, setLine2Data] = useState({ labels: [], values: [] });

  const addDataPoint = (line, label, value) => {
    if (label && value) {
      
      if (line === 1) {
        setLine1Data({
          labels: [...line1Data.labels, label],
          values: [...line1Data.values, parseInt(value)],
        });
      } else if (line === 2) {
        setLine2Data({
          labels: [...line2Data.labels, label],
          values: [...line2Data.values, parseInt(value)],
        });
      }
    
    const totalHours = line1Data.values.reduce((a, b) => a + b, 0)+ line2Data.values.reduce((a, b) => a + b, 0);
    onReceiveHoursData(totalHours, graphIndex);
    }
  };

  return (
    <div>
      {/* DataInput component for the first line */}
      <DataInput placeholder="Trabajo en equipo"
      onAddData={(label, value) => addDataPoint(1, label, value)} />
      {/* DataInput component for the second line */}
      <DataInput 
      placeholder="Trabajo solo"onAddData={(label, value) => addDataPoint(2, label, value)} />

      <div>
        <Line className='hover:cursor-pointer'
          data={{
            labels: line1Data.labels,
            datasets: [
                {
                    label: 'Trabajo en grupo',
                    data: line1Data.values,
                    tension: 0.5,
                    fill: true,
                    pointRadius: 5,
                    pointBorderColor: '#FFFF',
                    pointBackgroundColor: '#21E6C1',
                    borderColor: '#278EA5',
                    backgroundColor: '#21E6C1',
                    
                    
                    segment: {
                     borderColor: function (context) {
                        if (context.type === "segment") {
                            return context.p1DataIndex % 2 === 0 ? "#278EA5" : "#21E6C1";
                        }
                     },
                     backgroundColor: function (context) {
                        if (context.type === "segment") {
                            return context.p1DataIndex % 2 === 0 ? "#21E6C1" : "#278EA5";
                        }
                     },
                      
                     
                    },
                },
                  {
                    label: 'Trabajo solo',
                    data: line2Data.values,
                    tension: 0.5,
                    fill: true,
                    borderColor: '#0038FF',
                    backgroundColor: '#1F4287',
                    pointRadius: 5,
                    pointBorderColor: '#FFFF',
                    pointBackgroundColor: '#291E54',
                  segment: {
                        borderColor: function (context) {
                           if (context.type === "segment") {
                               return context.p1DataIndex % 2 === 0 ? "#071E3D" : "#1F4287";
                           }
                        },
                        backgroundColor: function (context) {
                           if (context.type === "segment") {
                               return context.p1DataIndex % 2 === 0 ? "#1F4287" : "#071E3D"; 
                           }
                        },
                        
                },
            },
            ],
          }}
          options={{
            scales: {
              y: {
                beginAtZero: true,
                grid: {
                  color: '#7EAA92', // Change grid color
                },
                ticks: {
                  color: '#000000', // Change text color (x axis)
                },
              },
              x: {
                beginAtZero: true,
                ticks: {
                  color: '#000000', // Change text color (y axis)
                },
              },
            },
            
          }}
        />
      </div>
    </div>
  );
};

export default LinesCharts;

