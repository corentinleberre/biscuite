import dice1 from './assets/dices/red/1.svg'
import dice2 from './assets/dices/red/2.svg'
import dice3 from './assets/dices/red/3.svg'
import dice4 from './assets/dices/red/4.svg'
import dice5 from './assets/dices/red/5.svg'
import dice6 from './assets/dices/red/6.svg'

function Dice(props: {dice: number}) {

    const images = [dice1, dice2, dice3, dice4, dice5, dice6];

    return (
        <>
            <img className="m-2 drop-shadow-2xl" src={images[props.dice-1]}/>
        </>
    )
}

export default Dice;