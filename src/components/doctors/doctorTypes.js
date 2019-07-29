import React from 'react';
import doctorTypes from '../../data/doctorTypes.json';

class DoctorTypes extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedDocorType: 0
    };

    this.onSelectDoctorTypeChild = this.onSelectDoctorTypeChild.bind(this);
  }

  onSelectDoctorTypeChild(e) {
    this.props.onSelectDoctorType(e.target.value)
  }

  render() {
    return (
      <>
        <div className="container" >
          <div className="form-group">
            <label><h3>Doctor types</h3></label>
            <select className="form-control" onChange={this.onSelectDoctorTypeChild}>
              <option key={0} value={0} >{this.props.label}</option>
              {doctorTypes.map((item, index) => (
                <option key={index} value={item.id} >{item.name}</option>
              ))
              }
            </select>
          </div>
        </div>
      </>
    );
  }
}

DoctorTypes.defaultProps = {
  label: "--Select --"
}
export default DoctorTypes;