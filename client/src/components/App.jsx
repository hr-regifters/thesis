class App extends {
  constructor(props) {
		super(props);
    this.state = {
      user: '',
      view: '', //home , concoction
      spotlightConcoctionId: '',
      concoctionIds: [''],
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
    <div>
      <HomePage appState={this.state} />
    </div>
	}
}