import React from 'react';
import './App.css';
import "react-datepicker/dist/react-datepicker.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Layout from './components/layout';
import Signout from './components/signout/signout';
import LoginPage from './components/login/loginPage';
import appointmentsData from './data/appointments';
import users from './data/users';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
      userId: 0,
      firstName: '',
      lastName: '',      
      users: users,
      appointments: appointmentsData
    }

    this.login = this.login.bind(this);
    this.signout = this.signout.bind(this);
    this.handleBookAppointment = this.handleBookAppointment.bind(this);
  }

  login(isLoggedIn, isDoctor, userId, firstName, lastName) {

    
    this.setState({ isLoggedIn: isLoggedIn });
    this.setState({ userId: userId });
    this.setState({ isDoctor: isDoctor });
    this.setState({ firstName: firstName });
    this.setState({ lastName: lastName });

  }
 

  handleBookAppointment(doctorType, doctor, date, time, userId) {   

    let maxId = Math.max.apply(Math, this.state.users.map(function(o) { return o.id; }));   
    let formatted_date =  ("0" + date.getDate()).slice(-2)  + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + date.getFullYear()
    
    let appointment ={
      id: maxId + 1, 
      userId: userId,
      doctorTypeId: doctorType,
      doctorId:doctor,
      date: formatted_date,
      time:time.toLocaleTimeString( {hour: '2-digit', minute:'2-digit'}).replace(/\:\d+\s/, " ").replace(/(:\d{2}| [AP]M)$/, ""),
      isCanceled: true
    }

    this.setState({
      appointments: [...this.state.appointments, appointment]
    });
  }

  signout() {
    this.setState({ isLoggedIn: false });
    this.setState({ userId: 0 });
    this.setState({ firstName: '' });
    this.setState({ lastName: '' });
  }

  render() {
    
    return (
      <div className="App">


        <Router>       
        
          <Route path="/"  component={() => <Layout isDoctor={this.state.isDoctor}
                                                    userId={this.state.userId}  
                                                    isLoggedIn={this.state.isLoggedIn} 
                                                    firstName={this.state.firstName} 
                                                    lastName={this.state.lastName}
                                                    handleBookAppointment = {this.handleBookAppointment}
                                                    appointments={this.state.appointments}
                                                    />
                                                  
                                      }
                                                 
          />        

          <Route path="/login" component={() => <LoginPage login={this.login} />} />
          <Route path="/signout" component={() => <Signout signout={this.signout} />} />     
        </Router>
      </div>
    );
  }

}

export default App;