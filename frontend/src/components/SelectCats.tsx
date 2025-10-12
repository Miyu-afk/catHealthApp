import { useState } from "react";
import CheckButton from "./CheckButton";
import styles from "../css/Body.module.scss";

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
  catList: Record<number, CatManagement[]>;
  targetCat: CatManagement;
  selectTargetCat: (cat: CatManagement) => void;
}

const SelectCats = ({
  catList,
  targetCat,
  selectTargetCat,
}: SelectCatsProps) => {
  // const cats = catList[1]

  // for(let i = 0; i <= cats.length; i++){
  //   const catsName = cats[i].name;
  // }

  if (!catList || Object.keys(catList).length < 2) {
    return null;
  }

  console.log(catList[1]);

  const [selectedCat, setSelectedCat] = useState<CatManagement>(targetCat);

  return (
    <>
      <select id={styles.selectId} defaultValue="Color scheme" className="select select-accent">
        <option disabled={true}></option>
        {Object.values(catList).flatMap((cats)=> 
          cats.map((cat)=>
        <a
          className={
            targetCat.id === cat.id
              ? "font-bold text-blue-500"
              : "hover:bg-gray-100"
          }
          onClick={() => setSelectedCat(cat)}
        >
          {targetCat.name}ちゃん
        </a>
          ))}
      </select>
      <CheckButton onClick={() => selectTargetCat(selectedCat)} />
    </>
  );
};

export default SelectCats;
