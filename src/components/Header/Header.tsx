// import { useUserContext } from "../../providers/UserContext"
import { useNavigate } from "react-router-dom";
import style from "./style.module.scss"
import { toast } from "react-toastify";
// import { Link, useNavigate } from "react-router-dom"
interface Header {
  visible?: boolean;
}
export const Header = ({visible}:Header) => {
    const navi = useNavigate()
    const logout = ()=>{
      localStorage.removeItem("@me2-token")
      localStorage.removeItem("@me2-user")
      navi("/")
      toast.success("Volte sempre")
    }
    return (
        <header className={(visible ? style.headerBtn : style.header)}>
            <div className="container">
                <h1 className="title">Driver Management</h1>
                {visible?<button className="button variant" onClick={()=>logout() }>Sair</button>: null}
            </div>
        </header>
    )
}