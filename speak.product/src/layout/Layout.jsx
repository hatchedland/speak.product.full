import { ClipLoader } from "react-spinners";
import { Footer } from "../components/Footer";
import Navbar from "../components/Navbar";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Layout = ({ children, loading }) => {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        {loading ? (
          <div className="flex-grow flex items-center justify-center">
            <ClipLoader color="#17294D" size={50} />
          </div>
        ) : (
          <main className="flex-grow mt-12">{children}</main>
        )}
        <Footer />
      </div>
      <ToastContainer />
    </>
  );
};

export default Layout;
