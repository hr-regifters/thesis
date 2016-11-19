import React from 'react';
import currUrl from './../../../currUrl';
//require('../../dist/main.css');

const Action = (props) => {
  
  if (props.state.action === '') {
  //   //display slack and evernote triggers
    return(
      <div>
        <div onClick={ () => {props.modifyActionReveal(props.actionsIndex)}}>
        Action:
        </div>
        <div className={props.state.actionServicesReveal}>
          {Object.keys(props.servicesDetail.servicesDetailJSON).map(function(service) {
            return (
              <div key={service} onClick={ () => {props.modifyAction(service, props.actionsIndex)}}>
                {
                  props.connectedServices[service] ?
                  <a>{service}</a>
                  :
                  <a href={`${currUrl}/api/oauth/${service}`}>{service}</a>
                }
              </div>
            );
          })}
        </div>
      </div>
    );
  } else if (props.state.action !== '' && props.state.actionOption === '') {
    //display trigger in state and show options for trigger in state
    return(
      <div>
        <div onClick={ () => {props.modifyActionReveal(props.actionsIndex)}}>
        Action:  {props.servicesDetail.servicesDetailJSON[props.state.action].icon} {props.state.action}
        <span onClick={ () => {props.modifyAction('', props.actionsIndex)}}>X</span>
        </div>
        <div className={props.state.actionServicesReveal}>
          {props.servicesDetail.servicesDetailJSON[props.state.action].action.options.map(function(option, index){
            return (
              <div key={index} onClick={ () => {props.modifyActionOption(index, props.actionsIndex)}}>
              {option.description}
              </div>
            );
          })}
        </div>
      </div>
    );
  } else if (props.state.action !== '' && props.state.actionOption !== '' && props.servicesDetail.servicesDetailJSON[props.state.action].action.options[props.state.actionOption].parameters.length === 0) {
    //display trigger and option in state 
    return(
      <div>
        <div onClick={ () => {props.modifyActionReveal(props.actionsIndex)}}>
        Action: {props.servicesDetail.servicesDetailJSON[props.state.action].icon} {props.state.action}
        </div>
        <div className={props.state.actionServicesReveal}>
          <div>
          {props.servicesDetail.servicesDetailJSON[props.state.action].action.options[props.state.actionOption].description}
          <span onClick={ () => {props.modifyTriggerOption('', props.actionsIndex)}}>X</span>
          </div>
          <div>
          Save Action
          </div>
        </div>
      </div>
    );
  } else if (props.state.action !== '' && props.state.actionOption !== '' && props.servicesDetail.servicesDetailJSON[props.state.action].action.options[props.state.actionOption].parameters.length > 0) {
    //display trigger and option in state 
    return(
     <div>
        <div onClick={ () => {props.modifyActionReveal(props.actionsIndex)}}>
        Action: {props.servicesDetail.servicesDetailJSON[props.state.action].icon} {props.state.action}
        </div>
        <div className={props.state.actionServicesReveal}>
          <div>
          {props.servicesDetail.servicesDetailJSON[props.state.action].action.options[props.state.actionOption].description}
          <span onClick={ () => {props.modifyActionOption('', props.actionsIndex)}}>X</span>
          </div>
          {props.servicesDetail.servicesDetailJSON[props.state.action].action.options[props.state.actionOption].parameters.map(function(param) {
            return(
              <div key={param.alias}>
              {param.description}: <input id='param' type='text' className={param.alias}></input>
              </div>
            )
          })}
          <div onClick={ () => {props.modifyActionParams(document.getElementById('param').value, document.getElementById('param').className, props.actionsIndex)}}>
          Save Action
          </div>
        </div>
      </div>
    );
  }

};


export default Action;

// render params and save to state ----
// change structure of trigger button to something prettier ----
//make action component ----
// make add action  component ----
// render trigger, action, add action, and save components depending on completeness of state ----
// style services based on services verified boolean
// build and send the concoction bundle to the server
// figure out service authenticating without entire app rerender
