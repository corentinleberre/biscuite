import { Action } from "../../common/model/action.model";

function GameCard(props: { action: Action }) {
  return (
    <div className="bg-white rounded-lg p-2 m-1 w-full">
      <p className="m-2 text-xl font-medium text-center">
        {props.action.label}
      </p>
    </div>
  );
}

export default GameCard;
