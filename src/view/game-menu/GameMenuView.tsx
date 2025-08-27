import Signature from "../../common/component/Signature";
import GameCard from "./GameCard";
import { useTranslation } from "react-i18next";

function GameMenuView() {
  const { t } = useTranslation();
  const cards = [
    {
      emoji: "🎲",
      title: t("gameMenu.cards.free.title"),
      paragraph: t("gameMenu.cards.free.paragraph"),
      navigate: "/game/free",
    },
    {
      emoji: "🥳",
      title: t("gameMenu.cards.classic.title"),
      paragraph: t("gameMenu.cards.classic.paragraph"),
      navigate: "/game/biscuite",
    },
    {
      emoji: "🍻",
      title: t("gameMenu.cards.nrv.title"),
      paragraph: t("gameMenu.cards.nrv.paragraph"),
      navigate: "/game/menu",
    },
    {
      emoji: "🥵",
      title: t("gameMenu.cards.problems.title"),
      paragraph: t("gameMenu.cards.problems.paragraph"),
      navigate: "/game/menu",
    },
  ];
  return (
    <>
      <div className="background-gradient h-full">
        <div className="flex justify-center">
          <h1 className="text-3xl not-italic font-black m-5">{t("gameMenu.heading")}</h1>
        </div>
        <div className="flex flex-col space-y-4 justify-between px-[4%]">
          {cards.map((card, index) => (
            <GameCard key={index} {...card} />
          ))}
        </div>
      </div>
      <Signature />
    </>
  );
}

export default GameMenuView;
