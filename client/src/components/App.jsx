"use strict"
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
      logout: this.logout.bind(this)
    }

    this.state = {
      user: '',
      view: 'verify',  // home, addConcoction, verify
      previousView: 'verify',
      spotlightConcoctionId: 1,
      concoctions: [],
      connectedServices: {},
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
    this.getConcoctions();
    if (sessionStorage.getItem('appState') === undefined) {
      sessionStorage.setItem('appState', JSON.stringify(this.state));
    } else {
      this.setState(JSON.parse(sessionStorage.getItem('appState')));
    }
  }

  componentDidUpdate() {
    if (this.state.previousView !== this.state.view && this.state.view !== 'verify') {
      this.getConcoctions();
    }
    sessionStorage.setItem('appState', JSON.stringify(this.state));
  }

  changeViewTo(view) {
    this.changeState('previousView', this.state.view);
    this.setState({
      view: view,  // home, concoctionEdit, addConcoction
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
    let temp = this.state;
    temp[state] = val;
    this.setState(temp);
  }

  saveConcoction() {
    let context = this;
    let triggerEvent = servicesDetail[context.state.trigger].trigger.options[context.state.triggerOption].alias;
    let actionApi = this.state.actions[0].action;
    let actionEvent = servicesDetail[context.state.actions[0].action].action.options[context.state.actions[0].actionOption].alias;
    fetch(`${currUrl}/api/constructor/add`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        triggerApi: context.state.trigger,
        triggerEvent: triggerEvent,
        triggerParams: {},
        username: context.state.user,
        actionApi: actionApi,
        actionEvent: actionEvent,
        actionParams: context.state.actions[0].actionParams,
        description: `If a ${triggerEvent.slice(0, triggerEvent.indexOf('_'))} is ${triggerEvent.slice(triggerEvent.indexOf('_') + 1)} in ${servicesDetail[context.state.trigger].name}, ${actionEvent.slice(0, actionEvent.indexOf('_'))} ${actionEvent.slice(actionEvent.indexOf('_') + 1)} to ${servicesDetail[actionApi].name}`,
      }),
    })
    .then((res) => {
      if (res.status === 201) {
        context.changeViewTo('home');
      } else {
        console.log('Concoction unabled to be saved')
      }
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
      } else {
        throw new Error('Cannot log out');
      }
    })
    .catch((err) => { console.log(err) });
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
    };
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
      <div className="full">
        <Navigator appState={this.state} functions={this.funcs} />
      </div>
    );
  }
}
