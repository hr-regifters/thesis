import React from 'react';

class ConcoctionView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      concoction: this.props.appState.concoctions.filter(function(concoction) {
        if (concoction.id === this.props.appState.spotlightConcoctionId) {
          return concoction;
        }
      })
    }
  }

  render() {
    return (
      <div>
         <div>description:{this.state.concoction.description}</div>
        <div>trigger:{this.state.concoction.services.trigger.serviceName}</div>
        { this.state.concoction.services.actions.map(function(action) {
          return(
            <div>
            action:{action.serviceName}
            </div>
          )
        })}
        <AddServiceWindow servicesDetail={this.props.appState.servicesDetail}/>
      </div>
    )
  }
}


window.ConcoctionView = ConcoctionView