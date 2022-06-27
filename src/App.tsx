import { useState } from 'react'
import ALL_ACTIONS from './actions';
import { dices } from './dice';
import play from './game';
import { Action, Result } from './model';
import Rule from './Rule';

function App() {
  const [actions, setActions] = useState<Action[]>(ALL_ACTIONS);
  const [result, setResult] = useState<Result>();

  return (
    <div>
        { !result && (<p>Commencer le jeu</p>)}
        { result?.dices.map((dice, index) => <p key={index}>{dice}</p>)}
        { result?.actions.map((action, index) => <p key={index}>{action.label}</p>)}
        <button type="button" onClick={() => setResult((result) => result = play(actions, dices()))}>
          Jeter les dès
        </button>
        { result?.dices.reduce((p, v) => p + v) === 2 && (
          <>
            <p>Vous devez créer une nouvelle règle</p>
          </>
        )}
    </div>
  )
}

export default App;
