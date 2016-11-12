import React from 'react';

export default class Concoction extends React.Component {
  constructor(props) {
    super(props);
  }

  transitionToEdit() {
    // css animations
    // change view on app state to concoctionEdit
    // also pass up the id of the concoction to edit
  }

  render() {
    return (
      <div>
        Concoction: {this.props.concoctionInfo.description}
        <div>
        Turn Off
        </div>
        <div onClick={() => { this.transitionToEdit() }}>
        Edit
        </div>
      </div>
    );
  }
}
