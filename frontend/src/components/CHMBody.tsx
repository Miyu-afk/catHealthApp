import SmileIcon from "./SmileIcon";
import SmileIconOn from "./SmileIcoOn";
import FrownIcon from "./FrownIcon";
import FrownIconOn from "./FrownIconOn";
import HealthGraph from "./HealthGraph";
import GoodButton from "./GoodButton";
import GoodButtonOn from "./GoodButtonOn";
import BadButton from "./BadButton";
import BadButtonOn from "./BadButtonOn";
import React, { useState } from "react";
import ToggleButton from "./ToggleButton";
import CheckButton from "./CheckButton";
import NoCheckButton from "./NoCheckButton";
import SelectCats from "./SelectCats";
import Memo from "./Memo";

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

interface CHMBodyProps {
  catManagement: CatManagement | null;
  SuccessModalOpen: () => void;
  addHealth: (data: Partial<CatManagement>) => void;
  dates: string[];
  healthValueData: number[];
  catNameData: string[];
}

const CHMBody = ({
  catManagement,
  SuccessModalOpen,
  addHealth,
  healthValueData,
  dates,
  catNameData,
}: CHMBodyProps) => {
  if (!catManagement) {
    return (
      <div className="flex justify-center mt-20">
        ...猫のデータを読み込み中...
      </div>
    );
  }

  const [smileOn, setSmileOn] = useState(false);
  const [frownOn, setFrownOn] = useState(false);
  const [poopGoodOn, setPoopGoodOn] = useState(false);
  const [poopBadOn, setPoopBadOn] = useState(false);
  const [mealBadOn, setMealBadOn] = useState(false);
  const [mealGoodOn, setMealGoodOn] = useState(false);
  const [healthValue, setHealthValue] = useState(50);
  const [checkButtonOn, setCheckButtonOn] = useState(false);
  const [noCheckButtonOn, setNoCheckButtonOn] = useState(false);
  const [memoData, setMemoData] = useState("");

  const healthObj = [
    {
      name: "きげん",
      tags: () => {
        return (
          <>
            <ToggleButton
              isOn={smileOn}
              onToggle={() => setSmileOn((prev) => !prev)}
              onIcon={<SmileIconOn />}
              offIcon={<SmileIcon />}
              onOrOff={frownOn}
            />

            <ToggleButton
              isOn={frownOn}
              onToggle={() => setFrownOn((prev) => !prev)}
              onIcon={<FrownIconOn />}
              offIcon={<FrownIcon />}
              onOrOff={smileOn}
            />
          </>
        );
      },
    },
    {
      name: "トイレ",
      tags: () => {
        return (
          <>
            <ToggleButton
              isOn={poopGoodOn}
              onToggle={() => {
                setPoopGoodOn((prev) => !prev);
              }}
              onIcon={<GoodButtonOn />}
              offIcon={<GoodButton />}
              onOrOff={poopBadOn}
            />

            <ToggleButton
              isOn={poopBadOn}
              onToggle={() => setPoopBadOn((prev) => !prev)}
              onIcon={<BadButtonOn />}
              offIcon={<BadButton />}
              onOrOff={poopGoodOn}
            />
          </>
        );
      },
    },
    {
      name: "ごはん",
      tags: () => {
        return (
          <>
            <ToggleButton
              isOn={mealGoodOn}
              onToggle={() => setMealGoodOn((prev) => !prev)}
              onIcon={<GoodButtonOn />}
              offIcon={<GoodButton />}
              onOrOff={mealBadOn}
            />

            <ToggleButton
              isOn={mealBadOn}
              onToggle={() => {
                setMealBadOn((prev) => !prev);
              }}
              onIcon={<BadButtonOn />}
              offIcon={<BadButton />}
              onOrOff={mealGoodOn}
            />
          </>
        );
      },
    },
    {
      name: "けんこう",
      tags: () => {
        return (
          <>
            <input
              className="mt-1"
              type="range"
              min="0"
              max="100"
              step="1"
              value={healthValue}
              onChange={(e) => {
                setHealthValue(Number(e.target.value));
              }}
            ></input>
            <span className="span-element text-xl pl-2">{healthValue}</span>
          </>
        );
      },
    },
  ];
  const allClean = () => {
    setSmileOn(false);
    setFrownOn(false);
    setPoopGoodOn(false);
    setPoopBadOn(false);
    setMealGoodOn(false);
    setMealBadOn(false);
    setHealthValue(50);
  };
  return (
    <>
      <div className="flex justify-center mt-20 text-2xl">
        <SelectCats catManagement={catManagement} />
      </div>
      <div className="flex justify-center mt-20 text-2xl">
        <p>おなまえ：{catManagement.name}ちゃん</p>
      </div>
      <div className="grid grid-cols-2 mt-10">
        {healthObj.map((obj) => (
          <>
            <div className="text-right mr-10">
              <span className="text-xl">{obj.name}</span>
            </div>
            <div className="flex justify-start items-center ">{obj.tags()}</div>
          </>
        ))}
      </div>
      <div className="flex justify-center">
      <Memo  />
      </div>

      {/* <div className="flex justify-center mt-15">
        <div>
          <span className="text-2xl">きげん</span>
        </div>
        <div className="flex ml-35">
          <ToggleButton
            isOn={smileOn}
            onToggle={() => setSmileOn((prev) => !prev)}
            onIcon={<SmileIconOn />}
            offIcon={<SmileIcon />}
            onOrOff={frownOn}
          />

          <ToggleButton
            isOn={frownOn}
            onToggle={() => setFrownOn((prev) => !prev)}
            onIcon={<FrownIconOn />}
            offIcon={<FrownIcon />}
            onOrOff={smileOn}
          />
        </div>
      </div>

      <div className="flex justify-center mt-5">
        <div>
          <span className="text-2xl">トイレ</span>
        </div>
        <div className="flex ml-35">
          <ToggleButton
            isOn={poopGoodOn}
            onToggle={() => {
              setPoopGoodOn((prev) => !prev);
            }}
            onIcon={<GoodButtonOn />}
            offIcon={<GoodButton />}
            onOrOff={poopBadOn}
          />

          <ToggleButton
            isOn={poopBadOn}
            onToggle={() => setPoopBadOn((prev) => !prev)}
            onIcon={<BadButtonOn />}
            offIcon={<BadButton />}
            onOrOff={poopGoodOn}
          />
        </div>
      </div>

      <div className="flex justify-center mt-5">
        <div>
          <span className="text-2xl">げんき</span>
        </div>
        <div className="flex ml-35">
          <ToggleButton
            isOn={mealGoodOn}
            onToggle={() => setMealGoodOn((prev) => !prev)}
            onIcon={<GoodButtonOn />}
            offIcon={<GoodButton />}
            onOrOff={mealBadOn}
          />

          <ToggleButton
            isOn={mealBadOn}
            onToggle={() => {
              setMealBadOn((prev) => !prev);
            }}
            onIcon={<BadButtonOn />}
            offIcon={<BadButton />}
            onOrOff={mealGoodOn}
          />
        </div>
      </div>

      <div className="flex justify-center mt-5">
        <div>
          <span className="text-2xl">けんこう</span>
        </div>
        <div className="flex items-center ml-35">
          <input
            className="mt-1"
            type="range"
            min="0"
            max="100"
            step="1"
            value={healthValue}
            onChange={(e) => {
              setHealthValue(Number(e.target.value));
            }}
          ></input>
          <span className="span-element text-xl pl-2">{healthValue}</span>
        </div>
      </div> */}

      <div className="flex justify-center mt-15">
        <CheckButton
          onClick={() => {
            const dataToSave: Partial<CatManagement> = {
              name: catManagement.name,
              vitality: healthValue,
              record: new Date().toISOString().split("T")[0],
              owner_id: catManagement.owner_id,
            };

            if (smileOn) dataToSave.mood = true;
            else if (frownOn) dataToSave.mood = false;

            if (poopGoodOn) dataToSave.poop = true;
            else if (poopBadOn) dataToSave.poop = false;

            if (mealGoodOn) dataToSave.meal = true;
            else if (mealBadOn) dataToSave.meal = false;

            addHealth(dataToSave);
            allClean();
            SuccessModalOpen();
          }}
        />
        <NoCheckButton
          onClick={() => {
            allClean();
          }}
        />
      </div>

      <div className="mt-10">
        <HealthGraph
          catManagement={catManagement}
          dates={dates}
          healthValueData={healthValueData}
          catNameData={catNameData}
        />
      </div>
    </>
  );
};

export default CHMBody;
