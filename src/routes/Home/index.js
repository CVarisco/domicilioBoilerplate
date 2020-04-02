import { Component } from "preact";

import { PhoneNumbersDialog } from "./PhoneNumbersDialog.js";
import CategoryList from "./CategoryList.js";
import { Action } from "./context.js";

export default class Home extends Component {
   state = {
      filter: "",
      categoryFilter: null,
      isPopupOpen: false,
      popupNumbers: []
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

   handleChangeFilter = e => {
      const text = e.target.value;
      this.setState({ filter: text });
   };

   handleCategoryFilter = key => () => {
      if (key === this.state.categoryFilter) {
         return this.setState({ categoryFilter: null });
      }
      this.setState({ categoryFilter: key });
   };

   filteredCategories(filter, categoryFilter) {
      const { results } = this.props;
      const regex = new RegExp(`${filter}`, "i");

      return Object.keys(results)
         .filter(key => (categoryFilter ? categoryFilter === key : true))
         .reduce((acc, key) => {
            return {
               ...acc,
               [key]: {
                  icon: results[key].icon,
                  data: results[key].data.filter(e =>
                     filter.length ? regex.test(e.name) : true
                  )
               }
            };
         }, {});
   }

   renderEmptyState = () => (
      <div class="relative mt-10 mb-10 font-sans text-md text-gray-800">
         <p class="text-center">
            Non ci sono attività,{" "}
            <strong>
               clicca sul tasto in alto a destra per aggiungerne una!
            </strong>
         </p>
      </div>
   );

   render(props, { filter, categoryFilter, popupNumbers, isPopupOpen }) {
      const { results: stores } = this.props;
      const filteredStores = this.filteredCategories(filter, categoryFilter);

      if (Object.keys(stores).length <= 0) {
         return this.renderEmptyState();
      }

      return (
         <Action.Provider value={{ setPopupNumbers: this.setPopupNumbers }}>
            <div class="relative p-5 lg:max-w-5xl xl:max-w-6xl lg:m-auto pb-10">
               <input
                  class="bg-white focus:outline-none focus:shadow-outline border border-gray-500 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
                  type="text"
                  placeholder="Cerca attività"
                  onInput={this.handleChangeFilter}
               />
               <div class="relative text-center mt-2 p-1">
                  {Object.keys(stores)
                     .sort()
                     .map(key => (
                        <button
                           onClick={this.handleCategoryFilter(key)}
                           class={`m-1 items-center border border-blue-500 py-2 px-4 rounded-full ${
                              key === categoryFilter
                                 ? "bg-blue-500 hover:bg-blue-500 text-white outline-none text-white"
                                 : "bg-white hover:bg-blue-500 hover:text-white"
                           }`}
                        >
                           {`${stores[key].icon} ${key}`}
                        </button>
                     ))}
               </div>
            </div>
            <div class="relative mb-10 font-sans text-md text-gray-800">
               {Object.keys(filteredStores)
                  .filter(key => filteredStores[key].data.length)
                  .map(key => (
                     <CategoryList
                        name={key}
                        category={filteredStores[key]}
                        filter={filter}
                     />
                  ))}
            </div>
            <PhoneNumbersDialog
               isOpen={isPopupOpen}
               closePopup={this.closePopup}
               telNumbers={popupNumbers}
            />
         </Action.Provider>
      );
   }
}
