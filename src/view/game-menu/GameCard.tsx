import { useNavigate } from "react-router-dom";

function GameCard(props: {
  title: string;
  emoji: string;
  paragraph: string;
  navigate: string;
  showLock?: boolean;
}) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => !props.showLock && navigate(props.navigate)}
      className={`w-full bg-white rounded-2xl flex flex-col p-4 shadow-lg duration-300 relative ${
        props.showLock 
          ? 'cursor-not-allowed opacity-75' 
          : 'hover:cursor-pointer hover:scale-105'
      }`}
    >
      {props.showLock && (
        <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm shadow-lg z-10">
          🔒
        </div>
      )}
      <div className="flex flex-row justify-center">
        <p className="font-black text-2xl">
          {props.emoji} {props.title}
        </p>
      </div>
      <div>
        <p className="text-center font-light">{props.paragraph}</p>
      </div>
    </div>
  );
}

export default GameCard;
