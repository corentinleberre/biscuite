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
      onClick={() => navigate(props.navigate)}
      className="w-full bg-white rounded-2xl flex flex-col p-4 shadow-lg hover:cursor-pointer hover:scale-105 duration-300 relative"
    >
      {props.showLock && (
        <div className="absolute top-2 right-2 text-xl">
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
