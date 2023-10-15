import { MdClose } from "react-icons/md";

import style from "./style.module.scss";
import { useForm } from "react-hook-form";
import { Input } from "../../Input/Input";
import { useDriverContext } from "../../../Providers/DriverContext";
import { toast } from "react-toastify";
import { useTransportContext } from "../../../Providers/TransportContext";

export const ModalCreateTransport = ({ visible }: any) => {
  const { DriversLit }: any = useDriverContext();
  const {CreateVeiculo}:any = useTransportContext()
  const { register, handleSubmit } = useForm();
  const submit = async(dataForm: any) => {
    if (dataForm.plate.length > 6 || !/^[A-Za-z0-9]*$/.test(dataForm.plate)) {
      toast.error('Digite uma placa válida com no máximo 6 caracteres alfanuméricos.');
    } else if (dataForm.year.length !== 4 || !/^\d{4}$/.test(dataForm.year)) {
      toast.error('Digite um ano válido com exatamente 4 dígitos numéricos.');
    } else {
      visible(false);
      await CreateVeiculo(dataForm)
    }
  };
  return (
    <div role="dialog" className={style.modalOverlay}>
      <div className={style.modal}>
        <div className={style.modalHeader}>
          <span className="title two white">Cadastrar Veiculo</span>
          <button onClick={() => visible(false)}>
            <MdClose />
          </button>
        </div>
        <div className={style.divForm}>
          <form onSubmit={handleSubmit(submit)}>
            <Input
              label="Placa do veiculo"
              type="text"
              placeholder="Digite a placa do veiculo"
              {...register("plate")}
            />
            <Input label="Marca" type="text" placeholder="Digite a marcado veiculo" {...register("brand")} />
            <Input
              label="Modelo"
              type="text"
              placeholder="Digite o Modelo do veiculo"
              {...register("model")}
            />
            <Input
              label="ano de fabricação"
              type="text"
              placeholder="Digite o ano de fabricação"
              {...register("year")}
            />
            <label className="title headline white">Selecionar Motorista</label>
            <select {...register("driver_id")}>
              {DriversLit?.map((driver: any) => (
                <option key={driver.id} value={driver.id}>
                  {driver.name}
                </option>
              ))}
            </select>
            <button className="button">Cadastrar Motorista</button>
          </form>
        </div>
      </div>
    </div>
  );
};
