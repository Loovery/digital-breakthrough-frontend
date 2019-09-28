import React, {Component} from 'react';
import {Switch, Route} from 'react-router';
import Service from '../src/Components/Service'
import './App.css';
import Main from  './Components/Main'


export default class App extends Component{
  render(){
    return(
        <Switch>
          <Route exact path='/' component={Main}/>
          <Route path='/service' component={Service}/>
        </Switch>
    )
  }
}