const Modal = ({ isOpen, children, closePopup }) => {
   return (
      <dialog
         class="fixed inset-x-0 top-0 w-screen h-screen"
         style={{
            background: "rgba(0, 0, 0, 0.3)",
            display: isOpen ? "initial" : "none"
         }}
         onClick={closePopup}
      >
         <div
            class="absolute w-5/6 bg-white rounded-lg p-6 shadow-lg overflow-auto"
            style={{
               top: "50%",
               left: "50%",
               transform: "translate(-50%, -50%)",
               maxHeight: "80%"
            }}
         >
            {children}
         </div>
      </dialog>
   );
};

export default Modal;
