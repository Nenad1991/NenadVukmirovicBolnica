
import React from 'react';
import Header from './header/header';
import Sidebar from './sidebar/sidebar';
import Private from './private/private';

function Layout (props) {
    
        return (
            <>
                <Header isLoggedIn={props.isLoggedIn} userId={props.userId} isDoctor={props.isDoctor} firstName={props.firstName} lastName={props.lastName} /> 
                {props.isLoggedIn ? <Private isDoctor={props.isDoctor} appointments={props.appointments}    userId={props.userId}    handleBookAppointment = {props.handleBookAppointment} /> : ''}
                <Sidebar userId={props.userId} isDoctor={props.isDoctor} isLoggedIn={props.isLoggedIn} />
            </>
        );
    
}

export default Layout;