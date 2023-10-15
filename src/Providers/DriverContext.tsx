import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ReactNode, createContext, useContext, useState } from "react";
import { Api } from "../Services/Api";
import { toast } from "react-toastify";
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

  const errorMapping: Record<string, string> = {
    "The name field is required.": "O campo nome é obrigatório.",
    "The cpf field is required.": "O campo CPF é obrigatório.",
    "The telephone field is required.": "O campo telefone é obrigatório.",
    "The password field format is invalid.": "O campo senha esta com formato invalido",
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
    onError: (error: any) => {
      if (error.response && error.response.data && error.response.data.errors) {
        const errorMessages = error.response.data.errors;
  
        for (const fieldName in errorMessages) {
          if (errorMessages.hasOwnProperty(fieldName)) {
            errorMessages[fieldName].forEach((errorMessage: string) => {
              const translatedError = errorMapping[errorMessage] || errorMessage;
              toast.error(translatedError);
            });
          }
        }
      } else {
        toast.error("Ocorreu um erro ao criar o motorista. Tente novamente mais tarde.");
      }
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
    onError(error) {
      console.log(error)
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
      if(error.response.data.errors ==  'Token Expired'){
        navi("/")
        return toast.error('Voce vai ser redirecionado para efetuar o login novamente, Token Expirado')
      }else {
        return toast.error('Estamos enfrentando problemas internos, tente novamente mais tarde')
      }
    }
};

const searchDriverByName = async (name:string) => {
  try {
    const response = await Api.get(`/api/drivers/search/${name}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data)
    return response.data
  } catch (error:any) {
    if(error.response.data.errors == 'Drivers not found'){
      toast.error("motorista nao encontrado")
    }
  }
}

const searchDriverByNCpf = async (cpf:string) => {
  try {
    const response = await Api.get(`/api/drivers/search/cpf/${cpf}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data)
    return response.data
  } catch (error:any) {
    if(error.response.data.errors == 'Drivers not found'){
      toast.error("motorista nao encontrado")
    }
  }
}

const searchDriverByPlate = async (plate:string) => {
  try {
    const response = await Api.get(`/api/drivers/search/plate/${plate}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data)
    return [response.data]
  } catch (error:any) {
    if(error.response.data.errors == 'Drivers not found'){
      toast.error("motorista nao encontrado")
    }
  }
}
  return (
    <DriverContext.Provider value={{searchDriverByNCpf,searchDriverByPlate ,searchDriverByName, DriversLit, driverCreate, driverEdit, setId, setUser, userFull, deleteDriver, GetInfoDriverAndTransport, userVisibleFull, setUserVisibleFull,setUserFull }}>
      {children}
    </DriverContext.Provider>
  );
};
export const useDriverContext = () => useContext(DriverContext);
