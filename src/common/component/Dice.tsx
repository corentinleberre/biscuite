import { useEffect, useState } from "react";
import dice1 from "../../assets/dices/red/1.svg";
import dice2 from "../../assets/dices/red/2.svg";
import dice3 from "../../assets/dices/red/3.svg";
import dice4 from "../../assets/dices/red/4.svg";
import dice5 from "../../assets/dices/red/5.svg";
import dice6 from "../../assets/dices/red/6.svg";
import mystery from "../../assets/dices/red/mystery.svg";

function Dice(props: { dice: number }) {
  const [dice, setDice] = useState(0);

  useEffect(() => {
    setDice(0);
    setTimeout(() => {
      setDice(props.dice);
    }, Math.floor(Math.random() * 200) + 500);
  }, [props]);

  const images = [mystery, dice1, dice2, dice3, dice4, dice5, dice6];

  return (
    <>
      <img className="m-2 drop-shadow-lg" src={images[dice]} />
    </>
  );
}

export default Dice;
