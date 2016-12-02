"use strict"
import React from 'react';
import Navigator from './Navigator.jsx';
import servicesDetail from '../servicesDetailJSON.js';
import instructions from '../instructionDetail.js';
import currUrl from './../../../currUrl';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.logHistory = true;

    this.funcs = {
      changeState: this.changeState.bind(this),
      changeViewTo: this.changeViewTo.bind(this),
      modifyInstructions: this.modifyInstructions.bind(this),
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
      logout: this.logout.bind(this),
      undoLast: this.undoLast.bind(this),
    };
    // the app component's state is the single source of truth for the entire app
    this.state = {
      user: '',
      message: [1],
      view: 'verify',  // home, addConcoction, verify
      previousView: 'verify',
      concoctions: [],
      connectedServices: {},
      trigger: '',
      triggerOption: '',
      triggerParams: {},
      triggerServicesReveal: 'hide',

      actions: [
        { action: '',
          actionOption: '',
          actionParams: '',
          actionServicesReveal: 'hide',
        },
      ],
      instructions: 'First, go ahead and choose a trigger for Regift3d to listen to. Click "Trigger" to reveal more.'
    };
  }
  // looks into session storage for a previous app state, loads it and renders it if so
  componentDidMount() {
    this.getConcoctions();
    if (sessionStorage.getItem('appState') === undefined) {
      sessionStorage.setItem('appState', JSON.stringify(this.state));
    } else {
      this.setState(JSON.parse(sessionStorage.getItem('appState')));
    }

    if (sessionStorage.getItem('stateHistory') === null) {
      sessionStorage.setItem('stateHistory', JSON.stringify([this.state]));
    }
  }
  // serializes the current state to be loaded if the user leaves the application and reloads it
  componentDidUpdate() {
    if (this.state.previousView !== this.state.view && this.state.view !== 'verify') {
      this.getConcoctions();
    }
    sessionStorage.setItem('appState', JSON.stringify(this.state));
    let currentHistory = JSON.parse(sessionStorage.getItem('stateHistory'));
    if (this.state.view === 'addConcoction' && this.logHistory === true) {
      currentHistory.push(this.state);
      sessionStorage.setItem('stateHistory', JSON.stringify(currentHistory));
    }
    this.logHistory = true;
  }
 //
  changeViewTo(view) {
    this.changeState('previousView', this.state.view);
    this.setState({
      view: view,  // possible views: home, concoctionEdit, addConcoction
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
      instructions: 'First, go ahead and choose a trigger for Regift3d to listen to. Click "Trigger" to reveal more.',
    });
    sessionStorage.setItem('stateHistory', '[]');
  }

  changeState(state, val) {
    let temp = this.state;
    temp[state] = val;
    this.setState(temp);
  }
  //triggered when the 'launch' button is clicked
  //gathers the concoction specifications from the app state
  //sends to the constructor api to be created on the server side and on the database
  saveConcoction() {
    let concoctionList = this.state.actions.map((api) => {
      let triggerEvent = servicesDetail[this.state.trigger].trigger.options[this.state.triggerOption].alias;
      let actionEvent = servicesDetail[api.action].action.options[api.actionOption].alias;
      let concoction = {
        username: this.state.user,
        triggerApi: this.state.trigger,
        triggerEvent: triggerEvent,
        triggerParams: this.state.triggerParams,
        actionApi: api.action,
        actionEvent: actionEvent,
        actionParams: api.actionParams,
        description: `If a ${triggerEvent.slice(0, triggerEvent.indexOf('_'))} is ${triggerEvent.slice(triggerEvent.indexOf('_') + 1)} in ${servicesDetail[this.state.trigger].name}, ${actionEvent.slice(0, actionEvent.indexOf('_'))} ${actionEvent.slice(actionEvent.indexOf('_') + 1)} through ${servicesDetail[api.action].name}`,
      };
      return concoction;
    });
    console.log(concoctionList);
    let context = this;
    fetch(`${currUrl}/api/constructor/add`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(concoctionList),
    })
    .then((res) => {
      if (res.status === 201) {
        context.changeViewTo('home');
      } else {
        console.log('Concoction unabled to be saved')
      }
    });
  }
  //stores the serialized state of the app in session storage so it can be un-done
  undoLast() {
    // get the state history
    let history = sessionStorage.getItem('stateHistory');
    // parse the state history
    history = JSON.parse(history);
    // slice the last one off
    history = history.slice(0, -1);
    // set the state to the last one in the array
    sessionStorage.setItem('stateHistory', JSON.stringify(history));
    this.logHistory = false;
    this.setState(history[history.length - 1]);
  }
  // renders the appropriate instructions from the instructionsDetial based on signals from the action and trigger  components
  modifyInstructions(index) {
    this.setState({
      instructions: instructions.instructions[index],
    });
  }

  getConcoctions() {
    let context = this;
    fetch(`${currUrl}/api/user/concoctions?username=${this.state.user}`, {
      method: 'GET',
    })
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      } else {
        throw new Error('Cannot retrieve concoctions');
      }
    })
    .then((concObj) => {
      context.changeState('concoctions', concObj.concoctions);
      concObj['oauths'].forEach((api) =>
        context.state.connectedServices[api] = true
      );
      context.changeState('connectedServices', context.state.connectedServices);
      context.changeState('previousView', context.state.view);
    })
    .catch((err) => { console.log(err) });
  }

  logout() {
    let context = this;
    fetch(`${currUrl}/api/user/logout`, {
      method: 'GET',
    })
    .then((res) => {
      if (res.status === 200) {
        console.log('Successful logout');
        localStorage.removeItem('regiftUsername');
        context.changeViewTo('verify');
        sessionStorage.setItem('appState', '{}');
        sessionStorage.setItem('stateHistory', '[]');
      } else {
        throw new Error('Cannot log out');
      }
    })
    .catch((err) => { console.log(err); });
  }
 // these functions are responsible for changing the app's state to both
 // render and store the users selections as they create a concoction
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

  modifyTriggerParams(param) {
    let triggerOptions = servicesDetail[this.state.trigger].trigger.options[this.state.triggerOption];
    let triggerOptionParams = triggerOptions.parameters;
    let triggerObj = {};
    let updatedParams = {};
    let alias;
    for (let i = 0; i < param.length; i++) {
      for (let j = 0; j < triggerOptionParams.length; j++) {
        if (triggerOptionParams[j].alias === param[i].id) {
          updatedParams[param[i].id] = param[i].value;
          triggerObj.param = updatedParams;
        }
      }
    }
    triggerObj.alias = triggerOptions.alias;
    this.setState({
      triggerParams: triggerObj,
    });
    this.modifyTriggerReveal();
  }

  modifyTriggerReveal() {
    let status;
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
    let temp = this.state.actions;
    temp[index].action = action;
    this.setState({
      actions: temp,
    });
  }

  modifyActionOption(opt, index) {
    let temp = this.state.actions;
    temp[index].actionOption = opt;
    this.setState({
      actions: temp,
    });
  }

  modifyActionParams(param, index) {
    let actionApi = this.state.actions[index];
    let actionOptionParams = servicesDetail[actionApi.action].action.options[actionApi.actionOption].parameters;
    let updatedParams = {};
    for (let i = 0; i < param.length; i++) {
      for (let j = 0; j < actionOptionParams.length; j++) {
        if (actionOptionParams[j].alias === param[i].id) {
          updatedParams[param[i].id] = param[i].value;
        }
      }
    }
    let temp = this.state.actions;
    temp[index].actionParams = updatedParams;
    this.setState({
      actions: temp,
    });
    this.modifyActionReveal(index);
  }

  modifyActionReveal(index) {
    let status;
    if (this.state.actions[index].actionServicesReveal === 'show') {
      status = 'hide';
    } else {
      status = 'show';
    }
    let temp = this.state.actions;
    temp[index].actionServicesReveal = status;
    this.setState({
      actions: temp,
    });
  }

  addNewAction() {
    let temp = this.state.actions;
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
      <div className='full'>
        <Navigator appState={this.state} functions={this.funcs} />
      </div>
    );
  }
}
