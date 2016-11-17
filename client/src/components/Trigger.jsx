import React from 'react';
import currUrl from './../../../currUrl';

const Trigger = (props) => {
  if (props.state.trigger === '') {
    //display slack and evernote triggers
    return(
      <div>
        <div onClick={ () => props.modifyTrigger('slack')}>
          <a href={`${currUrl}/api/oauth/slack`}>slack</a>
        </div>
        <div onClick={ () => props.modifyTrigger('evernote')}>
          <a href={`${currUrl}/api/oauth/evernote`}>evernote</a>
        </div>
      </div>
    );
  } else if (props.state.triggerOptions === '') {
    //display trigger in state and show options for trigger in state
    return(
      <div>
        <div>
          {props.state.trigger}
        </div>
        <div>
          {props.servicesDetail.servicesDetailJSON[props.state.trigger].trigger.options[0].description}
        </div>
      </div>
    );
  } else if (props.state.triggerParams === '') {
    //display trigger and option in state 
    return(
      <div>
        <div>
          {props.state.trigger}
        </div>
        <div>
          {props.servicesDetail.servicesDetailJSON[props.state.trigger].trigger.options[0].description}
        </div>
        <div>
          no parameters
        </div>
      </div>
    );
  }

//   // render() {
//   //   return (
//   //     <div>
//   //       <div>
//   //       Trigger:
//   //       </div>
//   //       if trigger is ''
//   //       display slack and evernote triggers
//   //       if triggerOption is ''
//   //       display options for trigger in state
//   //       if triggerParams  is ''
//   //       display params 

//   //     </div>
//   //   );
//   // }
}

export default Trigger;
