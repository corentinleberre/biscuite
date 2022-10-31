import { useState } from "react";
import { Link } from "react-router-dom";
import closeIcon from "../../../assets/icons/close.svg";
import Dice from "../../../common/component/Dice";
import { dices } from "../../../common/logic/dices";

function FreeGameView() {
  const [result, setResult] = useState<Array<number>>();

  return (
    <div className="flex flex-col items-center justify-center h-full background-gradient relative">
      <div className="fixed top-2 right-2 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 hover:cursor-pointer">
        <Link to="/">
          <img src={closeIcon} />
        </Link>
      </div>
      <div className="h-5/6 flex flex-col items-center justify-center md:w-2/3">
        <div className="flex flex-col items-center justify-center h-1/6 w-full">
          {result && (
            <div className="flex flex-row">
              {result?.map((dice, index) => (
                <Dice dice={dice} key={index}></Dice>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="w-3/5 sm:w-2/3 md:w-1/2">
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
