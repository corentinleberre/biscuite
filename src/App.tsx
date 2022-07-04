import { useState } from 'react'
import ALL_ACTIONS from './actions';
import Dice from './Dice';
import { dices } from './dicesLogic';
import play from './game';
import { Action, Result } from './model';
import Rule from './Rule';

function App() {
  const [actions, setActions] = useState<Action[]>(ALL_ACTIONS);
  const [result, setResult] = useState<Result>();

  const createNewRule = (): boolean => result?.dices.reduce((p, v) => p + v) === 2;

  const addRule = (action: Action): void => {
    setActions((actions) => [...actions, action]);
    setResult(play(actions, dices()));
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
        { !result && (<p>Commencer le jeu</p>)}
        { result?.dices && (
          <div className="flex flex-row">
            { result?.dices.map((dice, index) => <Dice dice={dice} key={index}></Dice>)}
          </div>
        )}
        { result?.actions.map((action, index) => <p key={index}>{action.label}</p>)}
        <button type="button" className="rounded-full color-red" disabled={createNewRule()} onClick={() => setResult(play(actions, dices()))}>
          Jeter les dès
        </button>
        { createNewRule() && <Rule addRule={addRule}></Rule>}
    </div>
  )
}

export default App;
