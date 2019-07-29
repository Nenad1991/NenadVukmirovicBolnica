import React from 'react';
import users from '../../data/users.json';

class Patients extends React.Component {
    constructor(props) {
      super(props);
      this.onSelectPatientChild = this.onSelectPatientChild.bind(this);
    }
  
    onSelectPatientChild(e) {
      this.props.onSelectPatient(e.target.value)  
    }
  
    render() {
      return (
        <div className="container" >
          <div className="form-group">
            <label><h3>Patients</h3></label>
            <select className="form-control" onChange={this.onSelectPatientChild}>
               <option key={0} value={0} >-- Select --</option>
              {users.filter(user => user.isDoctor != true).map((item, index) => (
                <option key={index} value={item.id} >{item.firstName}</option>
              ))
              }
            </select>
          </div>
        </div>
      );
    }
  }

  export default Patients;