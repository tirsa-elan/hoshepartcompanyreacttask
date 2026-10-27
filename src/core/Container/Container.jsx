import { Outlet } from "react-router-dom";
import '../../App.css'
import './container.css'

function Container() {
  return (
    <div className="router-con">
         <Outlet />
    </div>
     
  );
}

export default Container;