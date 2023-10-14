import { ReactNode, createContext, useContext, useState } from "react";
import { Api } from "../Services/Api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const AdminContext = createContext({});
interface AdminProvider {
  children : ReactNode;
}
export const AdminProvider = ({ children }:AdminProvider) => {
  const [admin, setAdmin] = useState<string | undefined>()
  const navi = useNavigate();

  const login = async (form:object) => {
    try {
        const { data } = await Api.post("/api/auth/login", form);
        localStorage.setItem("@me2-token", data.token);
        setAdmin(data.token)
        localStorage.setItem("@me2-user", JSON.stringify(data.user));
        toast.success("Logado com sucesso");
        navi("/home");
    } catch (error:any) {
        if(error.response?.status == 401){
          return toast.error('Email ou senha incorretos')
        }
        return toast.error('Erro interno, tente novamente mais tarde')
    }
};
return (
  <AdminContext.Provider value={{ login, admin }}>
      {children}
  </AdminContext.Provider>
);
}
export const useAdminContext = () => useContext(AdminContext);