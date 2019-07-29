import React from 'react';
import BookAppointment from '../bookAppointment/bookAppointment';
import PatientView from '../patients/patientView';
import PatientHistory from '../patients/patientHistory';
import DoctorView from '../doctors/doctorView';
import { Route } from "react-router-dom";
import PatientDetails from '../patients/patientDetails';

class Private extends React.Component {

    render() {
        return (
            <div>
                <Route path="/book" render={(props) => <BookAppointment {...props} appointments={this.props.appointments} isDoctor={this.props.isDoctor} userId={this.props.userId} appointments={this.props.appointments} handleBookAppointment={this.props.handleBookAppointment} />} />
                <Route path="/patient" render={(props) => <PatientView {...props} appointments={this.props.appointments} />} />
                <Route path="/doctor" render={(props) => <DoctorView {...props} appointments={this.props.appointments} />} />
                <Route path="/history/:userid" render={(props) => <PatientHistory {...props} appointments={this.props.appointments} />} />
                <Route path="/patientDetails/:userid" render={(props) => <PatientDetails {...props} appointments={this.props.appointments} />} />
            </div>
        );
    }
}

export default Private;