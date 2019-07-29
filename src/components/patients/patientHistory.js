import React from 'react';
import Appointements from '../appointments/appointments';

class PatientHystory extends React.Component {

    constructor(props) {
      super(props);
  
      this.state = {
        selectedPatient: this.props.match.params.userid
      }
  
     // this.onSelectPatient = this.onSelectPatient.bind(this);
    }
  
    // onSelectPatient(value) {
    //   this.setState({ selectedPatient: value });
    // }    
    
  
    render() {
        // var today = new Date();
        // var dd = String(today.getDate()).padStart(2, '0');
        // var mm = String(today.getMonth() + 1).padStart(2, '0'); 
        // var yyyy = today.getFullYear();
    
        // today = yyyy + '-' + mm + '-' + dd;
      return (
        <>
          {/* <Patients onSelectPatient={this.onSelectPatient} /> */}
          <Appointements history={true} selectedUser={this.state.selectedPatient} appointments={this.props.appointments} />
        </>
      );
    }
  }

  export default PatientHystory;