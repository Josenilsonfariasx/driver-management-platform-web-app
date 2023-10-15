import { Header } from "../../components/Header/Header";
import { TechList } from "../../components/DriverList/DriverList";
import style from "./style.module.scss";
import { TransportList } from "../../components/TransportList/TransportList";
import { useForm } from "react-hook-form";
import { Input } from "../../components/Input/Input";
import { AiOutlineSearch } from "react-icons/ai";
import { useDriverContext } from "../../Providers/DriverContext";
import { useState } from "react";

export interface user {
  id: string;
  name: string;
  created_at?: string;
  updated_at?: string;
}
export const Dashboard = () => {
  const { DriversLit, searchDriverByName, searchDriverByNCpf, searchDriverByPlate }: any = useDriverContext();
  const { register, handleSubmit } = useForm();
  const [dataSearch, setData] = useState([]);
  const storedUserString = localStorage.getItem("@me2-user");
  let user: user | null = null;

  if (storedUserString) {
    user = JSON.parse(storedUserString);
  }
  const submit = async (dataForm: any) => {
    let data;

    if (dataForm.searchBy === "name") {
      data = await searchDriverByName(dataForm.search);
      if (data && data.length > 0) {
        setData(data);
      }
    }
    if (dataForm.searchBy === "cpf") {
      data = await searchDriverByNCpf(dataForm.search);
      if (data && data.length > 0) {
        setData(data);
      }
    }
    if (dataForm.searchBy === "plate") {
      data = await searchDriverByPlate(dataForm.search);
      if (data && data.length > 0) {
        setData(data);
      }
    }
  };
  return (
    <div className={style.div}>
      <Header visible={true} />
      <main className={style.main}>
        <div className={style.user_}>
          <div className="container">
            <h2 className="title white">{user?.name}</h2>
          </div>
        </div>
        <div className={style.user_2}>
          <div className="container">
            <div className={style.search}>
              <h2 className="title white">Filter</h2>
              <form onSubmit={handleSubmit(submit)} className={style.formSearch}>
                <div className={style.checkbox}>
                  <label>
                    <input type="radio" {...register("searchBy")} value="name" />
                    <span className="title headline white">NAME</span>
                  </label>
                  <label>
                    <input type="radio" {...register("searchBy")} value="cpf" />
                    <span className="title headline white">CPF</span>
                  </label>
                  <label>
                    <input type="radio" {...register("searchBy")} value="plate" />
                    <span className="title headline white">PLATE</span>
                  </label>
                </div>
                <div className={style.DivInputSearch}>
                  <Input type="text" {...register("search")} />
                </div>
                {dataSearch.length > 0 ? (
                  <span className="title headline white" onClick={()=>setData([])}>Limpar Filtro</span>
                ) : (
                  <button className={style.btnSearch}>
                    <AiOutlineSearch size={20} color={"#F8F9FA"} />
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>
        <div className={style.info}>
          {dataSearch.length > 0 ? <TechList value={dataSearch} /> : <TechList value={DriversLit} />}
        </div>
        <div className={style.info}>
          <TransportList />
        </div>
      </main>
    </div>
  );
};
