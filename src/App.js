import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import axios from 'axios';

import Nav from './components/Nav/Nav';
import ProgressBar from './components/ProgressBar/ProgressBar';
import Home from './components/Home/Home';

const PEOPLE_URL = 'https://swapi.co/api/people';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      people: [],
      startProgress: false
    }

    this.getPeople = this.getPeople.bind(this);
  }

  getPeople(url) {
    axios.get(url)
      .then((response) => {
        this.setState({
          people: [...this.state.people, ...response.data.results]
        });

        if (response.data.next) {
          this.getPeople(response.data.next);
        } else {
          this.setState({
            startProgress: false
          });
        }

      })
      .catch(function (error) {
        console.log(error);
      });
  }

  componentDidMount() {
    this.getPeople(PEOPLE_URL);
    this.setState({
      startProgress: true
    });
  }

  render() {
    console.log(this.state)

    return (
      <Router>
        <div className="App">
          <ProgressBar startProgress={this.state.startProgress} />
          <div className="container">
            <div className="row">
              <div className="column column-33">
                <Nav data={this.state.people} />
              </div>
              <div className="column column-67">
                <Home />
              </div>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
