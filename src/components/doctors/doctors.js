import React from 'react';
import users from '../../data/users.json';

class Doctors extends React.Component {

  constructor(props) {
    super(props);

    this.onSelectDoctorChild = this.onSelectDoctorChild.bind(this);
  }

  onSelectDoctorChild(e) {
    this.props.onSelectDoctor(e.target.value)
  }
  render() {
    
    return (
      <>
        <div className="container" >
          <div className="form-group">
            <label><h3>Doctors</h3></label>
            <select className="form-control" onChange={this.onSelectDoctorChild} value={this.props.selectedDoctor}>
              <option key={0} value={0} >-- Select --</option>
              {users.filter(user => user.isDoctor == true && user.type == this.props.selectedDoctorType).map((item, index) => (
                <option key={index} value={item.id} >{item.firstName}</option>
              ))
              }
            </select>
          </div>
        </div>
      </>
    );
  }
}

export default Doctors;