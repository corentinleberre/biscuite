import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import closeIcon from "../../../assets/icons/close.svg";
import Dice from "../../../common/component/Dice";
import { dices } from "../../../common/logic/dices";
import { Action, Result } from "../../../common/model";
import supabase from "../../../supabaseClient";
import ALL_ACTIONS from "./actions";
import play from "./game-logic";
import GameCard from "./GameCard";
import NewRule from "./NewRule";
import { particlesOptions } from "./particles";

const updateGamePlayed = () => {
  supabase
    .from("analytics")
    .select("game_played")
    .eq("id", "1")
    .then((response) => {
      if (response.data) {
        const game_played = response.data[0].game_played;
        supabase
          .from("analytics")
          .update({ game_played: game_played + 1 })
          .eq("id", "1")
          .then();
      }
    });
};

function BiscuiteGameView() {
  useEffect(() => updateGamePlayed(), []);

  const particlesInit = async (main: any) => await loadFull(main);

  const [actions, setActions] = useState<Action[]>(ALL_ACTIONS);
  const [result, setResult] = useState<Result>();
  const [someoneIsKatin, setSomeoneIsKatin] = useState(false);

  const createNewRule = (): boolean =>
    result?.dices.reduce((p, v) => p + v) === 2;

  const addRule = (action: Action): void => {
    setActions((actions) => [...actions, action]);
    setResult(play(actions, dices(), someoneIsKatin, setSomeoneIsKatin));
  };

  const isNewKatin = (dices: Array<number>) => dices[0] === 1 && dices[1] === 4;

  return (
    <div className="flex flex-col items-center justify-center h-full background-gradient relative">
      {result && isNewKatin(result?.dices) && (
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={particlesOptions}
        />
      )}
      <div className="fixed top-2 right-2 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 hover:cursor-pointer">
        <Link to="/game/menu">
          <img src={closeIcon} />
        </Link>
      </div>
      <div className="h-5/6 flex flex-col items-center justify-center md:w-2/3">
        <div className="h-1/3 flex flex-col items-center justify-end w-full">
          {result?.dices && (
            <div className="flex flex-row">
              {result?.dices.map((dice, index) => (
                <Dice dice={dice} key={index}></Dice>
              ))}
            </div>
          )}
        </div>
        <div className="h-2/3 flex flex-col items-center justify-center w-full px-2">
          <div className="bg-white rounded-xl shadow-lg w-full">
            {result?.actions?.map((action, index) => (
              <GameCard action={action} key={index} />
            ))}
          </div>
        </div>
        {createNewRule() && <NewRule addRule={addRule}></NewRule>}
      </div>
      {!createNewRule() && (
        <div className="w-3/5 sm:w-2/3 md:w-1/2">
          <button
            type="button"
            className="rounded-full bg-white transition ease-in delay-150 hover:scale-105 duration-200 hover:cursor-pointer text-3xl font-black p-3 m-3 text-black w-full"
            onClick={() => {
              setResult(
                play(actions, dices(), someoneIsKatin, setSomeoneIsKatin)
              );
            }}
          >
            Jeter les dès
          </button>
        </div>
      )}
    </div>
  );
}

export default BiscuiteGameView;
