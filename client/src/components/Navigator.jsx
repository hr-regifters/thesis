import React from 'react';
import HomeView from './HomeView.jsx';
import AddConcoctionNav from './AddConcoctionNav.jsx';
import Verification from './Verification.jsx';

const Navigator = (props) => {
  // navigator renders different components based on the view in the app state
  if (props.appState.view === 'verify') {
    return (
      <div className="full">
        <Verification appState={props.appState} changeState={props.functions.changeState} changeViewTo={props.functions.changeViewTo} />
      </div>
    );
  } else if (props.appState.view === 'home') {
    return (
      <div className="full">
        <HomeView appState={props.appState} funcs={props.functions} changeState={props.functions.changeState} changeViewTo={props.functions.changeViewTo} />
      </div>
    );
  } else if (props.appState.view === 'addConcoction') {
    return (
      <div className="full">
        <AddConcoctionNav appState={props.appState} funcs={props.functions} changeState={props.functions.changeState} changeViewTo={props.functions.changeViewTo} />
      </div>
    );
  }
};

export default Navigator;
