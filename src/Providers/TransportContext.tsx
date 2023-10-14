import { ReactNode, createContext, useContext } from "react";
import { Api } from "../Services/Api";
import { toast } from "react-toastify";

export const TransportContext = createContext({});

interface TransportProviderProps {
  children: ReactNode;
}

const token = localStorage.getItem("@me2-token");

export interface TransportRequest {
  plate: string;
  brand: string;
  model: number;
  year: string;
  created_at?: string;
  updated_at?: string;
}

export const TransportProvider = ({ children }: TransportProviderProps) => {
  const CreateVeiculo = async (dataForm: TransportRequest) => {
    try {
      const response = await Api.post("/api/transport", dataForm, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Criado com sucesso");
      return response.data;
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <TransportContext.Provider value={{ CreateVeiculo }}>
      {children}
    </TransportContext.Provider>
  );
};

export const useTransportContext = () => useContext(TransportContext);
