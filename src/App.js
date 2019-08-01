import React from 'react';
import NoteTaking from './component/noteTaking';
import './component/noteTaking.css';
import { logicalExpression } from '@babel/types';
import LoginForm from './login/login'

const Welcome = ({user, onSignOut})=> {

  return (
    <div>
      Welcome, <strong>{user.username}</strong>!
      <p>
      <a href="javascript:;" onClick={onSignOut}>sign out</a>
      </p>
      <NoteTaking/>
    </div>
  )
}

class App extends React.Component {
    
  constructor(props) {
    super(props)

    this.state = {
      user: null
    }
    this.signIn = this.signIn.bind(this);
  }
  
  signIn(username, password) {
    
    this.setState({
      user: {
        username,
        password,
      }
    })
  }

  signOut() {

    this.setState({user: null})
  }
  
  render() {
  
    return (
      <div>
        <h1>Note Taking App</h1>
        { 
          (this.state.user) ? 
            <Welcome 
             user={this.state.user} 
             onSignOut={this.signOut.bind(this)} 
            />
          : 
            <LoginForm 
             onSignIn = {this.signIn} 
            />
        }
      </div>
    )
    
  }
  
}

export default App;
