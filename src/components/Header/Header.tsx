// import { useUserContext } from "../../providers/UserContext"
import style from "./style.module.scss"
// import { Link, useNavigate } from "react-router-dom"
interface Header {
  visible?: boolean;
}
export const Header = ({visible}:Header) => {
    // const {user, logout} = useUserContext()
    // const navi = useNavigate()
    return (
        <header className={(visible ? style.headerBtn : style.header)}>
            <div className="container">
                <h1 className="title">Driver Management</h1>
                {/* {visible ? (
                    user ? (
                        <button className="button variant" onClick={()=>logout() }>Sair</button>
                    ):<button className="button variant" onClick={()=> navi("/")}>Voltar</button>
                ): null} */}
            </div>
        </header>
    )
}