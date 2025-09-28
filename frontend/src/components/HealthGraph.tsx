import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Ticks,
} from "chart.js";
import { getDate } from "date-fns";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface CatManagement {
  id:number,
  name:string,
  mood: boolean | null,
  poop:boolean | null,
  meal:boolean | null,
  vitality:number,
  record:string,
  owner_id:number
}

interface HealthGraphProps{
    catManagement: CatManagement | null;  
}

function HealthGraph({catManagement}:HealthGraphProps) {
  const today = new Date();
  const weekAgo = new Date();
  weekAgo.setDate(today.getDate()-6);
  const labels = Array.from({length:7}).map((_, i)=>{
  const pastDate = new Date(today);
  pastDate.setDate(today.getDate() - (6- i));
  const theMonth = today.getMonth() + 1;
  const day = pastDate.getDate();

  return `${theMonth}月${day}日`;
 });

  const HealthData = () => {

  }

  const graphData = {
    labels: labels,
    datasets: [
      {
        label: "けんこう度",
        data: [65, 59, 60, 81, 56, 55, 80],
        borderColor: "rgb(75, 192, 192)",
      },
    ],
  };

 const options = {
     scales: {
      y:{
        max: 100,
        min: 20,
        ticks: {
          stepSize: 20
      }
    }, 
    x:{      
    },
   },
   maintainAspectRatio: false
  };

  const divStyle: React.CSSProperties = {
    margin: "10px auto",
    width: "100%",
  };

  return (
    <div className="App" style={divStyle}>
      <Line
        data={graphData}
        options={options}
        id="chart-key"
      />
    </div>
  );
}

export default HealthGraph;