import { useState } from "react";
import { Action } from "../../common/model/action.model";

function NewRule(props: { addRule: (action: Action) => void }) {
  const [dice1, setDice1] = useState<number>(0);
  const [dice2, setDice2] = useState<number>(0);
  const [label, setLabel] = useState<string>("");
  const [drink, setDrink] = useState<boolean>(false);

  const isFormValid = (): boolean => dice1 > 0 && dice2 > 0 && label.length > 0;

  return (
    <div className="flex flex-col bg-white w-5/6 rounded-lg drop-shadow-2xl p-2 m-2 md:w-1/3">
      <p className="text-center m-1">Création de la nouvelle règle :</p>
      <div className="flex flex-col">
        <div className="flex flex-row items-baseline m-1">
          <label htmlFor="dice1" className="w-2/3">
            Dès n°1
          </label>
          <input
            type="number"
            name="dice1"
            value={dice1}
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 w-1/3"
            onChange={(e) => setDice1(e.target.valueAsNumber)}
          />
        </div>
        <div className="flex flex-row items-baseline m-1">
          <label htmlFor="dice2" className="w-2/3">
            Dès n°2
          </label>
          <input
            type="number"
            name="dice2"
            value={dice2}
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 w-1/3"
            onChange={(e) => setDice2(e.target.valueAsNumber)}
          />
        </div>
        <div className="flex flex-col align-center m-1">
          <label htmlFor="description">Description de la règle</label>
          <input
            type="text"
            name="description"
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
          />
        </div>
        <div className="flex flex-row items-baseline m-1">
          <label htmlFor="drink" className="w-11/12">
            Quand la règle sort le lanceur boit
          </label>
          <input
            type="checkbox"
            name="drink"
            className="mr-2 leading-tight w-1/12"
            defaultChecked={drink}
            onChange={(_) => setDrink(!drink)}
          />
        </div>
        <div className="flex flex-col items-center">
          <button
            type="button"
            disabled={!isFormValid()}
            className="rounded-full bg-[#FF4571] hover:bg-[#FF4590] transition ease-in delay-150 hover:scale-105 duration-200 hover:cursor-pointer text-lg border-2 border-white p-1 m-1 text-white w-2/3"
            onClick={() =>
              props.addRule({
                dices: [dice1, dice2],
                label: label,
                drink: drink,
              })
            }
          >
            Ajouter la règle
          </button>
        </div>
      </div>
    </div>
  );
}

export default NewRule;
