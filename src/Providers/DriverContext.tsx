import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ReactNode, createContext, useContext, useState } from "react";
import { Api } from "../Services/Api";
// import { Api } from "../Services/Api";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";

export const DriverContext = createContext({});
interface DriverProvider {
  children : ReactNode;
}
const token = localStorage.getItem('@me2-token')
export interface DriverRequest {
  id: string
  name: string
  cpf: number
  telephone: string
  created_at?: string
  updated_at?: string
}
export const DriverProvider =({ children }:DriverProvider) => {
  const{data:DriversLit} = useQuery<DriverRequest[]>({queryKey:["driversList"], queryFn: async ()=>{
    const response = await Api.get("/api/drivers",{
      headers:{
        Authorization: `Bearer ${token}`
      }
    })
    return response.data
  }})
  const [id, setId] = useState()
  const [user, setUser] = useState()
  const client = useQueryClient()
  const revalidate = ()=>{
    client.invalidateQueries({queryKey:["driversList"]})
  }

  const driverCreate = useMutation({
    mutationFn: async(data)=> {
      return await Api.post("/api/drivers",data,{
        headers:{
          Authorization: `Bearer ${token}`
        }
      })
    },
    onSuccess:revalidate, 
  })
  const driverEdit = useMutation<any, unknown, any>({
    mutationFn: async () => {
      return await Api.put(`/api/drivers/${id}`, user, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    },
    onSuccess: () => {
      revalidate();
    }
  });
  
return (
  <DriverContext.Provider value={{DriversLit, driverCreate, driverEdit, setId, setUser}}>
      {children}
  </DriverContext.Provider>
);
}
export const useDriverContext = () => useContext(DriverContext);