
import React from 'react';
import './header.css';
import { Link } from "react-router-dom";

export default function Header(props) {


  return <div className="header">
    
    <div className="header-right">
      {props.isLoggedIn ? <Link to={props.isDoctor ? "/doctor" : "/patientDetails/"+ props.userId}>{props.isDoctor? "Doctor: " + props.firstName + " " + props.lastName: "Patient: " + props.firstName + " " + props.lastName}</Link> : ""}
      {!props.isLoggedIn ? <Link to="/login">Login</Link> : ""}
      
    
      
    </div>
  </div>;
}