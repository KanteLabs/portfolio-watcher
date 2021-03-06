import React, { Component } from 'react';
import BottomMenu from './components/BottomMenu';
import Home from './components/Home';
import Login from './components/Login';
import Portfolio from './components/Portfolio';
import EtherBalance from './components/EtherBalance';
import { BrowserRouter as Router, Redirect, Switch, Route } from 'react-router-dom';
import firebase from './config/firebase';
import './styles/css/App.css';

var db = firebase.firestore();

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      drawerStatus: false,
      user: false,
      authState: false
    }
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user)=>{
      if (user) {
        this.setState({
          user: user.toJSON(),
          authState: true
        })
      }else{
        console.log("not signed in")
      }
    })
  }

  changeDrawerStatus = (status) => {
    if(status){
      this.setState({ drawerStatus: status })
    }else{
      this.setState({ drawerStatus: false})
    }
  }

  render() {
    return (
      <Router>
        <main id="main">
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path="/portfolio" render={() => <Portfolio /> } />
            <Route exact path="/login" render={() => <Login /> } />
            <Route exact path="/ether-balance" render={() => <EtherBalance /> } />
          </Switch>
          <BottomMenu authState={this.state.authState} />
        </main>
      </Router>
    );
  }
}

export default App;