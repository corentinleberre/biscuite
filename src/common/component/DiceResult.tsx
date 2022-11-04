import Dice from "./Dice";

function DiceResult(props: { dices: Array<number> | undefined }) {
  return (
    <div className="h-1/6 w-full flex flex-col items-center justify-center ">
      {props.dices && (
        <div className="w-5/6 sm:w-2/3 md:w-1/2 flex flex-row">
          {props.dices?.map((dice, index) => (
            <Dice dice={dice} key={index}></Dice>
          ))}
        </div>
      )}
    </div>
  );
}

export default DiceResult;
