const randomDice = () => Math.floor(Math.random() * (7 - 1)) + 1;

export const dices = (): Array<number> => [randomDice(), randomDice()].sort();