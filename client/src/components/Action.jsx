import React from 'react';
import currUrl from './../../../currUrl';
//require('../../dist/main.css');

const Action = (props) => {
  
  if (props.state.action === '') {
  //   //display slack and evernote triggers
    return(
      <div>
        <div onClick={ () => {props.modifyActionReveal(props.actionsIndex)}}>
        <h1>Action   <i className="fa fa-caret-down"></i></h1>
        </div>
        <div className={props.state.actionServicesReveal}>
          {Object.keys(props.servicesDetail.servicesDetailJSON).map(function(service) {
            return (
              <h3 className='serviceBttn' key={service} onClick={ () => {props.modifyAction(service, props.actionsIndex)}}>
                {
                  props.connectedServices[service] ?
                  <a>{service}</a>
                  :
                  <a href={`${currUrl}/api/oauth/${service}`}>{service}</a>
                }
              </h3>
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
          <h1><i className="fa fa-reply" onClick={ () => {props.modifyAction('', props.actionsIndex)}}></i>  <img className='icon' src={props.servicesDetail.servicesDetailJSON[props.state.action].icon}></img> Action <i className="fa fa-caret-down"></i></h1>
        </div>
        <div className={props.state.actionServicesReveal}>
          {props.servicesDetail.servicesDetailJSON[props.state.action].action.options.map(function(option, index){
            return (
              <div key={index} onClick={ () => {props.modifyActionOption(index, props.actionsIndex)}}>
                <h2><i className="fa fa-square-o"></i> {option.description}</h2>
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
          <h1><img className='icon' src={props.servicesDetail.servicesDetailJSON[props.state.action].icon}></img> Action <i className="fa fa-caret-down"></i></h1>
        </div>
        <div className={props.state.actionServicesReveal}>
          <div>
          <h2><i onClick={ () => {props.modifyActionOption('', props.actionsIndex)}} className="fa fa-window-close"></i> {props.servicesDetail.servicesDetailJSON[props.state.action].action.options[props.state.actionOption].description}</h2>
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
        <h1><img className='icon' src={props.servicesDetail.servicesDetailJSON[props.state.action].icon}></img> Action <i className="fa fa-caret-down"></i></h1>
        </div>
        <div className={props.state.actionServicesReveal}>
          <div>
          <h2><i onClick={ () => {props.modifyActionOption('', props.actionsIndex)}} className="fa fa-window-close"></i> {props.servicesDetail.servicesDetailJSON[props.state.action].action.options[props.state.actionOption].description}</h2>
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
