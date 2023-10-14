import { ToastContainer } from "react-toastify"
import "./styles/index.scss"
import { RoutesMain } from "./routes/routes"

function App() {

  return (
    <>
    <RoutesMain />
    <ToastContainer
        position="top-center"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        />
    </>
  )
}

export default App
