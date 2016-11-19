import React from 'react';
import servicesDetail from '../servicesDetailJSON.js';

import Navigator from './Navigator.jsx';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      view: 'verify',  // home, concoctionEdit, addConcoction
      spotlightConcoctionId: 1,
      // concoctionIds: [''],
      concoctions: [],
      servicesDetail: servicesDetail,
      connectedServices: {
        slack: false,
        evernote: false,
      },
    };
  }

  changeViewTo(view, spotlightId) {
    this.setState({
      view: view,
      spotlightConcoctionId: spotlightId || -1,
    });
  }

  changeState(state, val) {
    var temp = this.state;
    temp[state] = val;
    this.setState(temp);
  }

  render() {
    return (
      <div className="full">
        <Navigator appState={this.state} changeState={this.changeState.bind(this)} changeViewTo={this.changeViewTo.bind(this)} />
      </div>
    );
  }
}
