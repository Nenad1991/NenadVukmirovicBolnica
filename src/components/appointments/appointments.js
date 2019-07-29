import React from 'react';
// import appointments from '../../data/appointments.json';
import users from '../../data/users.json';
import doctorTypes from '../../data/doctorTypes.json';
import true_img from '../../img/true.png';
import false_img from '../../img/false.png';
class Appointments extends React.Component {

  constructor(props) {
    super(props);
    this.filterFutureAppointments = this.filterFutureAppointments.bind(this);
    this.filterHistoryAppointments = this.filterHistoryAppointments.bind(this);
    this.filterforDoctor = this.filterforDoctor.bind(this);
    
  }


  filterFutureAppointments = (element, currentDate, appointmentDate) => {
    if (this.props.selectedUser == 0) {
      return appointmentDate >= currentDate;
    }

    if (this.props.isDoctor) {
      return element.doctorId == this.props.selectedUser && element.doctorTypeId == this.props.selectedDoctorType && appointmentDate >= currentDate;
    } else {
      return element.userId == this.props.selectedUser && appointmentDate >= currentDate;
    }
  }

  filterHistoryAppointments = (element, currentDate, appointmentDate) => {
    if (this.props.selectedUser == 0) {
      return appointmentDate <= currentDate;
    }

    if (this.props.isDoctor) {
      return element.doctorId == this.props.selectedUser && element.doctorTypeId == this.props.selectedDoctorType && appointmentDate <= currentDate;
    } else {
      return element.userId == this.props.selectedUser && appointmentDate <= currentDate;
    }
  }

  filterforDoctor(element, currentDate,appointmentDate, selectedDate){

    if (this.props.selectedUser == 0 && this.props.selectedDoctorType == 0 && this.props.selectedDate ==="")  {
      return true;
    }

    if (this.props.selectedDate !=="" && this.props.selectedDoctorType !==0 && this.props.selectedUser !== 0) {
      return element.doctorId == this.props.selectedUser && element.doctorTypeId == this.props.selectedDoctorType && appointmentDate == selectedDate;
    }

    if (this.props.selectedDate !=="" && this.props.selectedDoctorType !==0 && this.props.selectedUser === 0) {
      return  element.doctorTypeId == this.props.selectedDoctorType && appointmentDate ==  selectedDate;
    }

    if (this.props.selectedDate !=="" && this.props.selectedDoctorType ===0 && this.props.selectedUser !== 0) {
      return  element.doctorId == this.props.selectedUser && appointmentDate ==  selectedDate;
    }

    if (this.props.selectedDate ==="" && this.props.selectedDoctorType !==0 && this.props.selectedUser !== 0) {
      return  element.doctorId == this.props.selectedUser &&  element.doctorTypeId == this.props.selectedDoctorType;
    }

    if (this.props.selectedDate !=="" && this.props.selectedDoctorType === 0 && this.props.selectedUser === 0) {
      return  appointmentDate ==  selectedDate;
    }

    if (this.props.selectedDate ==="" && this.props.selectedDoctorType !==0 && this.props.selectedUser === 0) {
      return  element.doctorTypeId == this.props.selectedDoctorType;
    }

    if (this.props.selectedDate ==="" && this.props.selectedDoctorType ===0 && this.props.selectedUser !== 0) {
      return  element.doctorId == this.props.selectedUser
    }

  }

  decideFilter = (element) => {
    
    
    var currentDate = new Date().setHours(0, 0, 0, 0);
    let appointmentDate = (new Date(element.date.replace( /(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"))).setHours(0, 0, 0, 0);
    let selectedDate = typeof this.props.selectedDate !=="undefined" && this.props.selectedDate !=="" && this.props.selectedDate.setHours(0, 0, 0, 0);  

    
    if (typeof this.props.future == "undefined" && this.props.isDoctor) {
      return  this.filterforDoctor(element, currentDate,appointmentDate, selectedDate);
    }


    if (this.props.future === true) {
      return this.filterFutureAppointments(element, currentDate, appointmentDate);
    }

    if (this.props.history === true) {
      return this.filterHistoryAppointments(element, currentDate, appointmentDate);
    }

    if(this.props.selectedUser > 0 &&  typeof this.props.isDoctor == "undefined"){
      return  element.userId == this.props.selectedUser;
    }
    return true;
  }

  render() {
    let isHistory = this.props.history; 
    let appointments = this.props.appointments;
    return (
      <div className="container" >
        <div className="form-group">
          <label><h3>Appointments</h3></label>
          <table className="table">
            <thead>
              <tr>
                <th>  # </th>
                <th> Patient</th>
                <th>  Doctor </th>
                <th>  Doctor type </th>
                <th>  Date </th>
                <th>  Time </th>
                {isHistory === true ? <th>  Done </th> : ""}
              </tr>
            </thead>
            <tbody>
              {appointments && appointments.filter(this.decideFilter).sort(function(a,b){
                    return   (new Date(b.date.replace( /(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"))).setHours(0, 0, 0, 0)  - (new Date(a.date.replace( /(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"))).setHours(0, 0, 0, 0);
                  }).map(function (item, key) {
           
                let patient = users.find(user => user.id == item.userId);              
                let doctor = users.find(user => user.id == item.doctorId);
                let doctorType = doctorTypes.find(type => type.id == item.doctorTypeId);
                return (
                  <tr key={key}>
                    <td>{key + 1}</td>
                    <td>{patient.firstName}</td>
                    <td>{doctor.firstName}</td>
                    <td>{doctorType.name}</td> 
                     <td>{item.date}</td>
                    <td>{item.time}</td> 
                    {isHistory === true ? <td>{!item.isCanceled ? <img src={true_img} alt="true"/> : <img src={false_img} alt="false"/>}</td> : ""}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Appointments;
