"use strict"
import React from 'react';

import Trigger from './Trigger.jsx';
import Action from './Action.jsx';
import AddAction from './AddAction.jsx';
import SaveNewConcoction from './SaveNewConcoction.jsx';
import CancelNewConcoction from './CancelNewConcoction.jsx';

export default class Verification extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };
    this.url = 'https://regifters48.herokuapp.com'
  }

  signUp() {
    let context = this;
    let username = document.getElementById('newUsername').value;
    let password = document.getElementById('newPassword').value;
    let email = document.getElementById('newPassword').value;
    fetch(`${this.url}/api/user/signup`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({username: username, password: password, email: email}) //TODO: change to username in cookie 
    })
    .then(function(res) {
      if (res.status === 201) {
        console.log('success!');
        context.props.changeViewTo('home');
      } else {
        console.log(res);
      }
    });
  }

  logIn() {
    let context = this;
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    fetch(`${this.url}/api/user/login`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({username: username, password: password}) //TODO: change to username in cookie 
    })
    .then(function(res) {
      if (res.status === 201) {
        console.log('success!');
        context.props.changeViewTo('home');
      } else {
        console.log(res);
      }
    });
  }

  render() {
    return (
      <div>
        <div id="SignUp">
          <form>
            <h2>SIGNUP</h2>
            <input placeholder="what's your name?" id="newUsername" />
            <input placeholder="password" id="newPassword" />
            <input placeholder="email" id="newEmail" />
            <button className="signupButton" onClick={this.signUp.bind(this)} type="button">Register</button>
          </form>

          <form>
            <h2>LOGIN</h2>
            <input placeholder="what's your name?" id="username" />
            <input placeholder="password" id="password" />
            <button className="loginButton" onClick={this.logIn.bind(this)} type="button">Login</button>
          </form>
        </div>
      </div>
    );
  }
}
