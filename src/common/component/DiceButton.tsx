import { useState } from "react";
import dice1 from "../../assets/dices/red/1.svg";
import dice2 from "../../assets/dices/red/2.svg";
import dice3 from "../../assets/dices/red/3.svg";
import dice4 from "../../assets/dices/red/4.svg";
import dice5 from "../../assets/dices/red/5.svg";
import dice6 from "../../assets/dices/red/6.svg";

function DiceButton() {
  const [dice, setDice] = useState(0);

  const incrementDice = () => (dice < 5 ? setDice(dice + 1) : setDice(1));

  const images = [dice1, dice2, dice3, dice4, dice5, dice6];

  return (
    <img
      onClick={incrementDice}
      className="h-full m-2 drop-shadow-2xl"
      src={images[dice]}
    />
  );
}
export default DiceButton;
