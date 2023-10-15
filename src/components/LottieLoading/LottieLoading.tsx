import Lottie from "lottie-react";
import animationData from "../../assets/lottieFiles/LOADING.json";
export const LottieAnimation = () => {
  return <Lottie animationData={animationData} loop={true} autoplay={true} />;
};
