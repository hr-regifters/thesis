import React from 'react';
import servicesDetail from '../servicesDetailJSON.js';

import Navigator from './Navigator.jsx';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      view: 'home',  // home, concoctionEdit, addConcoction, verify
      concoctions: [
        { id: 2,
          description: 'testConcoction2',
          services: {
            trigger:
              { serviceName: 'slack',
              },
            actions: [
              { serviceName: 'evernote',
              },
            ],
          },
        },
      ],
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

  render() {
    return (
      <div>
        <Navigator appState={this.state} changeViewTo={this.changeViewTo.bind(this)} />
      </div>
    );
  }
}
