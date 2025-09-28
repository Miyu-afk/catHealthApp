

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




const App =()=> {
  const [catManagement, setCatManagement] = useState<CatManagement[]>([]);
  const openModal = () => {
    const modal = document.getElementById("modal") as HTMLDialogElement | null;
    if (modal) {
      modal.showModal();
    }
  };
  const[recordedDates, setRecordedDates] = useState<string[]>([]);
  const[healthValueData, setHealthValueData]= useState<number[]>([]);
  const[catName, setCatName] = useState<string[]>([])

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
      const sortedCats = [...result].sort((a,b)=> {
        return new Date(a.record).getTime() - new Date(b.record).getTime()
      });
      const dates = sortedCats.map(item => item.record);
      const catNameData = sortedCats.map((item) => item.name);
      const VitalityData = sortedCats.map(item => item.vitality)
      setHealthValueData(VitalityData)
      setRecordedDates(dates);
      setCatName(catNameData);
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
      SuccessModalOpen={openModal} addHealth={addHealth} dates={recordedDates} healthValueData={healthValueData} catNameData={catName}
      />
      <SuccessModal catManagement={catManagement[0] || null}
      SuccessModalOpen={openModal} />
    </> 
  )
}

export default App;
