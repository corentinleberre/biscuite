import { Dispatch, SetStateAction } from "react";
import { Action, Result } from "../../common/model";

export const isKatinDrinking = (dices: Array<number>): boolean =>
  dices.some((value) => value == 4)
    ? !dices.some((value) => value == 1)
    : dices.some((value) => value == 1);

const play = (
  gameActions: Array<Action>,
  dices: Array<number>,
  someoneIsKatin: boolean,
  callback: Dispatch<SetStateAction<boolean>>
): Result => {
  const actions: Array<Action> = [...gameActions].filter((action) => {
    if (action.dices) {
      return (
        action.dices.sort()[0] == dices[0] && action.dices.sort()[1] == dices[1]
      );
    } else {
      return action.sum === dices.reduce((p, v) => p + v);
    }
  });

  if (dices[0] === 1 && dices[1] === 4) callback(true);

  if (someoneIsKatin && isKatinDrinking(dices))
    actions.push({ label: "💩 La 4.1 boit une gorgée 💩", drink: false });

  if (!actions.length || actions.some((element) => element.drink == true))
    actions.push({ label: "❌ Vous passez votre tour ❌", drink: false });

  return { dices: dices, actions: actions };
};

export default play;
