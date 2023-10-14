import { Header } from "../../components/Header/Header";
import { TechList } from "../../components/DriverList/DriverList";
import style from "./style.module.scss";
import { TransportList } from "../../components/TransportList/TransportList";

export interface user {
  id: string;
  name: string;
  created_at?: string;
  updated_at?: string;
}
export const Dashboard = () => {
  const storedUserString = localStorage.getItem("@me2-user");
  let user: user | null = null;

  if (storedUserString) {
    user = JSON.parse(storedUserString);
  }

  return (
    <div className={style.div}>
      <Header visible={true} />
      <main className={style.main}>
        <div className={style.user_}>
          <div className="container">
            <h2 className="title white">{user?.name}</h2>
          </div>
        </div>
        <div className={style.info}><TechList /></div>
        <div className={style.info}><TransportList /></div>
      </main>
    </div>
  );
};
