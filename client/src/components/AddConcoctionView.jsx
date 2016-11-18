import React from 'react';

import Trigger from './Trigger.jsx';
import Action from './Action.jsx';
import SaveNewConcoction from './SaveNewConcoction.jsx';
import CancelNewConcoction from './CancelNewConcoction.jsx';

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
          triggerServicesReveal: '',
        },
      ],
    };
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

  render() {
    return (
      <div>
        <Trigger state={this.state} 
                 servicesDetail={this.props.appState.servicesDetail}  
                 modifyTrigger={this.modifyTrigger.bind(this)}
                 modifyTriggerOption={this.modifyTriggerOption.bind(this)}
                 modifyTriggerParams={this.modifyTriggerParams.bind(this)}
                 modifyTriggerReveal={this.modifyTriggerReveal.bind(this)} />
        { this.state.actions.map((action) => {
          return (
            <div>
              <Action action={action} />
            </div>
          );
        })}
        <Action />
        <CancelNewConcoction changeViewTo={this.props.changeViewTo} />
        <SaveNewConcoction />
      </div>
    );
  }

}
