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
      concoctions: [
        { id: 2,
          description: 'takes a slack file and adds it to your evernote for you!',
          services: {
            trigger:
              {
                serviceName: 'slack',
              },
            actions: [
              { serviceName: 'evernote',
              },
            ],
          },
        },
        { id: 7,
          description: 'takes a slack file and adds it to your evernote for you!',
          services: {
            trigger:
              {
                serviceName: 'slack',
              },
            actions: [
              { serviceName: 'evernote',
              },
            ],
          },
        },
        { id: 8,
          description: 'takes a slack file and adds it to your evernote for you!',
          services: {
            trigger:
              {
                serviceName: 'slack',
              },
            actions: [
              { serviceName: 'evernote',
              },
            ],
          },
        },
        { id: 9,
          description: 'takes a slack file and adds it to your evernote for you!',
          services: {
            trigger:
              {
                serviceName: 'slack',
              },
            actions: [
              { serviceName: 'evernote',
              },
            ],
          },
        },
        { id: 4,
          description: 'takes a slack file and adds it to your evernote for you!',
          services: {
            trigger:
              {
                serviceName: 'slack',
              },
            actions: [
              { serviceName: 'evernote',
              },
            ],
          },
        },
        { id: 5,
          description: 'takes a slack file and adds it to your evernote for you!',
          services: {
            trigger:
              {
                serviceName: 'slack',
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
      <div className="full">
        <Navigator appState={this.state} changeViewTo={this.changeViewTo.bind(this)} />
      </div>
    );
  }
}
