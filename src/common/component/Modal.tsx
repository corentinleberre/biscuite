function Modal(props: { children: any; visible: boolean }) {
  if (!props.visible) return null;

  return (
    <div className="fixed z-10 inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      {props.children}
    </div>
  );
}

export default Modal;
