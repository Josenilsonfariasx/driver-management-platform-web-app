import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ReactNode, createContext, useContext, useState } from "react";
import { Api } from "../Services/Api";
import { toast } from "react-toastify";
// import { Api } from "../Services/Api";
// import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const DriverContext = createContext({});
interface DriverProvider {
  children: ReactNode;
}
const token = localStorage.getItem("@me2-token");
export interface DriverRequest {
  id: string;
  name: string;
  cpf: number;
  telephone: string;
  created_at?: string;
  updated_at?: string;
}
export const DriverProvider = ({ children }: DriverProvider) => {
  const navi = useNavigate()
  const { data: DriversLit } = useQuery<DriverRequest[]>({
    queryKey: ["driversList"],
    queryFn: async () => {
      const response = await Api.get("/api/drivers", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    },
  });
  const [id, setId] = useState();
  const [user, setUser] = useState();
  const [userFull, setUserFull] = useState(); 
  const [userVisibleFull, setUserVisibleFull] = useState(null)
  const client = useQueryClient();
  const revalidate = () => {
    client.invalidateQueries({ queryKey: ["driversList"] });
  };

  const driverCreate = useMutation({
    mutationFn: async (data) => {
      return await Api.post("/api/drivers", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: () => {
      toast.success("Motorista criado com sucesso");
      revalidate();
    },
  });
  const driverEdit = useMutation<any, unknown, any>({
    mutationFn: async () => {
      return await Api.put(`/api/drivers/${id}`, user, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: () => {
      toast.success("Dados do motorista editados com sucesso");
      revalidate();
    },
  });

  const deleteDriver = useMutation({
    mutationFn: async () => {
      return await Api.delete(`/api/drivers/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: () => {
      toast.success("Motorista Deletado com sucesso");
      revalidate();
    },
  });

  const GetInfoDriverAndTransport = async (id:string) => {
    try {
      const response = await Api.get(`/api/drivers/${id}/info`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data;
      setUserFull(data);
    } catch (error:any) {
      console.log(error.response.data.errors);
      if(error.response.data.errors ==  'Token Expired'){
        navi("/")
        return toast.error('Voce vai ser redirecionado para efetuar o login novamente, Token Expirado')
      }
    }
};
  return (
    <DriverContext.Provider value={{ DriversLit, driverCreate, driverEdit, setId, setUser, userFull, deleteDriver, GetInfoDriverAndTransport, userVisibleFull, setUserVisibleFull,setUserFull }}>
      {children}
    </DriverContext.Provider>
  );
};
export const useDriverContext = () => useContext(DriverContext);
