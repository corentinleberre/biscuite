import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/icons/logo.svg";

function SplashscreenView() {
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate("/game/menu");
    }, 2500);

    return () => clearTimeout(timeout);
  });

  return (
    <div className="flex flex-col items-center justify-center splashcreen-gradient h-full">
      <img
        className="rotate-center m-2 drop-shadow-xl w-1/2 sm:w-1/3 md:w-1/5"
        src={logo}
      />
    </div>
  );
}

export default SplashscreenView;
