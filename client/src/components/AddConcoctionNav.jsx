import React from 'react';

import Trigger from './Trigger.jsx';
import Action from './Action.jsx';
import SaveNewConcoction from './SaveNewConcoction.jsx';
import CancelNewConcoction from './CancelNewConcoction.jsx';

const AddConcoctionNav = (props) => {
  if (props.state.trigger === '' || props.state.triggerOption === '' || props.state.triggerParams === '') {
    return (
      <div>
        <Trigger state={props.state} 
                     servicesDetail={props.servicesDetail}  
                     modifyTrigger={props.modifyTrigger}
                     modifyTriggerOption={props.modifyTriggerOption}
                     modifyTriggerParams={props.modifyTriggerParams}
                     modifyTriggerReveal={props.modifyTriggerReveal} />

            <CancelNewConcoction changeViewTo={props.changeViewTo} />
            
            <SaveNewConcoction state={props.state} />
          </div>
    )
  } else if (!props.state.actions.reduce(function(prev, curr) {
      var complete = true;
      if (curr.action === '' || curr.actionOption === '' || curr.actionParams === '') {
        complete = false;
      };
      return prev && complete;
    }, true)) {
    return (
      <div>
        <Trigger state={props.state} 
                     servicesDetail={props.servicesDetail}  
                     modifyTrigger={props.modifyTrigger}
                     modifyTriggerOption={props.modifyTriggerOption}
                     modifyTriggerParams={props.modifyTriggerParams}
                     modifyTriggerReveal={props.modifyTriggerReveal} />

            {props.state.actions.map(function(action, index) {
              return(
                <Action actionsIndex={index}
                    state={props.state.actions[index]}
                    servicesDetail={props.servicesDetail}
                    modifyAction={props.modifyAction}
                    modifyActionOption={props.modifyActionOption}
                    modifyActionParams={props.modifyActionParams}
                    modifyActionReveal={props.modifyActionReveal} />
              );
            })}

            <CancelNewConcoction changeViewTo={props.changeViewTo} />

            <SaveNewConcoction state={props.state} />
          </div>
    ) 
  } else {
    return (
      <div>
        <Trigger state={props.state} 
                     servicesDetail={props.servicesDetail}  
                     modifyTrigger={props.modifyTrigger}
                     modifyTriggerOption={props.modifyTriggerOption}
                     modifyTriggerParams={props.modifyTriggerParams}
                     modifyTriggerReveal={props.modifyTriggerReveal} />
            
            {props.state.actions.map(function(action, index) {
                          return(
                            <Action actionsIndex={index}
                                state={props.state.actions[index]}
                                servicesDetail={props.servicesDetail}
                                modifyAction={props.modifyAction}
                                modifyActionOption={props.modifyActionOption}
                                modifyActionParams={props.modifyActionParams}
                                modifyActionReveal={props.modifyActionReveal} />
              );
            })}

            <div onClick={ () => {props.addNewAction()}}>
            ADD A NEW ACTION
            </div>
            <CancelNewConcoction changeViewTo={props.changeViewTo} />

            <SaveNewConcoction state={props.state} />
          </div>

    );
  }

};

export default AddConcoctionNav;