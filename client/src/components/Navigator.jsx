import React from 'react';

import HomeView from './HomeView.jsx';
import ConcoctionView from './ConcoctionView.jsx';
import AddConcoctionView from './AddConcoctionView.jsx';
import Verification from './Verification.jsx';


const Navigator = (props) => {
  if (props.appState.view === 'verify') {
    return (
      <div className="full">
        <Verification appState={props.appState} changeState={props.changeState} changeViewTo={props.changeViewTo}/>
      </div>
    )
  } else if (props.appState.view === 'home') {
    return (
      <div className="full">
        <HomeView appState={props.appState} changeState={props.changeState} changeViewTo={props.changeViewTo} />
      </div>
    );
  } else if (props.appState.view === 'concoctionEdit') {
    // use the spotlightConcoctionId to find the correct concoction in the concoctions array
    // build the concoction view out of the info stored in the object
    return (
      <div className="full">
        <ConcoctionView appState={props.appState} changeState={props.changeState} />
      </div>
    );
  } else if (props.appState.view === 'addConcoction') {
    return (
      <div className="full">
        <AddConcoctionView appState={props.appState} changeState={props.changeState} changeViewTo={props.changeViewTo} />
      </div>
    );
  }
};

export default Navigator;
