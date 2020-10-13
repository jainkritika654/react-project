import React, { Component } from "react";
import axios from 'axios';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoginOpen: true, isRegisterOpen: false };
  }

  showLoginBox() {
    this.setState({ isLoginOpen: true, isRegisterOpen: false });
  }

  showRegisterBox() {
    this.setState({ isRegisterOpen: true, isLoginOpen: false });
  }

  render() {
    return (
      <div className="background">
        <div className="main">
          <div className="display">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div className="main-container">
            <div className="top-heading">
              <div className={ "controller " +
                 (this.state.isLoginOpen ? "select" : "") }
                onClick={this.showLoginBox.bind(this)} >
                LOGIN
              </div>
              <div className={ "controller " +
                  (this.state.isRegisterOpen ? "select" : "") }
                onClick={this.showRegisterBox.bind(this)} >
                REGISTER
              </div>
            </div>
            {this.state.isLoginOpen && <LoginBox />}
            {this.state.isRegisterOpen && <RegisterBox />}
          </div>
        </div>
      </div>
    );
  }
}

class LoginBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username:"" ,
      password:"" ,
      redirect: false
    };
  }
  onUsername(e) {
    this.setState({username : e.target.value});
    console.log(this.state);
  }
  onPassword(e) { 
  this.setState({password : e.target.value});
  console.log(this.state);
  }
  handleSubmit = obj => {
    const Data = {
        UserName : this.state.username,
        Password : this.state.password,
    }
    alert(Data.UserName)
     obj.preventDefault();
     axios.post("https://localhost:44392/api/SecurityApi/SignIn",Data).then((response) => {
         if(response.Data == 'success') {
         //localStorage.setItem('Data',responseJSON);
         this.setState({redirect: true});
         alert(response.data.token)
         }
         else {
           console.log("Login Error");
         }
       });
  }

  render() {
    if(this.state.redirect){
     return(<Redirect to={'/blog'}/>)
    }
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
      <div className="content-body">
        <div className="heading">Login</div>
        <div className="box">
          <div className="input-details">
            <label htmlFor="username">Username</label>
            <input type="text" name="username" className="details" placeholder="Username"
            onChange={this.onUsername.bind(this)} />
          </div>

          <div className="input-details">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" className="details" placeholder="Password" 
             onChange={this.onPassword.bind(this)}/>
          </div>

          <input type="button" className="btn" value="Login"  />
        </div>
      </div>
      </form>
    );
  }
}



class RegisterBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      errors: []
    };
  }

  showValidationErr(elm, msg) {
    this.setState((prevState) => ({
      errors: [...prevState.errors, { elm, msg }],
    }));
  }

  clearValidationErr(elm) {
    this.setState((prevState) => {
      let newArr = [];
      for (let err of prevState.errors) {
        if (elm != err.elm) {
          newArr.push(err);
        }
      }
      return { errors: newArr };
    });
  }

  onUsernameChange(e) {
    this.setState({ username: e.target.value });
    this.clearValidationErr("username");
  }

  onEmailChange(e) {
    this.setState({ email: e.target.value });
    this.clearValidationErr("email");
  }

  onPasswordChange(e) {
    this.setState({ password: e.target.value });
    this.clearValidationErr("password");
    }

  submitRegister(e) {
    console.log(this.state);

    if (this.state.username == "") {
      this.showValidationErr("username", "Username Cannot be empty!");
    }
    if (this.state.email == "") {
      this.showValidationErr("email", "Email Cannot be empty!");
    }
    if (this.state.password == "") {
      this.showValidationErr("password", "Password Cannot be empty!");
    }
    else 
    {
      alert(this.state.username + " " +"You have been registered successfully!");
    }
  }
  handleSubmit = obj => {
    const Data = {
        UserName : this.state.username,
        Password : this.state.password,
        Email :  this.state.email
    }
    alert(Data.UserName)
     obj.preventDefault();
     axios.post("https://localhost:44392/api/SecurityApi/Register",Data).then(
       response =>
       {
          let temp = response.data
          alert(temp.token)
       }
     )
  }

  render() {
    let usernameErr = null,
      passwordErr = null,
      emailErr = null;

    for (let err of this.state.errors) {
      if (err.elm == "username") {
        usernameErr = err.msg;
      }
      if (err.elm == "email") {
        emailErr = err.msg;
      }
      if (err.elm == "password") {
        passwordErr = err.msg;
      }
    }

    return (
      <form onSubmit={this.handleSubmit}>
      <div className="content-body">
        <div className="heading">Register</div>
        <div className="box">
          <div className="input-details">
            <label htmlFor="username">Username</label>
            <input type="text" name="username" className="details" placeholder="Username"
              onChange={this.onUsernameChange.bind(this)}/>
           <div className="error">{usernameErr ? usernameErr : ""}</div>
          </div>

          <div className="input-details">
            <label htmlFor="email">Email</label>
            <input type="text" name="email" className="details" placeholder="Email"
              onChange={this.onEmailChange.bind(this)} />
            <div className="error">{emailErr ? emailErr : ""}</div>
          </div>

          <div className="input-details">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" className="details" placeholder="Password"
              onChange={this.onPasswordChange.bind(this)} />
            <div className="error">{passwordErr ? passwordErr : ""}</div>
          </div>

          <input type="button" className="btn" value="Register" onClick={this.submitRegister.bind(this)} />

        </div>
      </div>
      </form>
    );
  }
}

export default Home;
