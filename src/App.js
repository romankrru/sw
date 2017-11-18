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
import PersonInfo from './components/PersonInfo/PersonInfo';

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
    return (
      <Router>
        <div className="App">
          <ProgressBar startProgress={this.state.startProgress} />
          <Layout>
            <Sidebar>
              <Nav data={this.state.people} />
            </Sidebar>
            <Main>
              <Route exact path="/" component={Home} />
              <Route
                path="/person/:personName"
                render={(props) => {
                  props.history.listen(() => window.scroll({
                    top: 0,
                    left: 0,
                    behavior: 'smooth'
                  }));

                  const personData = this.state.people.find((el) => {
                    return el.name === props.match.params.personName;
                  });
                  
                  return <PersonInfo personData={personData} />
                }}
              />
            </Main>
          </Layout>
        </div>
      </Router>
    );
  }
}

export default App;
