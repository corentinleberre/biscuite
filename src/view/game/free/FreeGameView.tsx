import { useEffect, useState } from "react";
import closeIcon from "../../../assets/icons/close.svg";
import CloseButton from "../../../common/component/CloseButton";
import DiceResult from "../../../common/component/DiceResult";
import { updateGamePlayed } from "../../../common/logic/analytics";
import { dices } from "../../../common/logic/dices";

function FreeGameView() {
  const [result, setResult] = useState<Array<number>>();

  useEffect(() => updateGamePlayed("free"), []);

  return (
    <div className="h-full flex flex-col items-center justify-center background-gradient relative">
      <CloseButton icon={closeIcon} route="/" />
      <div className="h-5/6 w-full md:w-2/3 flex flex-col items-center justify-center">
        <DiceResult dices={result} />
      </div>
      <div className="w-3/5 sm:w-2/3 md:w-1/2 flex flex-col items-center justify-center">
        <button
          type="button"
          className="rounded-full bg-white transition ease-in delay-150 hover:scale-105 duration-200 hover:cursor-pointer text-3xl font-black p-3 m-3 text-black w-full"
          onClick={() => setResult(dices())}>
          Jeter les dès
        </button>
      </div>
    </div>
  );
}

export default FreeGameView;
