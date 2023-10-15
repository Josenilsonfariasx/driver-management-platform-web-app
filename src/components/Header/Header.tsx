// import { useUserContext } from "../../providers/UserContext"
import { useNavigate } from "react-router-dom";
import style from "./style.module.scss"
import { toast } from "react-toastify";
import { useDriverContext } from "../../Providers/DriverContext";
// import { Link, useNavigate } from "react-router-dom"
interface Header {
  visible?: boolean;
}
export const Header = ({visible}:Header) => {
  const {setLoading}: any = useDriverContext();
    const navi = useNavigate()
    const logout = ()=>{
      localStorage.removeItem("@me2-token")
      localStorage.removeItem("@me2-user")
      navi("/")
      setLoading(true)
      toast.success("Volte sempre")
    }
    return (
        <header className={(visible ? style.headerBtn : style.header)}>
            <div className="container">
                <h1 className="title one">Driver Management</h1>
                {visible?<button className="button variant" onClick={()=>logout() }>Sair</button>: null}
            </div>
        </header>
    )
}