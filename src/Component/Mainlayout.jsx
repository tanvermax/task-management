import { Outlet } from "react-router-dom";
import Footer from "./Footer/Footer";
import Home from "./Home/Home";
import Navber from "./Navber/Navber";
import { DndProvider } from "react-dnd";
// import { DndProvider } from "react-dnd";
import {HTML5Backend} from 'react-dnd-html5-backend'
const Mainlayout = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="">
        <Navber></Navber>
        <div className="min-h-screen ">
          <Outlet></Outlet>
        </div>
        <Footer></Footer>
      </div>
    </DndProvider>
  );
};

export default Mainlayout;
