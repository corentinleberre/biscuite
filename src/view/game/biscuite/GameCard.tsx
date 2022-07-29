import { useEffect, useState } from "react";
import { Action } from "../../../common/model";

function GameCard(props: { action: Action }) {
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    setVisible(false);
    setTimeout(() => {
      setVisible(true);
    }, 700);
  }, [props.action]);

  return (
    <>
      {visible && (
        <div className="bg-white rounded-lg p-2 m-1 w-full transition-opacity duration-300 ease-in-out">
          <p className="m-2 text-xl font-medium text-center">
            {props.action.label}
          </p>
        </div>
      )}
    </>
  );
}

export default GameCard;
