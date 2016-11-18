import React from 'react';

import AddConcoctionNav from './AddConcoctionNav.jsx';

export default class AddConcoctionView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      description: '',
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

  modifyDescription(desc) {
    this.setState({
      description: desc,
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
    console.log(param, alias);
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
    temp[index].actionParams = {
        param: param,
        alias: alias,
      };
    this.setState({
      actions: temp,
    });
    this.modifyActionReveal(index);
    console.log(this.state);
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
      <div>
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
                           modifyDescription={this.modifyDescription} />
      </div>
    );
  }

}
