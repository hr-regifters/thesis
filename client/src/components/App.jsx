class App extends React.Component {
  constructor(props) {
		super(props);
    this.state = {
      user: '',
      view: 'home', //home , concoctionEdit, addConcoction
      spotlightConcoctionId: 1,
      //concoctionIds: [''],
      concoctions:[
        { id: 1,
          description: 'testConcoction', 
          services: {
            trigger:
              {serviceName: 'slack',
                option: '',
                optionParams: ''
              },
            actions: [
              {serviceName: 'evernote',
                option: '',
                optionParams: ''
              }
            ]
          }
        }
      ],
      servicesDetail: 'sevicesDeatailJSON',
      connectedServices: {
        slack: false,
        evernote: false
      }
    }
	}

	render() {
    return (
      <div>
        <HomePage appState={this.state} />
      </div>
    )
	}
}

window.App = App;