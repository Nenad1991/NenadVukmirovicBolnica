import React from 'react';
import Patients from '../patients/patients';
import Appointements from '../appointments/appointments';

class PatientView extends React.Component {

    constructor(props) {
      super(props);
  
      this.state = {
        selectedPatient: 0
      }
  
      this.onSelectPatient = this.onSelectPatient.bind(this);
    }
  
    onSelectPatient(value) {
      this.setState({ selectedPatient: value });
    }
  
    render() {
      return (
        <>
          <Patients onSelectPatient={this.onSelectPatient} />
          <Appointements selectedUser={this.state.selectedPatient}  appointments={this.props.appointments}/>
        </>
      );
    }
  }

  export default PatientView;