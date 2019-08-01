import React, { Component } from "react";

export default class LoginForm extends React.Component {
  
    constructor(props) {
      super(props);
      this.handleSignIn = this.handleSignIn.bind(this);
    }
  
    handleSignIn(e) {
      e.preventDefault()
      let username = this.refs.username.value
      let password = this.refs.password.value
      this.props.onSignIn(username, password)
    }
    
    render() {
      return (
        <form onSubmit={this.handleSignIn.bind(this)}>
          <h3>Welcome</h3>
          <p>
          <input type="text" ref="username" placeholder="Username" />
          </p>
          <p>
          <input type="password" ref="password" placeholder="Password" />
          </p>
          <p>
          <input type="submit" value="Login" />
          </p>
        </form>
      )
    }
  
}