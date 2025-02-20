import { Outlet } from "react-router-dom";
import Footer from "./Footer/Footer";
import Home from "./Home/Home";
import Navber from "./Navber/Navber";

const Mainlayout = () => {
  return (
    <div className="">
      <Navber></Navber>
      <div className="min-h-screen ">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Mainlayout;
