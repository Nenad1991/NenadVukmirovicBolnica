import React from 'react';
import usersData from '../../data/users.json';
import {withRouter} from 'react-router-dom';

class LoginPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errors: {},
      users: usersData
    };

    this.onChangedUsername = this.onChangedUsername.bind(this);
    this.onChangedPassword = this.onChangedPassword.bind(this);
    this.isValidForm = this.isValidForm.bind(this);
    this.login = this.login.bind(this);
  }

  onChangedUsername(e) {
    this.setState({ username: e.target.value });
  }

  onChangedPassword(e) {
    this.setState({ password: e.target.value });
  }

  isValidForm(){
    let errorsObj = {};
    let isFormValid = true;
    let user = this.state.users.find(user => user.username == this.state.username && user.password== this.state.password);
   

    if (typeof user === 'undefined' && this.state.username !== '' && this.state.password !== '' ) {
      errorsObj["user_not_found"] = "Korisnicko ime ili lozinka su pogresni";
      isFormValid = false;
    }

   

    if (this.state.username === '') {
      errorsObj["username"] = "Obavezno polje - username";
      isFormValid = false;
    }

    if (this.state.password === '') {
      errorsObj["password"] = "Obavezno polje - password";
      isFormValid = false;
    }
    this.setState({ errors: errorsObj });
    return isFormValid;
  }

  login() {
      if(this.isValidForm()){      
          let isLoggedIn = false;
          let isDoctor = false;
          let user = this.state.users.find(user => user.username == this.state.username && user.password == this.state.password);

          if(typeof user !== 'undefined'){
            if(typeof user.isDoctor !== 'undefined' && user.isDoctor === true){
               // this.props.history.push('/doctor');
                isLoggedIn = true;
                isDoctor = true;
            }else{
              isLoggedIn = true;
              //this.props.history.push('/patient');
            }

              this.props.login(isLoggedIn, isDoctor, user.id, user.firstName, user.lastName);

              if (isLoggedIn) {
                if (isDoctor) {
                  this.props.history.push('/doctor');
                } else {
                  this.props.history.push('/patientDetails/' + user.id);
                }
              } else {
                this.props.history.push('/login');
              }

          }else{
           // this.props.history.push('/login');
          }
      }   
  }

  render() {
    return (
      <div className="container" >
        <div className="form-group">
          <label>Username:</label> <input className="form-control" type="text" value={this.state.username} onChange={this.onChangedUsername} />
          <span style={{ color: "red" }} >{this.state.errors["username"]} </span>
          <span style={{ color: "red" }} >{this.state.errors["user_not_found"]} </span>
        </div>

        <div className="form-group">
          <label>Password:</label> <input className="form-control" type="text" value={this.state.password} onChange={this.onChangedPassword} />
          <span style={{ color: "red" }} >{this.state.errors["password"]} </span>
          <span style={{ color: "red" }} >{this.state.errors["password_not_found"]} </span>
        </div>

        <input type="submit" className="btn btn-info" value="Login" onClick={this.login} ></input>
      </div>
    );
  }
}

export default withRouter(LoginPage);