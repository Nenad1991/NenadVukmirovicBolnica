
import React from 'react';
import './sidebar.css';
import { Link } from "react-router-dom";


const Sidebar = (props) => {
  
  return <div className="sidenav">
   
    {props.isLoggedIn &&  (props.isDoctor === "undefined" || props.isDoctor == false) ? <Link to={"/history/" + props.userId}>History</Link> : ""}
    {props.isLoggedIn ? <Link to="/book">Book app.</Link> : ""}
    {props.isLoggedIn && props.isDoctor ? <Link to="/patient">Patients</Link> : ""}
    {props.isLoggedIn ? <Link to="/signout">Signout</Link> : ""}
 
  </div>;
};

export default Sidebar;