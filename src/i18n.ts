import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  en: {
    translation: {
      menu: {
        play: "🎲 Play",
        freeMode: "🎲 Free mode",
        rules: "📕 Rules",
        title: "BISCUITE",
      },
      gameMenu: {
        heading: "GAME MODE",
        cards: {
          free: {
            title: "Free mode",
            paragraph: "No rules here, make room for your imagination.",
          },
          classic: {
            title: "Classic",
            paragraph:
              "This mode is the best way to discover the game. Treacherous dice combinations, create your rules, but be careful not to become the 4.1!",
          },
          nrv: {
            title: "Nrv",
            paragraph:
              "Random gulp multipliers come into play... The goal is simple drink as much as possible.",
          },
          problems: {
            title: "The problems",
            paragraph: "Get ready to break friendships",
          },
        },
      },
      common: {
        rollDice: "Roll the dice",
        confirmLeave: "Are you sure you want to quit this game?",
        yes: "Yes",
        no: "No",
      },
    },
  },
  fr: {
    translation: {
      menu: {
        play: "🎲 Jouer",
        freeMode: "🎲 Mode libre",
        rules: "📕 Règles",
        title: "BISCUITE",
      },
      gameMenu: {
        heading: "MODE DE JEU",
        cards: {
          free: {
            title: "Mode libre",
            paragraph: "Pas de règles ici, faites place a votre imagination.",
          },
          classic: {
            title: "Classique",
            paragraph:
              "Ce mode est le meilleur moyen de découvrir le jeu. Des combinaisons de dès bien traitres, créée vos règles, mais attention à ne pas devenir la 4.1 !",
          },
          nrv: {
            title: "Nrv",
            paragraph:
              "Des multiplicateurs de goulées aléatoires entrent en jeux... L’objectif est simple boire un maximum.",
          },
          problems: {
            title: "Les problèmes",
            paragraph: "Préparez vous à briser des amitiés",
          },
        },
      },
      common: {
        rollDice: "Jeter les dès",
        confirmLeave: "Êtes vous sur de vouloir quitter cette partie ?",
        yes: "Oui",
        no: "Non",
      },
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    supportedLngs: ["en", "fr"],
    interpolation: { escapeValue: false },
    detection: {
      order: ["querystring", "localStorage", "navigator"],
      caches: ["localStorage"],
    },
  });

export default i18n;

