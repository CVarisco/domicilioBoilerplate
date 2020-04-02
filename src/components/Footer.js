import { Component } from "preact";
import Modal from "./Modal";
import PrivacyPolicy from "./PrivacyPolicy";

export default class Footer extends Component {
   state = {
      isPrivacyModalOpen: false
   };

   toggleModal = modalName => () => {
      this.setState({ [modalName]: !this.state[modalName] });
   };

   render(props, { isPrivacyModalOpen }) {
      return (
         <div>
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
            <p
               onClick={this.toggleModal("isPrivacyModalOpen")}
               class="mb-5 text-xs block text-blue-500 hover:underline text-center cursor-pointer"
            >
               Privacy Policy
            </p>
            <Modal
               isOpen={isPrivacyModalOpen}
               closePopup={this.toggleModal("isPrivacyModalOpen")}
            >
               <PrivacyPolicy />
            </Modal>
         </div>
      );
   }
}
