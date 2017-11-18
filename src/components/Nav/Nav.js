import React from 'react';
import './Nav.css';
import {Link} from 'react-router-dom';

const Nav = (props) => {
  return (
    <ul className="nav">
      {
        props.data.map((person, index) => {
          return (
            <li key={person.url}>
              <Link to={`/person/${person.name}`}>
                {person.name}
              </Link>
            </li>
          );
        })
      }
    </ul>
  );
};

export default Nav;