import Dialog from "../../components/Dialog";

const PhoneNumbersDialog = ({ isOpen, telNumbers, closePopup }) => {
   return (
      <Dialog isOpen={isOpen} closePopup={closePopup}>
         {telNumbers.map(tel => (
            <a
               href={`tel:${tel}`}
               class="block rounded-lg bg-gray-200 p-5 text-lg font-semibold text-gray-700 my-5"
            >
               <span
                  class="inline-block mx-2 w-8 h-8 bg-green-300 text-center leading-8 rounded-lg cursor-pointer"
                  role="img"
                  aria-label="telephone"
               >
                  📞
               </span>
               <span>{tel}</span>
            </a>
         ))}
         <div class="w-full text-center">
            <button
               class="my-2 bg-red-500 inline-block hover:bg-red-700 text-white font-bold px-5 py-3 rounded"
               onClick={closePopup}
            >
               Chiudi
            </button>
         </div>
      </Dialog>
   );
};

export default PhoneNumbersDialog;
