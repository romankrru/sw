import React from 'react';

const Main = (props) => {
  return (
    <div className="column column-67">
      {props.children}
    </div>
  );
};

export default Main;