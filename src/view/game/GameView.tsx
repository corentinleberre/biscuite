import { useState } from 'react'
import NewRule from './NewRule';
import ALL_ACTIONS from './actions';
import Dice from './Dice';
import { dices } from './dicesLogic';
import play from './game';
import { Action } from '../../common/model/action.model';
import { Result } from '../../common/model/result.model';
import { Link } from 'react-router-dom';
import closeIcon from '../../assets/icons/close.svg';

function GameView() {
  const [actions, setActions] = useState<Action[]>(ALL_ACTIONS);
  const [result, setResult] = useState<Result>();

  const createNewRule = (): boolean => result?.dices.reduce((p, v) => p + v) === 2;

  const addRule = (action: Action): void => {
    setActions((actions) => [...actions, action]);
    setResult(play(actions, dices()));
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#28DAD4] relative">
      <div className="fixed top-2 right-2">
        <Link to="/"><img src={closeIcon}/></Link>
      </div>
      { result?.dices && (
        <div className="flex flex-row">
          { result?.dices.map((dice, index) => <Dice dice={dice} key={index}></Dice>)}
        </div>
      )}
      { result?.actions.map((action, index) => 
        <div className="bg-white w-5/6 rounded-lg drop-shadow-2xl p-2 m-1 md:w-1/3">
          <p className="m-2 text-xl font-medium text-center" key={index}>{action.label}</p>
        </div>
      )}
      { !createNewRule() && (
        <button type="button" className="rounded-full bg-[#FF4571] text-white text-3xl border-4 border-white p-3 m-3" onClick={() => setResult(play(actions, dices()))}>
          Jeter les dès 
        </button>
      )}
      { createNewRule() && <NewRule addRule={addRule}></NewRule>}
    </div>
  )
}

export default GameView;
