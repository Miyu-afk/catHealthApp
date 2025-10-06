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
}

const SelectCats = (props: SelectCatsProps) => {
  if (!props.catList || Object.keys(props.catList).length === 0) {
    return null;
  }
  return (
    <>
      <div className="dropdown dropdown-bottom dropdown-center">
        <div tabIndex={0} role="button" className="btn m-1">
          どのこにする？
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
        >
          <li>
            <a>{props.catList}</a>
          </li>
          <li>
            <a>{props.catList}</a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default SelectCats;
