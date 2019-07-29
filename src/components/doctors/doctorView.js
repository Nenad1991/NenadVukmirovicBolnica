import React from 'react';
import Doctors from '../doctors/doctors';
import DoctorTypes from '../doctors/doctorTypes';
import Appointments from '../appointments/appointments';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class DoctorView extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedDoctor: 0,
      selectedDoctorType: 0,
      selectedDate: ''
    }

    this.onSelectDoctor = this.onSelectDoctor.bind(this);
    this.onSelectDoctorType = this.onSelectDoctorType.bind(this);
    this.onDateChanged = this.onDateChanged.bind(this);
   
  }

  onSelectDoctor(value) {
    this.setState({ selectedDoctor: value });
  }

  onSelectDoctorType(value) {
    this.setState({ selectedDoctorType: value });
    this.setState({ selectedDoctor: 0 });
    this.setState({ selectedDate: '' });
  }

  onDateChanged(value) {
    this.setState({
      selectedDate: value
    });

  }

  render() {
    return (
      <>
        <DoctorTypes onSelectDoctorType={this.onSelectDoctorType} />
        <Doctors onSelectDoctor={this.onSelectDoctor} selectedDoctorType={this.state.selectedDoctorType} selectedDoctor={this.state.selectedDoctor}/>
        <DatePicker
          className="form-control"
          selected={this.state.selectedDate}
          onChange={this.onDateChanged}
          dateFormat="dd-MM-yyyy"
        />
        <Appointments appointments={this.props.appointments} isDoctor={true} selectedDate={this.state.selectedDate} selectedUser={this.state.selectedDoctor} selectedDoctorType={this.state.selectedDoctorType} />
      </>
    );
  }
}

export default DoctorView;