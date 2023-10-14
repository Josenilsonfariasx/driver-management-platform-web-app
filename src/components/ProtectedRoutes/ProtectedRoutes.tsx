import { Navigate, Outlet } from "react-router-dom"
import { useAdminContext } from "../../Providers/AdminContext"
export const ProtectedRoutes = () =>{
  const {admin}: any = useAdminContext()
    return admin ? <Outlet /> : <Navigate to="/" />
}