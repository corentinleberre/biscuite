import { Action } from "../../common/model/action.model";
import { Result } from "../../common/model/result.model";

const play = (
    gameActions: Array<Action>,
    dices: Array<number>
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

    if (!actions.length || actions.some((element) => element.drink == true)) {
      actions.push({ label: '❌ Vous passez votre tour ❌', drink: false });
    }

    if(dices.some((value) => value == 4) || dices.some((value) => value == 1)) {
      actions.push({ label: '💩 La 4.1 boit une gorgée 💩', drink: false });
    }
    
    return { dices: dices, actions: actions };
};

export default play;