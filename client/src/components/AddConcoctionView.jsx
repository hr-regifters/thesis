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
      actions: [],
    };
  }

  render() {
    return (
      <div>
        <Trigger trigger={this.state.trigger} servicesDetail={this.props.appState.servicesDetail} />
        { this.state.actions.map((action) => {
          return (
            <div>
              <Action action={action} />
            </div>
          );
        })}
        <AddAction />
        <CancelNewConcoction changeViewTo={this.props.changeViewTo} />
        <SaveNewConcoction />
      </div>
    );
  }

}
