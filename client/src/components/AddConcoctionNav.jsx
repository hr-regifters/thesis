import React from 'react';

import Trigger from './Trigger.jsx';
import Action from './Action.jsx';
import SaveNewConcoction from './SaveNewConcoction.jsx';
import CancelNewConcoction from './CancelNewConcoction.jsx';

const AddConcoctionNav = (props) => {
  if (props.state.trigger === '' || props.state.triggerOption === '' || props.state.triggerParams === '') {
    return (
      <div id="addConcBox">
       {// <div>
        //Description: <input id='desc' type='text'></input>
        //</div>
      }
        <Trigger state={props.state} 
                     servicesDetail={props.servicesDetail}
                     connectedServices={props.connectedServices}
                     modifyTrigger={props.modifyTrigger}
                     modifyTriggerOption={props.modifyTriggerOption}
                     modifyTriggerParams={props.modifyTriggerParams}
                     modifyTriggerReveal={props.modifyTriggerReveal}
                     connectService={props.connectService}
                     hideModal={props.hideModal} />

            <CancelNewConcoction changeViewTo={props.changeViewTo} />
            
            <SaveNewConcoction state={props.state} saveConcoction={props.saveConcoction} />
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
        {
          // <div>
        // Description: <input id='desc' type='text'></input>
        // </div>
      }
        <Trigger state={props.state} 
                     servicesDetail={props.servicesDetail}
                     connectedServices={props.connectedServices}
                     modifyTrigger={props.modifyTrigger}
                     modifyTriggerOption={props.modifyTriggerOption}
                     modifyTriggerParams={props.modifyTriggerParams}
                     modifyTriggerReveal={props.modifyTriggerReveal}
                     connectService={props.connectService}
                     hideModal={props.hideModal} />

            <div>
            </div>

            {props.state.actions.map(function(action, index) {
              return(
                <Action key={index} actionsIndex={index}
                    state={props.state.actions[index]}
                    servicesDetail={props.servicesDetail}
                    connectedServices={props.connectedServices}
                    modifyAction={props.modifyAction}
                    modifyActionOption={props.modifyActionOption}
                    modifyActionParams={props.modifyActionParams}
                    modifyActionReveal={props.modifyActionReveal}
                    modalReveal={props.state.modalReveal}
                    connectService={props.connectService}
                    serviceToConnect={props.state.serviceToConnect}
                    hideModal={props.hideModal} />
              );
            })}

            <CancelNewConcoction changeViewTo={props.changeViewTo} />

            <SaveNewConcoction state={props.state} saveConcoction={props.saveConcoction} />
          </div>
    ) 
  } else {
    return (
      <div >
        {//<div>
        //Description: <input id='desc' type='text'></input>
        //</div>
        }
        <Trigger state={props.state} 
                     servicesDetail={props.servicesDetail}
                     connectedServices={props.connectedServices}
                     modifyTrigger={props.modifyTrigger}
                     modifyTriggerOption={props.modifyTriggerOption}
                     modifyTriggerParams={props.modifyTriggerParams}
                     modifyTriggerReveal={props.modifyTriggerReveal}
                     connectService={props.connectService}
                     serviceToConnect={props.state.serviceToConnect}
                     hideModal={props.hideModal} />
            
            {props.state.actions.map(function(action, index) {
                          return(
                            <Action key={index} actionsIndex={index}
                                state={props.state.actions[index]}
                                servicesDetail={props.servicesDetail}
                                connectedServices={props.connectedServices}
                                modifyAction={props.modifyAction}
                                modifyActionOption={props.modifyActionOption}
                                modifyActionParams={props.modifyActionParams}
                                modifyActionReveal={props.modifyActionReveal}
                                modalReveal={props.state.modalReveal}
                                connectService={props.connectService}
                                hideModal={props.hideModal} />
              );
            })}

            <div onClick={ () => {props.addNewAction()}}>
            Add New Action
            </div>
            <CancelNewConcoction changeViewTo={props.changeViewTo} />

            <SaveNewConcoction state={props.state} saveConcoction={props.saveConcoction} />
          </div>

    );
  }

};

export default AddConcoctionNav;