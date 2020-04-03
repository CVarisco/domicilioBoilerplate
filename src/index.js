import { h, Component, Fragment } from "preact";
import { Router } from "preact-router";

import "tailwindcss/dist/tailwind.min.css";

// Routes
import Home from "./routes/Home/home.js";
import Form from "./routes/Form/index.js";

import Navbar from "./components/Navbar.js";
import Footer from "./components/Footer.js";

export default class App extends Component {
   state = {
      results: {},
      isHomepage: true,
   };

   handleRoute = (e) => {
      this.currentUrl = e.url;
      this.setState({ isHomepage: e.url === "/" });
   };

   setPopupNumbers = (e, numberArray) => {
      e.preventDefault();

      this.setState({
         popupNumbers: numberArray,
         isPopupOpen: true,
      });
   };

   closePopup = (e) => {
      if (e.currentTarget === e.target) {
         this.setState({ isPopupOpen: false });
      }
   };

   componentDidMount() {
      fetch(`${process.env.PREACT_APP_DATA_SOURCE}`)
         .then((r) => r.json())
         .then((json) => {
            this.setState({
               results: json,
               resultBkp: json,
            });
         });
   }

   render(props, { isHomepage, results }) {
      return (
         <Fragment>
            <div id="app" class="px-5 max-w-screen-md mx-auto">
               <Navbar isHomepage={isHomepage} />
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
            <Footer />
         </Fragment>
      );
   }
}
