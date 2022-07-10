import { useState } from 'react'
import NewRule from './NewRule';
import ALL_ACTIONS from './actions';
import Dice from './Dice';
import { dices } from './dices-logic';
import play from './game-logic';
import { Action } from '../../common/model/action.model';
import { Result } from '../../common/model/result.model';
import { Link } from 'react-router-dom';
import closeIcon from '../../assets/icons/close.svg';
import GameCard from './GameCard';

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
      <div className="fixed top-2 right-2 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 hover:cursor-pointer">
        <Link to="/"><img src={closeIcon}/></Link>
      </div>
      { result?.dices && (
        <div className="flex flex-row">
          { result?.dices.map((dice, index) => <Dice dice={dice} key={index}></Dice>)}
        </div>
      )}
      { result?.actions.map((action, index) => <GameCard action={action} key={index}/>
      )}
      { !createNewRule() && (
        <button type="button" className="rounded-full bg-[#FF4571] hover:bg-[#FF4590] transition ease-in delay-150 hover:scale-105 duration-200 hover:cursor-pointer text-3xl border-4 border-white p-3 m-3 w-2/3 md:w-3/12 text-white" onClick={() => setResult(play(actions, dices()))}>
          Jeter les dès 
        </button>
      )}
      { createNewRule() && <NewRule addRule={addRule}></NewRule>}
    </div>
  )
}

export default GameView;
