import React, { Dispatch, SetStateAction} from "react";
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
    dates: string[];
    healthValueData: number[];
    catNameData: string[];
  }

function HealthGraph({catManagement, dates, healthValueData, catNameData}:HealthGraphProps) {
  const allDate = dates.map((date, i) => ({
    date,
    health: healthValueData[i],
    name: catNameData[i]
  }))
  const catData = allDate.filter((item) => {
    return item.name.includes(`${name}`)
  })
  const graphData = {
    labels: catData.map((item) => {
      const date = new Date(item.date.split(" ")[0])
      const month = (date.getMonth()+1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");
      return `${month}月${day}日`;
    }),
    datasets: [
      {
        label: "けんこう度",
        data: catData.map((item) => item.health),
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