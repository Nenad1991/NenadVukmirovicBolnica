import React from 'react';
import DoctorTypes from '../doctors/doctorTypes';
import Doctors from '../doctors/doctors';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Patients from '../patients/patients';

class BookAppointment extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      date: '',
      time: '',
      userId: this.props.userId,
      selectedDoctorTypeId: '',
      selectedDoctorId: '',
      selectedPatientId: '',
      appointments: this.props.appointments,
      errors: {}
    }

    this.onDateChanged = this.onDateChanged.bind(this);
    this.onTimeChanged = this.onTimeChanged.bind(this);
    this.onSelectDoctorType = this.onSelectDoctorType.bind(this);
    this.onSelectDoctor = this.onSelectDoctor.bind(this);
    this.save = this.save.bind(this);
    this.isValidForm = this.isValidForm.bind(this);
    this.onSelectPatient = this.onSelectPatient.bind(this);

  }

  onDateChanged(value) {
    this.setState({
      date: value
    });
  }

  onTimeChanged(value) {
    this.setState({
      time: value
    });
  }

  onSelectDoctorType(value) {
    this.setState({ selectedDoctorTypeId: value });
  }


  onSelectDoctor(value) {
    this.setState({ selectedDoctorId: value });
  }

  onSelectPatient(value) {
    this.setState({ selectedPatientId: value });
  }

  isValidForm() {
    let errorsObj = {};
    let isFormValid = true;

    if (this.state.selectedDoctorTypeId === '') {
      errorsObj["selectedDoctorTypeId"] = "Obavezno polje - Doctor Type";
      isFormValid = false;
    }

    if (this.state.isDoctor && this.state.selectedPatientId === '') {
      errorsObj["selectedPatientId"] = "Obavezno polje - Patient";
      isFormValid = false;
    }

    if (this.state.selectedDoctorId === '') {
      errorsObj["selectedDoctorId"] = "Obavezno polje - Doctor";
      isFormValid = false;
    }

    if (this.state.date === '') {
      errorsObj["date"] = "Obavezno polje - date";
      isFormValid = false;
    }

    if (this.state.time === '') {
      errorsObj["time"] = "Obavezno polje - time";
      isFormValid = false;
    }

    const dateTmp = this.state.date;
    const timeTmp = this.state.time;
    const selectedDoctorIdTemp = this.state.selectedDoctorId;
    if (this.props.appointments.some(function (m) {
      return  m.date ==  (("0" + dateTmp.getDate()).slice(-2)  + "-" + ("0" + (dateTmp.getMonth() + 1)).slice(-2) + "-" + dateTmp.getFullYear()) 
      && m.time == timeTmp.toLocaleTimeString( {hour: '2-digit', minute:'2-digit'}).replace(/\:\d+\s/, " ").replace(/(:\d{2}| [AP]M)$/, "") 
       && m.doctorId ==selectedDoctorIdTemp;
      })) {
      errorsObj["isFreeTimeSlot"] = "Vec je rezervisan termin kod izabranog doktora.";
      isFormValid = false;
    }

    this.setState({ errors: errorsObj });
    return isFormValid;
  }


  save() {
    if (this.isValidForm()) {
      if (this.props.isDoctor) {
        this.props.handleBookAppointment(this.state.selectedDoctorTypeId, this.state.selectedDoctorId, this.state.date, this.state.time, this.state.selectedPatientId);
        this.props.history.push('/doctor');
      } else {
        this.props.handleBookAppointment(this.state.selectedDoctorTypeId, this.state.selectedDoctorId, this.state.date, this.state.time, this.state.userId);
        this.props.history.push('/patientDetails/' + this.state.userId);
      }

    } else {
      //   this.props.history.push('/book');
    }
  }

  render() {

    return (
      <div className="container" >
        <label><h3>Book appointment</h3></label>
        <div className="form-group">
          {this.props.isDoctor ? <div><Patients onSelectPatient={this.onSelectPatient} /><span style={{ color: "red" }} >{this.state.errors["selectedPatientId"]} </span></div> : ""}
          <DoctorTypes onSelectDoctorType={this.onSelectDoctorType} />
          <span style={{ color: "red" }} >{this.state.errors["selectedDoctorTypeId"]} </span>
          <Doctors onSelectDoctor={this.onSelectDoctor} selectedDoctorType={this.state.selectedDoctorTypeId} />
          <span style={{ color: "red" }} >{this.state.errors["selectedDoctorId"]} </span>
        </div>
        <div className="form-group">
          <label>Date:</label>
          <DatePicker
            className="form-control"
            selected={this.state.date}
            onChange={this.onDateChanged}
            dateFormat="dd-MM-yyyy"
          />
          <span style={{ color: "red" }} >{this.state.errors["date"]} </span>
        </div>
        <div className="form-group">
          <label>Time:</label>
          <DatePicker
            className="form-control"
            selected={this.state.time}
            onChange={this.onTimeChanged}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            dateFormat="h:mm aa"
            timeCaption="Time"
          />
          <span style={{ color: "red" }} >{this.state.errors["time"]} </span>
        </div>
        <input type="submit" className="btn btn-info" value="Save" onClick={this.save} ></input>
        <br />
        <span style={{ color: "red" }} >{this.state.errors["isFreeTimeSlot"]} </span>

      </div>
    );
  }
}
export default BookAppointment;