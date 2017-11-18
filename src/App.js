import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import axios from 'axios';

import Nav from './components/Nav/Nav';
import ProgressBar from './components/ProgressBar/ProgressBar';
import Home from './components/Home/Home';
import Main from './components/Main/Main';
import Layout from './components/Layout/Layout';
import Sidebar from './components/Sidebar/Sidebar';

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
          <Layout>
            <Sidebar>
              <Nav data={this.state.people} />
            </Sidebar>
            <Main>
              <Home />
            </Main>
          </Layout>
        </div>
      </Router>
    );
  }
}

export default App;
