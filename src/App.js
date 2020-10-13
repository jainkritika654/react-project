import React, { Component } from 'react';
import Blog from './blog/Blog';
import './App.css';
import Home from './cmp/Home';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

class App extends React.Component {
  render() { 
    return ( 
      <div className="App">
        <Router>
        <Home />
        <Redirect />
        <Blog />
        </Router>
      </div>
     );
  }
}
 
export default App;



