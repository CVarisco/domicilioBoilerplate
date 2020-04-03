import { Component } from "preact";
import Modal from "./Modal";
import PrivacyPolicy from "./PrivacyPolicy";
import LegalNotes from "./LegalNotes";

export default class Footer extends Component {
   state = {
      isPrivacyModalOpen: false,
      isLegalNotesModalOpen: false,
   };

   toggleModal = (modalName) => () => {
      this.setState({ [modalName]: !this.state[modalName] });
   };

   render(props, { isPrivacyModalOpen, isLegalNotesModalOpen }) {
      return (
         <div class="my-16">
            <p class="mb-5 mt-5 text-center">
               Developed with ❤️ by{" "}
               <a
                  class="text-orange-500"
                  href={process.env.PREACT_APP_DEV_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
               >
                  {process.env.PREACT_APP_DEV_NAME}
               </a>
               <br />
               Speciale ringraziamento a{" "}
               <a
                  class="text-orange-500"
                  href="https://tomma5o.com"
                  target="_blank"
                  rel="noopener noreferrer"
               >
                  Tomma5o
               </a>
            </p>
            <a
               href="https://github.com/tomma5o/domicilioBoilerplate"
               target="_blank"
               rel="noopener noreferrer"
               class="mb-5 text-xs block text-gray-500 hover:underline text-center"
            >
               Se vuoi crearlo per la tua città visita la pagina GitHub del
               progetto
            </a>
            <div class="flex mb-5 justify-center items-center">
               <p
                  onClick={this.toggleModal("isPrivacyModalOpen")}
                  class="text-xs block text-blue-500 hover:underline text-center cursor-pointer"
               >
                  Privacy Policy
               </p>
               <span class="mr-3 ml-3 text-blue-500"> | </span>
               <p
                  onClick={this.toggleModal("isLegalNotesModalOpen")}
                  class="text-xs block text-blue-500 hover:underline text-center cursor-pointer"
               >
                  Note Legali
               </p>
            </div>
            <Modal
               isOpen={isPrivacyModalOpen}
               closePopup={this.toggleModal("isPrivacyModalOpen")}
            >
               <PrivacyPolicy />
            </Modal>
            <Modal
               isOpen={isLegalNotesModalOpen}
               closePopup={this.toggleModal("isLegalNotesModalOpen")}
            >
               <LegalNotes />
            </Modal>
         </div>
      );
   }
}
