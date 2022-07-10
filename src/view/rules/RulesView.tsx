import { Link } from "react-router-dom";
import closeIcon from "../../assets/icons/close.svg";

function RulesView() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#28DAD4] relative">
      <div className="fixed top-2 right-2 hover:animate-pulse hover:cursor-pointer">
        <Link to="/">
          <img src={closeIcon} />
        </Link>
      </div>
      <div className="h-5/6 w-11/12 md:w-1/3 bg-white rounded-2xl ">
        <div className="text-[120px] mt-[-100px] text-center">🍻</div>
        <div>
          <h1 className="text-center">Le jeu du Biscuite</h1>
        </div>
      </div>
    </div>
  );
}

export default RulesView;
