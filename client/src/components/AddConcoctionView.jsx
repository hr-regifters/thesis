import React from 'react';

import Trigger from './Trigger.jsx';
import Action from './Action.jsx';
import AddAction from './AddAction.jsx';
import SaveNewConcoction from './SaveNewConcoction.jsx';
import CancelNewConcoction from './CancelNewConcoction.jsx';

export default class AddConcoctionView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      trigger: '',
      triggerOption: '',
      triggerParams: '',
      actions: []
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

  modifyTriggerParams(param) {
    this.setState({
      triggerParams: param,
    });
  }

  render() {
    return (
      <div>
        <Trigger state={this.state} 
                 servicesDetail={this.props.appState.servicesDetail}  
                 modifyTrigger={this.modifyTrigger.bind(this)}
                 modifyTriggerOption={this.modifyTriggerOption.bind(this)}
                 modifyTriggerParams={this.modifyTriggerOption.bind(this)} />
        { 
          this.state.actions.map((action) => {
            return (
              <div>
                <Action action={action} />
              </div>
            );
          })
        }
        <AddAction />
        <CancelNewConcoction changeViewTo={this.props.changeViewTo} />
        <SaveNewConcoction changeViewTo={this.props.changeViewTo}/>
      </div>
    );
  }

}
