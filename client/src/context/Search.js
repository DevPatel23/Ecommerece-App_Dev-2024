import { useState, useContext, createContext } from "react";

const SearchContext = createContext(); //createContext thi --> AuthContext naam no, context banavyo ---> useNavigate hook ni jem j

const SearchProvider = ({ children }) => {
  const [search, setSearch] = useState({
    //aa je state banavi tene global banava mate ---> AuthProvider ni under lakhi.. have AuthProvider component ni help thi wrap karsu etle --> context API unable thai jase
    keyword: "",
    results: [],
  });

  return (
    <SearchContext.Provider value={[search, setSearch]}>
      {/*                                     aapne state ne je te jagya e access karvana chhe etle value={} pass karva pade..*/}
      {/*                                         AuthContext mathi Provider ne input karta chhe */}

      {children}
      {/*                                         //children ne destructure karyu */}
    </SearchContext.Provider>
  );
};

// CUSTOM HOOK
const useSearch = () => useContext(SearchContext);
//custom hook useAuth() banavi jema aapne useContext vaparyo etle have --> je te jagya e useAuth() hook ni help thi access karya karvanu (koi pn component ma)

export { useSearch, SearchProvider };
