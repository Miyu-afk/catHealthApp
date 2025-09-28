

import CHMBody from './components/CHMBody';
import CHMHeader from './components/CHMHeader';
import SuccessModal from './components/SuccessModal'
import {useState, useEffect} from 'react';
import React from "react";



const API_URL = 'http://localhost:3000/cats'

interface CatManagement{
  id:number,
  name:string,
  mood: boolean | null,
  poop:boolean | null,
  meal:boolean | null,
  vitality:number,
  record:string,
  owner_id:number
}

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


const App =()=> {
  const [catManagement, setCatManagement] = useState<CatManagement[]>([]);
  const [date, setDate] = useState(new Date())
  const openModal = () => {
    const modal = document.getElementById("modal") as HTMLDialogElement | null;
    if (modal) {
      modal.showModal();
    }
  };
  const[HealthData, setHealthData]= useState<number[]>([]);

useEffect(() => {
  fetchCat();
}, []);

    const fetchCat=() => {
    fetch(API_URL)
    .then((responseData) => {
      return responseData.json();
    })
    .then((result:CatManagement[]) => {
      setCatManagement(result);
      const data= result.map(item => item.vitality);
      const VitalityData = data.sort((a, b) => new Date(a.record).getTime() - new Date(b.record).getTime()).map(item => item.vitality)
    });
  };

  const addHealth = (newHealthData:Partial<CatManagement>) => {
  fetch(API_URL, {
    body:JSON.stringify(newHealthData),
    method: 'POST',
    headers:{
      'Content-Type': 'application/json',
    },
  })
};

  
  return (
    <>
      <CHMHeader />
      <CHMBody catManagement={catManagement[0] || null}
      SuccessModalOpen={openModal} addHealth={addHealth}
      />
      <SuccessModal catManagement={catManagement[0] || null}
      SuccessModalOpen={openModal} />
    </> 
  )
}

export default App;
