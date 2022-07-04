import { Link } from "react-router-dom";

function GameButton(props: {text: string, link?: string}){
    return (
        <button type="button" className="rounded-full bg-[#FF4571] hover:bg-[#FF4590] text-white text-3xl border-4 border-white p-3 m-3 w-2/3">
            { props.link && <Link to={props.link}>{props.text}</Link> }
        </button>
    );
}

export default GameButton;