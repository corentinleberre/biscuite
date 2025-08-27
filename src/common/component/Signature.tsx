import { useTranslation } from "react-i18next";

function Signature() {
  const { i18n } = useTranslation();
  return (
    <>
      <div className="fixed bottom-0 left-1/2 -translate-y-1/2 -translate-x-1/2 hover:cursor-pointer">
        <div className="flex items-center space-x-3">
          <button className="text-gray-800 underline" onClick={() => i18n.changeLanguage("en")}>EN</button>
          <button className="text-gray-800 underline" onClick={() => i18n.changeLanguage("fr")}>FR</button>
          <a href="https://github.com/corentinleberre" target="_blank">
            <span className="text-gray-800">@corentinleberre</span>
          </a>
        </div>
      </div>
    </>
  );
}

export default Signature;
