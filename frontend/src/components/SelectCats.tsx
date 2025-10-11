import { useState } from "react";
import CheckButton from "./CheckButton";

interface CatManagement {
  id: number;
  name: string;
  mood: boolean | null;
  poop: boolean | null;
  meal: boolean | null;
  vitality: number;
  record: string;
  owner_id: number;
}

interface SelectCatsProps {
  catList:Record<number, CatManagement[]>;
  targetCat: CatManagement;
  selectTargetCat: (cat: CatManagement) => void;
}

const SelectCats = ({catList, targetCat, selectTargetCat} : SelectCatsProps) => {
 
  // const cats = catList[1]

  // for(let i = 0; i <= cats.length; i++){
  //   const catsName = cats[i].name;    
  // }

  if (!catList || Object.keys(catList).length < 2) {
    return null;
  }    

  const [selectedCat, setSelectedCat] = useState<CatManagement>(targetCat);
  
  return (
    <>
      <div className="dropdown dropdown-bottom dropdown-center">
        <div tabIndex={0} role="button" className="btn m-1">
          {selectedCat.name}ちゃん
        </div>       
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow-sm"
        >
          {Object.values(catList).flatMap((cats)=> 
          cats.map((cat)=>(
            <li key={cat.id}>
              <a className={targetCat.id === cat.id
              ? "font-bold text-blue-500" : "hover:bg-gray-100"}
              onClick={() => setSelectedCat(cat)}>
                {targetCat.name}ちゃん
              </a>
            </li>
          )))}
        </ul>
      </div>
      <CheckButton onClick={() => (selectTargetCat(selectedCat))} />
    </>
  );
};

export default SelectCats;
