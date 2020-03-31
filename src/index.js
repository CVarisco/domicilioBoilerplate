import { h, Component, createContext, Fragment } from "preact";
import { Router } from "preact-router";
import { Link } from "preact-router/match";

import "tailwindcss/dist/tailwind.min.css";

// Routes
import Home from "./routes/home.js";
import Form from "./routes/form.js";

import { Dialog } from "./components/dialog.js";

export const Action = createContext({});

// Constants
const SEARCH = process.env.PREACT_APP_DATA_SOURCE;

export default class App extends Component {
   state = {
      results: {},
      isHomepage: true,
      isPopupOpen: false,
      popupNumbers: []
   };

   handleRoute = e => {
      this.currentUrl = e.url;
      this.setState({ isHomepage: e.url === "/" });
   };

   setPopupNumbers = (e, numberArray) => {
      e.preventDefault();

      this.setState({
         popupNumbers: numberArray,
         isPopupOpen: true
      });
   };

   closePopup = e => {
      if (e.currentTarget === e.target) {
         this.setState({ isPopupOpen: false });
      }
   };

   componentDidMount() {
      fetch(
         `${SEARCH}?q=${Math.random()
            .toString(36)
            .split(".")}`
      )
         .then(r => r.json())
         .then(json => {
            this.setState({
               results: json,
               resultBkp: json
            });
         });
   }

   render(props, { isHomepage, results, popupNumbers, isPopupOpen }) {
      return (
         <Fragment>
            <Action.Provider value={{ setPopupNumbers: this.setPopupNumbers }}>
               <div id="app" class="px-5 max-w-screen-md mx-auto">
                  <nav class="flex justify-center md:justify-end items-center">
                     {isHomepage ? (
                        <Link
                           class="m-5 bg-blue-500 inline-block hover:bg-blue-700 text-white font-bold px-2 py-1 rounded"
                           href="/form"
                        >
                           ➕ Aggiungi un'attività
                        </Link>
                     ) : (
                        <Link
                           class="m-5 text-blue-500 hover:text-blue-800"
                           href="/"
                        >
                           Ritorna alla ricerca
                        </Link>
                     )}
                  </nav>
                  <h1 class="font-sans text-2xl md:text-5xl lg:text-5xl pt-10 text-gray-800 text-center">
                     <span
                        class="block sm:inline-block"
                        role="img"
                        aria-label="biker"
                     >
                        🚴
                     </span>{" "}
                     padernodugnanodomicilio.it
                  </h1>
                  <Router onChange={this.handleRoute}>
                     <Home path="/" results={results} />
                     <Form path="/form" />
                  </Router>
               </div>
               <Dialog
                  isOpen={isPopupOpen}
                  closePopup={this.closePopup}
                  telNumbers={popupNumbers}
               />
            </Action.Provider>
            <div>
               <p class="mb-5 mt-5 text-center">
                  Developed with ❤️ by{" "}
                  <a
                     class="text-orange-500"
                     href={process.env.PREACT_APP_DEV_LINK}
                     target="_blank"
                  >
                     {process.env.PREACT_APP_DEV_NAME}
                  </a>
                  <br />
                  Speciale ringraziamento a{" "}
                  <a
                     class="text-orange-500"
                     href="https://tomma5o.com"
                     target="_blank"
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
            </div>
         </Fragment>
      );
   }
}
