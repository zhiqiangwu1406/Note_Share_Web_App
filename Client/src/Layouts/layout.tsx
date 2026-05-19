import { Outlet } from "react-router";
import Header from "../components/Header";
import { Bounce, ToastContainer } from "react-toastify";

function Layout() {
  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <Header />
      <Outlet />
    </>
  );
}

export default Layout;
