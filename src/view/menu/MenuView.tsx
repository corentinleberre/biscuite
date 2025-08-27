import GameButton from "../../common/component/GameButton";
import { useTranslation } from "react-i18next";

function MenuView() {
  const { t } = useTranslation();
  const menu = [
    { text: t("menu.play"), link: "/game/biscuite" },
    { text: t("menu.freeMode"), link: "/game/free" },
    { text: t("menu.rules"), link: "/rules" },
  ];

  return (
    <div className="flex flex-col items-center justify-around bg-[#28DAD4] h-full">
      <div className="flex flex-col items-center justify-center border-4 border-[#FF4571] rounded-full bg-[#4C4660] w-5/6 md:w-1/3 h-1/6">
        <h1 className="text-white text-6xl font-semibold">{t("menu.title")}</h1>
      </div>
      <div className="flex flex-col items-center justify-center w-5/6 md:w-2/3">
        {menu?.map((value, index) => (
          <GameButton
            key={index}
            text={value.text}
            link={value.link}
          ></GameButton>
        ))}
      </div>
    </div>
  );
}

export default MenuView;
