import { Link } from "react-router-dom";

function CloseModal(props: { action: Function }) {
  return (
    <>
      <div className="w-10/12 md:w-1/2  bg-white rounded-2xl p-5">
        <div className="flex flex-col items-center justify-center space-y-10">
          <p className="font-black text-2xl text-center">
            Vous êtes sur de vouloir quitter cette partie ?
          </p>
          <div className="flex flex-row space-x-10 items-center justify-center">
            <button
              type="button"
              className="bg-[#D9D9D9] p-2 rounded-2xl transition ease-in delay-150 hover:scale-105 duration-200 hover:cursor-pointer">
              <Link to={"/"}>
                <span className="font-black text-2xl text-center">Oui</span>
              </Link>
            </button>
            <button
              type="button"
              onClick={() => props.action()}
              className="bg-[#D9D9D9] p-2 rounded-2xl transition ease-in delay-150 hover:scale-105 duration-200 hover:cursor-pointer">
              <span className="font-black text-2xl text-center">Non</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CloseModal;
