import React from 'react';
import Navigator from './Navigator.jsx';
import servicesDetail from '../servicesDetailJSON.js';
import currUrl from './../../../currUrl';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.funcs = {
      changeState: this.changeState.bind(this),
      changeViewTo: this.changeViewTo.bind(this),
      saveConcoction: this.saveConcoction.bind(this),
      modifyTrigger: this.modifyTrigger.bind(this),
      modifyTriggerOption: this.modifyTriggerOption.bind(this),
      modifyTriggerParams: this.modifyTriggerParams.bind(this),
      modifyTriggerReveal: this.modifyTriggerReveal.bind(this),
      modifyAction: this.modifyAction.bind(this),
      modifyActionOption: this.modifyActionOption.bind(this),
      modifyActionParams: this.modifyActionParams.bind(this),
      modifyActionReveal: this.modifyActionReveal.bind(this),
      addNewAction: this.addNewAction.bind(this),
    }

    this.state = {
      user: '',
      view: 'verify',  // home, addConcoction, verify
      spotlightConcoctionId: 1,
      concoctions: [],
      connectedServices: {
        slack: false,
        evernote: false,
      },
      trigger: '',
      triggerOption: '',
      triggerParams: '',
      triggerServicesReveal: 'hide',

      actions: [
        { action: '',
          actionOption: '',
          actionParams: '',
          actionServicesReveal: 'hide',
        },
      ],
    };
  }

  componentDidMount() {
    if (sessionStorage.getItem("appState") === undefined) {
      sessionStorage.setItem("appState", JSON.stringify(this.state));
    } else {
      this.setState( JSON.parse(sessionStorage.getItem("appState")) );
    }
  }

  componentDidUpdate() {
    sessionStorage.setItem("appState", JSON.stringify(this.state));
  }

  changeViewTo(view) {
    this.setState({
      user: '',
      view: view,  // home, concoctionEdit, addConcoction
      spotlightConcoctionId: 1,
      //concoctions: [],
      connectedServices: {
        slack: false,
        evernote: false,
      },
      trigger: '',
      triggerOption: '',
      triggerParams: '',
      triggerServicesReveal: 'hide',

      actions: [
        { action: '',
          actionOption: '',
          actionParams: '',
          actionServicesReveal: 'hide',
        },
      ],
    });
  }

  changeState(state, val) {
    var temp = this.state;
    temp[state] = val;
    this.setState(temp);
  }

  saveConcoction(desc) {
    let context = this;
    let trigger = servicesDetail.servicesDetailJSON[context.state.trigger].trigger.options[context.state.triggerOption].alias;
    let actionFunction = servicesDetail.servicesDetailJSON[context.state.actions[0].action].action.options[context.state.actions[0].actionOption].alias;
    let actionApi = this.state.actions[0].action;
    console.log(this.state.trigger)
    fetch(`${currUrl}/api/constructor/${this.state.trigger}/add`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        trigger: trigger,
        username: context.state.user,
        actionApi: actionApi,
        actionFunction: actionFunction,
        actionParams: context.state.actions[0].actionParams, // parent notebook, evernote token,
        description: `If a ${trigger.slice(0, trigger.indexOf('_'))} is ${trigger.slice(trigger.indexOf('_') + 1)} in ${context.state.trigger}, ${actionFunction} to ${actionApi}`,
      }),
    })
    .then(function(res) {
      if (res.status === 201) {
        context.changeViewTo('home');
      }
    });
  }

  modifyTrigger(trig) {
    this.setState({
      trigger: trig,
    });
  }

  modifyTriggerOption(opt) {
    this.setState({
      triggerOption: opt,
    });
  }

  modifyTriggerParams(param, alias) {
    this.setState({
      triggerParams: {
        param: param,
        alias: alias,
      },
    });
    this.modifyTriggerReveal();
  }

  modifyTriggerReveal() {
    var status;
    if (this.state.triggerServicesReveal === 'show') {
      status = 'hide';
    } else {
      status = 'show';
    }
    this.setState({
      triggerServicesReveal: status,
    });
  }

  modifyAction(action, index) {
    var temp = this.state.actions;
    temp[index].action = action;
    this.setState({
      actions: temp,
    });
  }

  modifyActionOption(opt, index) {
    var temp = this.state.actions;
    temp[index].actionOption = opt;
    this.setState({
      actions: temp,
    });
  }

  modifyActionParams(param, alias, index) {
    var temp = this.state.actions;
    temp[index].actionParams = {};
    temp[index].actionParams[alias] = param;
    this.setState({
      actions: temp,
    });
    this.modifyActionReveal(index);
  }

  modifyActionReveal(index) {
    var status;
    if (this.state.actions[index].actionServicesReveal === 'show') {
      status = 'hide';
    } else {
      status = 'show';
    }
    var temp = this.state.actions;
    temp[index].actionServicesReveal = status;
    this.setState({
      actions: temp,
    });
  }
  
  addNewAction() {
    var temp = this.state.actions;
    temp.push({
      action: '',
      actionOption: '',
      actionParams: '',
      actionServicesReveal: 'hide',
    });
    this.setState({
      actions: temp,
    });
  }


  render() {
    return (
      <div className="full">
        <Navigator appState={this.state} functions={this.funcs} />
      </div>
    );
  }
}
