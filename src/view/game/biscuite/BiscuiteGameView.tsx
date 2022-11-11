import { useEffect, useState } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import closeIcon from "../../../assets/icons/close.svg";
import CloseButton from "../../../common/component/CloseButton";
import CloseModal from "../../../common/component/CloseModal";
import DiceResult from "../../../common/component/DiceResult";
import Modal from "../../../common/component/Modal";
import { updateGamePlayed } from "../../../common/logic/analytics";
import { dices } from "../../../common/logic/dices";
import { Action, Result } from "../../../common/model";
import ALL_ACTIONS from "./actions";
import play from "./game-logic";
import GameCard from "./GameCard";
import NewRule from "./NewRule";
import { particlesOptions } from "./particles";

function BiscuiteGameView() {
  useEffect(() => updateGamePlayed("classic"), []);

  const particlesInit = async (main: any) => await loadFull(main);

  const [actions, setActions] = useState<Action[]>(ALL_ACTIONS);
  const [result, setResult] = useState<Result>();
  const [someoneIsKatin, setSomeoneIsKatin] = useState<boolean>(false);
  const [showModal, setShowModal] = useState(false);

  const createNewRule = (): boolean =>
    result?.dices.reduce((p, v) => p + v) === 2;

  const addRule = (action: Action): void => {
    setActions((actions) => [...actions, action]);
    setResult(play(actions, dices(), someoneIsKatin, setSomeoneIsKatin));
  };

  const isNewKatin = (dices: Array<number>) => dices[0] === 1 && dices[1] === 4;

  return (
    <>
      <div className="h-full flex flex-col items-center justify-center background-gradient">
        <CloseButton icon={closeIcon} action={() => setShowModal(true)} />
        {result && isNewKatin(result?.dices) && (
          <Particles
            id="tsparticles"
            init={particlesInit}
            options={particlesOptions}
          />
        )}
        <div className="h-5/6 w-full md:w-2/3 flex flex-col items-center justify-center">
          <DiceResult dices={result?.dices} />
          <div className="h-1/2 flex flex-col items-center justify-center w-full px-2">
            <div className="bg-white rounded-xl shadow-lg w-full">
              {result?.actions?.map((action, index) => (
                <GameCard action={action} key={index} />
              ))}
            </div>
          </div>
          {createNewRule() && <NewRule addRule={addRule}></NewRule>}
        </div>
        {!createNewRule() && (
          <div className="w-3/5 h-1/6 sm:w-2/3 md:w-1/2 flex flex-col items-center justify-center">
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
      <Modal visible={showModal}>
        <CloseModal action={() => setShowModal(false)} />
      </Modal>
    </>
  );
}

export default BiscuiteGameView;
