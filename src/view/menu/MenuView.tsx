import { Link } from "react-router-dom";

function MenuView(){
    return (
        <div className="flex flex-col items-center justify-around bg-[#28DAD4] h-full">
          <div className="border-4 border-[#FF4571] rounded-full bg-[#4C4660] w-5/6 md:w-1/3">
              <h1 className="text-white text-center text-6xl font-semibold">BISCUITE</h1>
          </div>
          <div className="flex flex-col items-center justify-center w-full h-/3">
            <button type="button" className="rounded-full bg-[#FF4571] text-white text-3xl border-4 border-white p-3 m-3 w-2/3">
                <Link to="/game">🎲 Jouer</Link>
            </button>
            <button type="button" className="rounded-full bg-[#FF4571] text-white text-3xl border-4 border-white p-3 m-3 w-2/3">
                <Link to="/rules">📕 Règles</Link>
            </button>
          </div>
        </div>
    );
}

export default MenuView;