import { ReactNode, createContext, useContext } from "react";
import { Api } from "../Services/Api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const AdminContext = createContext({});
interface AdminProvider {
  children : ReactNode;
}
export const AdminProvider = ({ children }:AdminProvider) => {
  // const [admin, setAdmin] = useState <object|null>(null);
  const navi = useNavigate();

  const login = async (form:object) => {
    console.log('chegando')
    try {
        const { data } = await Api.post("/api/auth/login", form);
        console.log(form)
        // setAdmin(data.user);
        localStorage.setItem("@me2-id", data.token);
        toast.success("Logado com sucesso");
        navi("/home");
    } catch (error:any) {
        {
            "Incorrect email / password combination".includes(
                error.response.data.message
            )
                ? toast.warning("Email ou Senha incorretos")
                : null;
        }
    }
};
return (
  <AdminContext.Provider value={{ login }}>
      {children}
  </AdminContext.Provider>
);
}
export const useAdminContext = () => useContext(AdminContext);