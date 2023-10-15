import { useState, useEffect } from "react";

import Lottie from "lottie-react";
import { LottieAnimation } from "../LottieLoading/LottieLoading";
import legal_animation from "../../assets/lottieFiles/legal-dEdo.json"
import style from "./style.module.scss";

export const Loading = () => {
  const [mostrarPronto, setMostrarPronto] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setMostrarPronto(true);
    }, 3000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);
  return (
    <div role="dialog" className={style.modalOverlay}>
      <div className={style.modal}>
        {!mostrarPronto ? (
          <>
            <LottieAnimation />
            <h1 className="title one white">Aguarde um momentooooo</h1>
          </>
        ) : (
          <>
            <h2 className="title white">Pronto</h2>
            <Lottie animationData={legal_animation} loop={true} autoplay={true} />;
          </>
        )}
        {mostrarPronto}
      </div>
    </div>
  );
};
