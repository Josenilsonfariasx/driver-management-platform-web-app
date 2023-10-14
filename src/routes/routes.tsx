import { Route, Routes } from "react-router-dom";
import { AdminProvider } from "../Providers/AdminContext";
import { SingIn } from "../pages/SingIn/singIn";

export const RoutesMain = () => {
  return (
    <AdminProvider>
      <Routes>
        <Route path="/" element={<SingIn />} />
      </Routes>
    </AdminProvider>
  );
};
