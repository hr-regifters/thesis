import React from 'react';

import Concoction from './Concoction.jsx';

export default class HomeView extends React.Component {
  constructor(props) {
    super(props);
  }

  transitionToAddConcoction() {
    // css animations
    // change view on app state to addConcoction
    this.props.changeViewTo('addConcoction');
  }

  render() {
    return (
      <div>
        {this.props.appState.concoctions.map((concoction) => {
          return (
            <div key={concoction.id}>
              <Concoction concoctionInfo={concoction} servicesDetail={this.props.appState.servicesDetail} />
            </div>
          );
        })}
      <div onClick={() => { this.transitionToAddConcoction() }}>
        Add Concoction
      </div>
      </div>
    );
  }
}
