import React from 'react';

import HomeView from './HomeView.jsx';
import ConcoctionView from './ConcoctionView.jsx';
import AddConcoctionView from './AddConcoctionView.jsx';
import Verification from './Verification.jsx';


const Navigator = (props) => {
  if (props.appState.view === 'verify') {
    return (
      <div>
        <Verification appState={props.appState} changeViewTo={props.changeViewTo}/>
      </div>
    )
  } else if (props.appState.view === 'home') {
    return (
      <div>
        <HomeView appState={props.appState} changeViewTo={props.changeViewTo} />
      </div>
    );
  } else if (props.appState.view === 'concoctionEdit') {
    // use the spotlightConcoctionId to find the correct concoction in the concoctions array
    // build the concoction view out of the info stored in the object
    return (
      <div>
        <ConcoctionView appState={props.appState} />
      </div>
    );
  } else if (props.appState.view === 'addConcoction') {
    return (
      <div>
        <AddConcoctionView appState={props.appState} changeViewTo={props.changeViewTo} />
      </div>
    );
  }
};

export default Navigator;
