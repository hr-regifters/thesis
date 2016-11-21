import React from 'react';
import currUrl from './../../../currUrl';
import { Col, Row, Grid, Table, Navigation, Nav, NavItem } from 'react-bootstrap';
import AddConcoctionNav from './AddConcoctionNav.jsx';

export default class AddConcoctionView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
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

  saveConcoction(desc) {
    let context = this;
    let trigger = this.props.appState.servicesDetail.servicesDetailJSON[context.state.trigger].trigger.options[context.state.triggerOption].alias;
    let actionFunction = this.props.appState.servicesDetail.servicesDetailJSON[context.state.actions[0].action].action.options[context.state.actions[0].actionOption].alias;
    let actionApi = this.state.actions[0].action;
    console.log(this.state.trigger)
    fetch(`${currUrl}/api/constructor/${this.state.trigger}/add`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        trigger: trigger,
        username: context.props.appState.user,
        actionApi: actionApi,
        actionFunction: actionFunction,
        actionParams: context.state.actions[0].actionParams, // parent notebook, evernote token,
        description: `If a ${trigger.slice(0, trigger.indexOf('_'))} is ${trigger.slice(trigger.indexOf('_') + 1)} in ${context.state.trigger}, ${actionFunction} to ${actionApi}`
      }),
    })
    .then(function(res) {
      if (res.status === 201) {
        context.props.changeViewTo('home');
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
      <nav className="navbar navbar-default navbar-fixed-top"> 
        <div className="container-fluid Mod">
        <h3 className="pull-right"> My Apps </h3>
        <h3 className="pull-right"> Profile </h3>
        <h1 className ="navbar-left"> Regift3d</h1>
        </div>
      </nav>
      <Grid id="concViewGrid" className='full'>
      <Row className = 'full'>
        <Col xs={8} xsOffset={2} id="concoctionMakerCol"  >
        <div id="concoctionMakerBox">
          <AddConcoctionNav  state={this.state} 
                             servicesDetail={this.props.appState.servicesDetail}  
                             modifyTrigger={this.modifyTrigger.bind(this)}
                             modifyTriggerOption={this.modifyTriggerOption.bind(this)}
                             modifyTriggerParams={this.modifyTriggerParams.bind(this)}
                             modifyTriggerReveal={this.modifyTriggerReveal.bind(this)}

                             servicesDetail={this.props.appState.servicesDetail}
                             modifyAction={this.modifyAction.bind(this)}
                             modifyActionOption={this.modifyActionOption.bind(this)}
                             modifyActionParams={this.modifyActionParams.bind(this)}
                             modifyActionReveal={this.modifyActionReveal.bind(this)} 
                             changeViewTo={this.props.changeViewTo} 
                             addNewAction={this.addNewAction.bind(this)}
                             connectedServices={this.props.appState.connectedServices}
                             modifyDescription={this.modifyDescription}
                             saveConcoction={this.saveConcoction.bind(this)} />
        </div>
        </Col>
      </Row>
      </Grid>
      </div>
    );
  }

}
