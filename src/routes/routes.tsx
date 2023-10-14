import { Route, Routes } from "react-router-dom";
import { AdminProvider } from "../Providers/AdminContext";
import { SingIn } from "../pages/SingIn/singIn";
import { Dashboard } from "../pages/Dashboard/Dashboard";
import { ProtectedRoutes } from "../components/ProtectedRoutes/ProtectedRoutes";
import { DriverProvider } from "../Providers/DriverContext";
import { TransportProvider } from "../Providers/TransportContext";

export const RoutesMain = () => {
  return (
    <AdminProvider>
      <DriverProvider>
        <TransportProvider>
          <Routes>
            <Route path="/" element={<SingIn />} />
            <Route path="/home" element={<ProtectedRoutes />}>
              <Route index element={<Dashboard />} />
            </Route>
          </Routes>
        </TransportProvider>
      </DriverProvider>
    </AdminProvider>
  );
};
