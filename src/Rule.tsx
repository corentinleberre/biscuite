import { useState } from "react";
import { Action } from "./model";

function Rule(props: { addRule: (action: Action) => void}) {

    const [dice1, setDice1] = useState<number>(0);
    const [dice2, setDice2] = useState<number>(0);
    const [label, setLabel] = useState<string>('');
    const [drink, setDrink] = useState<boolean>(false);

    const isFormValid = (): boolean => dice1 > 0 && dice2 > 0 && label.length > 0;

    return (
        <div className="flex flex-col bg-white w-5/6 rounded-lg drop-shadow-2xl p-2 m-4 md:w-1/3">
            <p>Création de la nouvelle règle :</p>
            <div>
              <div>
                <label htmlFor="dice1">Dès n°1</label>
                <input
                  type="number"
                  name='dice1'
                  value={dice1}
                  onChange={e => setDice1(e.target.valueAsNumber)}
                />
              </div>
              <div>
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
              <button type="button" disabled={!isFormValid()} onClick={() => props.addRule({dices: [dice1, dice2], label: label, drink: drink})}>Ajouter la règle</button>
            </div>
        </div>
    );
}

export default Rule;