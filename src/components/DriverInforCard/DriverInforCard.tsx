import { MdClose } from "react-icons/md";
import style from "./style.module.scss";
import { useDriverContext } from "../../Providers/DriverContext";
import { Input } from "../Input/Input";

export const DriverInfoModal = ({ visible }: any) => {
  const { userFull, setUserFull }: any = useDriverContext(); // Correção aqui
  const transport = userFull.transport.plate
  return (
    <div role="dialog" className={style.modalOverlay}>
      <div className={style.modal}>
        <div className={style.modalHeader}>
          <span className="title two white">Motorista</span>
          <button onClick={() =>{
          setUserFull(null) 
          visible(false)
          }}>
            <MdClose size={20}/>
          </button>
        </div>
        <div className={style.divForm}>
          <form>
            <Input label="Id" type="text" disabled={true} value={userFull.id} />
            <Input label="Nome" type="text" disabled={true} value={userFull.name} />
            <Input label="Cpf" type="text" disabled={true} value={userFull.cpf} />
            <Input label="Telefone" type="text" disabled={true} value={userFull.telephone} />
          </form>
        </div>
      </div>
      {transport?(
      <div className={style.modal}>
        <div className={style.modalHeader}>
          <span className="title two white">Veiculo</span>
        </div>
        <div className={style.divForm}>
          <form>
            <Input label="Placa do veiculo" type="text" disabled={true} value={userFull.transport.plate} />
            <Input label="Marca do veiculo" type="text" disabled={true} value={userFull.transport.brand} />
            <Input label="Modelo do veiculo" type="text" disabled={true} value={userFull.transport.model} />
            <Input label="Ano do veiculo" type="text" disabled={true} value={userFull.transport.year} />
          </form>
        </div>
      </div>
      ):(
        <div className={style.modal}>
        <div className={style.modalHeader}>
          <span className="title two white">Veiculo</span>
        </div>
        <div className={style.divForm}>
          <form>
            <Input label="Error" type="text" disabled={true} value={"Motorista nao tem trasnporte Registrado"} />
          </form>
        </div>
      </div>
      )}
    </div>
  );
};
