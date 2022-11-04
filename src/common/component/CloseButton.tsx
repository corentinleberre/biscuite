import { Link } from "react-router-dom";

function CloseButton(props: { icon: any; route: string }) {
  return (
    <div className="fixed top-2 right-2 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 hover:cursor-pointer">
      <Link to={props.route}>
        <img src={props.icon} />
      </Link>
    </div>
  );
}

export default CloseButton;
