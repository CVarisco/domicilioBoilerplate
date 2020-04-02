import { Link } from "preact-router/match";

const Navbar = ({ isHomepage }) => (
   <nav class="flex justify-center md:justify-end items-center">
      {isHomepage ? (
         <Link
            class="m-5 bg-blue-500 inline-block hover:bg-blue-700 text-white font-bold px-2 py-1 rounded"
            href="/form"
         >
            ➕ Aggiungi un'attività
         </Link>
      ) : (
         <Link class="m-5 text-blue-500 hover:text-blue-800" href="/">
            Ritorna alla ricerca
         </Link>
      )}
   </nav>
);

export default Navbar;
