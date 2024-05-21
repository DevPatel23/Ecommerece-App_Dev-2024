import { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";

const AuthContext = createContext(); //createContext thi --> AuthContext naam no, context banavyo ---> useNavigate hook ni jem j
// aa AuthContext ni help thi provider thi Global state banse,
// pachhi aa global state e, useContext thi banavela Custom hook, ni help thi use kari sakis jete component ma

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    //aa je state banavi tene global banava mate ---> AuthProvider ni under lakhi.. have AuthProvider component ni help thi wrap karyu etle --> context API unable thai jase
    user: null,
    token: "",
  });

  //   axios na headers mate
  axios.defaults.headers.common["Authorization"] = auth?.token;

  useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data) {
      const parseData = JSON.parse(data);
      setAuth({
        ...auth,
        user: parseData.user,
        token: parseData.token,
      });
    }
    //eslint-disable-next-line
  }, []); //                jo dependency ma auth lakhse to console ma undefined error aavse. etle ahi dependency[] blank rakhi

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {/*                                     aapne state ne je te jagya e access karvana chhe etle, value={} pass karva pade..*/}
      {/*                                         AuthContext mathi Provider ne input karta chhe */}

      {children}
      {/*                                         //children ne destructure karyu */}
    </AuthContext.Provider>
  );
};

//
// AuthContext thi je [auth, setAuth] global state banavi tene...

// CUSTOM HOOK
const useAuth = () => useContext(AuthContext);
//custom hook useAuth() banavi jema aapne useContext vaparyo etle have --> je te jagya e useAuth() hook ni help thi [auth] vali global state ne access karya karvanu (koi pn component ma)
// je te component ma aa "useAuth" hook ni help thi [auth, setAuth] state globally use kari sakase

export { useAuth, AuthProvider };
