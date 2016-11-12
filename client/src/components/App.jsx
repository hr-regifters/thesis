class App extends React.Component {
  constructor(props) {
		super(props);
    this.state = {
      user: '',
      view: 'home', //home , concoctionEdit, addConcoction
      spotlightConcoctionId: '',
      //concoctionIds: [''],
      concoctions:[
        {id: '',
         description: '', 
         services: [
          {trigger: '',
           triggerOption: '',
           triggerOptionParams: ''}, 
           {action: '',
            actionOption: '',
            actionOptionParams: ''}
         ]}
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