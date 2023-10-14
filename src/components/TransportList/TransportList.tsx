import { useState } from "react";
import icon_cross from "../../assets/icon-cross.svg";
import style from "./style.module.scss";
import { ModalCreateTransport } from "./ModalCreateTransport/ModalCreateTransport";

export const TransportList = () => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <section className={style.section}>
        <div>
          <span className="title two white">Veiculos</span>
          <img src={icon_cross} onClick={() => setVisible(true)}></img>
        </div>

          {visible ? <ModalCreateTransport visible={setVisible} /> : null}
      </section>
    </>
  );
};
