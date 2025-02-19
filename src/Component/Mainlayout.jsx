import Footer from "./Footer/Footer";
import Home from "./Home/Home";
import Navber from "./Navber/Navber";

const Mainlayout = () => {
  return (
    <div className="">
      <Navber></Navber>
      <div className="min-h-screen">
      <Home></Home>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Mainlayout;
