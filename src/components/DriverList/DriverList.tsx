import { useState } from "react";
import { useDriverContext } from "../../Providers/DriverContext";
import icon_cross from "../../assets/icon-cross.svg";
import { DriverCard } from "./DriverCard/DriverCard";
import style from "./style.module.scss";
import { ModalCreate } from "../ModalCreate/ModalCreate";
import { ModalEdit } from "../ModalEdit/ModalEdit";
import { DriverInfoModal } from "../DriverInforCard/DriverInforCard";

export const TechList = () => {
  const [visible, setVisible] = useState(false);
  const [editVisible, setEdit] = useState(false);
  const [EditModaValue, setValueModalEdit] = useState<any | undefined>(undefined);
  const { DriversLit, userFull, userVisibleFull, setUserVisibleFull }: any = useDriverContext();
  return (
    <>
      <section className={style.section}>
        <div>
          <span className="title two white">Motoristas</span>
          <img src={icon_cross} onClick={() => setVisible(true)}></img>
        </div>

        <div className={style.list}>
          <ul>
            {DriversLit
              ? DriversLit.map((driver: any) => (
                  <DriverCard
                    key={driver.id}
                    driver={driver}
                    setVisible={setEdit}
                    EditModaValue={setValueModalEdit}
                  />
                ))
              : null}
          </ul>
          {visible ? <ModalCreate visible={setVisible} /> : null}
          {editVisible ? <ModalEdit EditModaValue={EditModaValue} visible={setEdit} /> : null}
          {userVisibleFull? <DriverInfoModal visible={setUserVisibleFull} driverData={userFull}  /> : null}
        </div>
      </section>
    </>
  );
};
