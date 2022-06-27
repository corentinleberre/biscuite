import { Action } from "./model";

const generateDoubleActions = (): Array<Action> => {
    return [1, 2, 3, 4, 5, 6].map((dice) => {
      return {
        dices: [dice, dice],
        label: `Vous donnez ${dice} goulées à la personne de votre choix`,
        drink: false,
      };
    });
  };
  
const dicesActions: Array<Action> = [
    {
      dices: [4, 1],
      label: 'Vous devenez la 4.1',
      drink: true,
    },
    {
      dices: [1, 1],
      label: 'Il va falloir inventer une nouvelle règle',
      drink: false,
    },
];
  
const sumActions: Array<Action> = [
    {
      sum: 9,
      label: 'Vous donnez 1 goulée au joueur précédent',
      drink: false,
    },
    {
      sum: 10,
      label: 'Vous buvez 1 goulée et passez votre tour',
      drink: true,
    },
    {
      sum: 11,
      label: 'Vous donnez 1 goulée au joueur suivant',
      drink: false,
    },
];

const ALL_ACTIONS = [...generateDoubleActions(), ...dicesActions, ...sumActions];

export default ALL_ACTIONS;