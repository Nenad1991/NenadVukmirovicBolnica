import React from 'react';
import Appointments from '../appointments/appointments';
import { withRouter } from 'react-router-dom'

class PatientDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPatient: this.props.match.params.userid
    }
  }

  render() {
    return (
      <>
        <Appointments appointments={this.props.appointments} selectedUser={this.state.selectedPatient} future={true} />
      </>
    );
  }
}

export default withRouter(PatientDetails);