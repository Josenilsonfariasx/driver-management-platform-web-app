import { MdClose } from "react-icons/md";
import style from "./style.module.scss";
import { Input } from "../Input/Input";
import { useForm } from "react-hook-form";
import { DriverRequest, useDriverContext } from "../../Providers/DriverContext";
import { SubmitHandler, FieldValues } from "react-hook-form";


interface ModalEditProps {
  visible: (isVisible: boolean) => void;
  EditModaValue: DriverRequest | undefined;
}

export const ModalEdit = ({ visible, EditModaValue }: ModalEditProps) => {
  const { driverEdit, setId, setUser }: any = useDriverContext();
  const { register, handleSubmit } = useForm();
  const submit: SubmitHandler<FieldValues> = (dataForm) => {
    const updatedDriver: DriverRequest = {
      id: dataForm.id as string,
      name: dataForm.name as string,
      cpf: parseInt(dataForm.cpf as string),
      telephone: dataForm.telephone as string,
    };

    const filteredDriver = Object.fromEntries(
      Object.entries(updatedDriver).filter(([ key, value]) => value !== undefined && !Number.isNaN(value) && value !== '')
    );
    setId(EditModaValue?.id)
    setUser(filteredDriver)
    driverEdit.mutate();
    visible(false);
  };

  return (
    <div role="dialog" className={style.modalOverlay}>
      <div className={style.modal}>
        <div className={style.modalHeader}>
          <span className="title two white">Editar dados do Motorista</span>
          <button onClick={() => visible(false)}>
            <MdClose />
          </button>
        </div>
        <div className={style.divForm}>
          <form onSubmit={handleSubmit(submit)}>
            <Input
              label="Nome"
              type="text"
              placeholder={EditModaValue?.name || ""}
              {...register("name")}
            />
            <Input
              label="Cpf"
              type="text"
              placeholder={EditModaValue?.cpf.toString() || ""}
              {...register("cpf")}
            />
            <Input
              label="Telefone"
              type="text"
              placeholder={EditModaValue?.telephone.toString() || ""}
              {...register("telephone")}
            />
            <button type="submit" className="button">
              Salvar Alterações
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
