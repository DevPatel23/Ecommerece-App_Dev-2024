import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import axios from "axios";
import { Outlet } from "react-router-dom";
import Spinner from "../Spinner";

export default function PrivateRoute() {
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get("/api/v1/auth/auth-user");
      if (res.data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };
    if (auth?.token) authCheck(); //  jo auth hoy ane sathe token hoy to j --> authCheck() run karavanu means, auth-user path par javase, means private(protected) route par javase...  Have dashboard ne to private route ma ukyo chhe etle --> jo auth-user made to j <Dashboard/> par javase etle k, LOGIN USER hase jene setAuth() thi 'auth' madyo chhe te j <Dashboard/> par aavi sake.
  }, [auth?.token]);

  return ok ? <Outlet /> : <Spinner />;
}
