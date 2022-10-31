import GameCard from "./GameCard";

function GameMenuView() {
  const cards = [
    {
      emoji: "🎲",
      title: "Mode libre",
      paragraph: "Pas de règles ici, faites place a votre imagination.",
      navigate: "/game/free",
    },
    {
      emoji: "🥳",
      title: "Classique",
      paragraph:
        "Ce mode est le meilleur moyen de découvrir le jeu. Des combinaisons de dès bien traitres, créée vos règles, mais attention à ne pas devenir la 4.1 !",
      navigate: "/game/biscuite",
    },
    {
      emoji: "🍻",
      title: "Nrv",
      paragraph:
        "Des multiplicateurs de goulées aléatoires entrent en jeux... L’objectif est simple boire un maximum.",
      navigate: "/game/menu",
    },
    {
      emoji: "🥵",
      title: "Les problèmes",
      paragraph: "Préparez vous à briser des amitiés",
      navigate: "/game/menu",
    },
  ];
  return (
    <div className="background-gradient h-full">
      <div className="flex justify-center">
        <h1 className="text-3xl not-italic font-black m-5">MODE DE JEU</h1>
      </div>
      <div className="flex flex-col space-y-4 justify-between p-3">
        {cards.map((card, index) => (
          <GameCard key={index} {...card} />
        ))}
      </div>
    </div>
  );
}

export default GameMenuView;
