import { useState } from "react";
import { Link } from "react-router-dom";
import closeIcon from "../../../assets/icons/close.svg";
import Dice from "../../../common/component/Dice";
import { dices } from "../../../common/logic/dices";
import { Result } from "../../../common/model";

function FreeGameView() {
  const [result, setResult] = useState<Array<number>>();

  const play = (dices: Array<number>): Result => {
    return { dices };
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#28DAD4] relative">
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
      <div className="h-1/6 w-1/3 flex flex-col items-center justify-center">
        <button
          type="button"
          className="rounded-full bg-[#FF4571] hover:bg-[#FF4590] transition ease-in delay-150 hover:scale-105 duration-200 hover:cursor-pointer text-3xl border-4 border-white p-3 m-3 text-white w-full"
          onClick={() => setResult(dices())}
        >
          Jeter les dès
        </button>
      </div>
    </div>
  );
}

export default FreeGameView;
