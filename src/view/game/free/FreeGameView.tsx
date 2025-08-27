import { useEffect, useState } from "react";
import closeIcon from "../../../assets/icons/close.svg";
import CloseButton from "../../../common/component/CloseButton";
import CloseModal from "../../../common/component/CloseModal";
import DiceResult from "../../../common/component/DiceResult";
import ThreeDiceRoll from "../../../common/component/ThreeDiceRoll";
import Modal from "../../../common/component/Modal";
import { updateGamePlayed } from "../../../common/logic/analytics";
import { dices } from "../../../common/logic/dices";

function FreeGameView() {
  const [result, setResult] = useState<Array<number>>();
  const [showModal, setShowModal] = useState(false);
  const [rolling, setRolling] = useState(false);

  useEffect(() => updateGamePlayed("free"), []);

  return (
    <>
      <div className="h-full flex flex-col items-center justify-center background-gradient relative">
        <CloseButton icon={closeIcon} action={() => setShowModal(true)} />
        <div className="h-5/6 w-full md:w-2/3 flex flex-col items-center justify-center">
          {rolling && (
            <div className="w-full md:w-2/3">
              <ThreeDiceRoll
                visible={rolling}
                result={result ? [result[0], result[1]] : undefined}
                onFinished={() => setRolling(false)}
              />
            </div>
          )}
          <DiceResult dices={result} />
        </div>
        <div className="w-3/5 sm:w-2/3 md:w-1/2 flex flex-col items-center justify-center">
          <button
            type="button"
            className="rounded-full bg-white transition ease-in delay-150 hover:scale-105 duration-200 hover:cursor-pointer text-3xl font-black p-3 m-3 text-black w-full"
            onClick={() => {
              setRolling(true);
              setResult(dices());
            }}
          >
            Jeter les dès
          </button>
        </div>
      </div>
      <Modal visible={showModal}>
        <CloseModal action={() => setShowModal(false)} />
      </Modal>
    </>
  );
}

export default FreeGameView;
