import { MdClose } from "react-icons/md";

import style from "./style.module.scss";
import { Input } from "../Input/Input";
import { useForm } from "react-hook-form";
import { useDriverContext } from "../../Providers/DriverContext";

export const ModalCreate = ({ visible }: any) => {
  const { driverCreate }: any = useDriverContext();
  const { register, handleSubmit } = useForm();

  const submit = (dataForm: object) => {
    driverCreate.mutate(dataForm);
    visible(false);
  };
  return (
    <div role="dialog" className={style.modalOverlay}>
      <div className={style.modal}>
        <div className={style.modalHeader}>
          <span className="title two white">Cadastrar Motorista</span>
          <button onClick={() => visible(false)}>
            <MdClose />
          </button>
        </div>
        <div className={style.divForm}>
          <form onSubmit={handleSubmit(submit)}>
            <Input label="Nome" type="text" placeholder="Digite o nome do motorista" {...register("name")} />
            <Input label="Cpf" type="text" placeholder="Digite o Cpf" {...register("cpf")} />
            <Input label="Telefone" type="text" placeholder="Digite o telefone" {...register("telephone")} />
            <Input label="Senha" type="password" placeholder="Digite a senha" {...register("password")} />
            <span className="title headline white">Senha deve conter letras minusculas e maiusculas</span>
            <span className="title headline white">Senha deve conter pelo menos um caracter especial e um numero</span>
            <button className="button">Cadastrar Motorista</button>
          </form>
        </div>
      </div>
    </div>
  );
};
