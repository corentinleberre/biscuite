function CloseButton(props: { icon: any; action: Function }) {
  return (
    <div
      onClick={() => props.action()}
      className="fixed top-2 right-2 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 hover:cursor-pointer"
    >
      <img src={props.icon} />
    </div>
  );
}

export default CloseButton;
