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
  onSelect: (cat: CatManagement) => void;
}

const SelectCats = ({catList, targetCat, onSelect} : SelectCatsProps) => {
  const cats = Object.values(catList).flat();
  if (!catList || Object.keys(catList).length < 2) {
    return null;
  }  
  
  return (
    <>
      <div className="dropdown dropdown-bottom dropdown-center">
        <div tabIndex={0} role="button" className="btn m-1">
          {targetCat.name}ちゃん
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
              onClick={() => onSelect(cat)}>
                {cat.name}ちゃん
              </a>
            </li>
          )))}
        </ul>
      </div>
      <CheckButton onClick={() => onSelect(targetCat)} />
    </>
  );
};

export default SelectCats;
