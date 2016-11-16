import React from 'react';

import Navigator from './Navigator.jsx';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      view: 'verify',  // home, concoctionEdit, addConcoction
      spotlightConcoctionId: 1,
      // concoctionIds: [''],
      concoctions: [
        { id: 1,
          description: 'testConcoction',
          services: {
            trigger:
            { serviceName: 'slack',
              option: '',
              optionParams: '',
            },
            actions: [
              { serviceName: 'evernote',
                option: '',
                optionParams: '',
              },
            ],
          },
        },
        { id: 2,
          description: 'testConcoction2',
          services: {
            trigger:
            { serviceName: 'slack',
              option: '',
              optionParams: '',
            },
            actions: [
              { serviceName: 'evernote',
                option: '',
                optionParams: '',
              },
            ],
          },
        },
      ],
      servicesDetail: 'sevicesDeatailJSON',
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
