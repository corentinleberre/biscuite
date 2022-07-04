import { Link } from "react-router-dom";
import GameButton from "../../common/component/GameButton";

function MenuView(){

    const menu = [{text: "🎲 Jouer", link: "/game"}, {text: "📕 Règles", link: "/rules"}];

    return (
        <div className="flex flex-col items-center justify-around bg-[#28DAD4] h-full">
          <div className="border-4 border-[#FF4571] rounded-full bg-[#4C4660] w-5/6 md:w-1/3">
              <h1 className="text-white text-center text-6xl font-semibold">BISCUITE</h1>
          </div>
          <div className="flex flex-col items-center justify-center w-full h-/3">
            { menu?.map((value, index) => <GameButton key={index} text={value.text} link={value.link}></GameButton>)}
          </div>
        </div>
    );
}

export default MenuView;