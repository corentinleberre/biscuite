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

  // TODO : refacto form en component  
  const [dice1, setDice1] = useState<number>(0);
  const [dice2, setDice2] = useState<number>(0);
  const [label, setLabel] = useState<string>('');
  const [drink, setDrink] = useState<boolean>(false);

  const addRule = (): void => {
    setActions((actions) => [...actions, { dices: [dice1, dice2], label: label, drink: true}]);
    setResult(play(actions, dices()));
    cleanForm();
  };

  const cleanForm = (): void => {
    setDice1(0);
    setDice2(0);
    setLabel('');
    setDrink(false);
  } 

  const isFormValid = (): boolean => dice1 > 0 && dice2 > 0 && label.length > 0;

  return (
    <div>
        { !result && (<p>Commencer le jeu</p>)}
        { result?.dices.map((dice, index) => <Dice dice={dice}></Dice>)}
        { result?.actions.map((action, index) => <p key={index}>{action.label}</p>)}
        <button type="button" disabled={createNewRule()} onClick={() => setResult(play(actions, dices()))}>
          Jeter les dès
        </button>
        { createNewRule() && (
          <>
            <p>Vous devez créer une nouvelle règle</p>
            <div>
              <div>
                <label htmlFor="dice1">Dès n°1</label>
                <input
                  type="number"
                  name='dice1'
                  value={dice1}
                  onChange={e => setDice1(e.target.valueAsNumber)}
                />
                <label htmlFor="dice2">Dès n°2</label>
                <input
                  type="number"
                  name='dice2'
                  value={dice2}
                  onChange={e => setDice2(e.target.valueAsNumber)}
                />
              </div>
              <div>
                <label htmlFor="description">Description</label>
                <input
                  type='text'
                  name='description'
                  value={label}
                  onChange={e => setLabel(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="drink">Drink</label>
                <input
                  type="checkbox"
                  name='drink'
                  defaultChecked={drink}
                  onChange={_ => setDrink(!drink)}
                />
              </div>
              <button type="button" disabled={!isFormValid()} onClick={() => addRule()}>Ajouter la règle</button>
            </div>
          </>
        )}
    </div>
  )
}

export default App;
