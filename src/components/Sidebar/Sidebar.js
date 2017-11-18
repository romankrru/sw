import React from 'react';

const Sidebar = (props) => {
  return (
    <div className="column column-33">
      {props.children}
    </div>
  );
}

export default Sidebar;