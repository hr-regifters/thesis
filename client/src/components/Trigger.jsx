import React from 'react';
import currUrl from './../../../currUrl';
//require('../../dist/main.css');

const Trigger = (props) => {
  
  if (props.state.trigger === '') {
    //display slack and evernote triggers
    return(
      <div>
        <div onClick={ () => {props.modifyTriggerReveal()}}>
        Trigger:
        </div>
        <div className={props.state.triggerServicesReveal}>
          {Object.keys(props.servicesDetail.servicesDetailJSON).map(function(service) {
            return (
              <div onClick={ () => {props.modifyTrigger(service)}}>
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
  } else if (props.state.trigger !== '' && props.state.triggerOption === '') {
    //display trigger in state and show options for trigger in state
    return(
      <div>
        <div onClick={ () => {props.modifyTriggerReveal()}}>
        Trigger:  {props.servicesDetail.servicesDetailJSON[props.state.trigger].icon} {props.state.trigger}
        <span onClick={ () => {props.modifyTrigger('')}}>X</span>
        </div>
        <div className={props.state.triggerServicesReveal}>
          {props.servicesDetail.servicesDetailJSON[props.state.trigger].trigger.options.map(function(option, index){
            return (
              <div onClick={ () => {props.modifyTriggerOption(index)}}>
              {option.description}
              </div>
            );
          })}
        </div>
      </div>
    );
  } else if (props.state.trigger !== '' && props.state.triggerOption !== '' && props.servicesDetail.servicesDetailJSON[props.state.trigger].trigger.options[props.state.triggerOption].parameters.length === 0) {
    //display trigger and option in state 
    return(
      <div>
        <div onClick={ () => {props.modifyTriggerReveal()}}>
        Trigger: {props.servicesDetail.servicesDetailJSON[props.state.trigger].icon} {props.state.trigger}
        </div>
        <div className={props.state.triggerServicesReveal}>
          <div>
          {props.servicesDetail.servicesDetailJSON[props.state.trigger].trigger.options[props.state.triggerOption].description}
          <span onClick={ () => {props.modifyTriggerOption('')}}>X</span>
          </div>
          <div onClick={ () => {props.modifyTriggerParams('none', 'none')}}>
          Save Trigger
          </div>
        </div>
      </div>
    );
  } else if (props.state.trigger !== '' && props.state.triggerOption !== '' && props.servicesDetail.servicesDetailJSON[props.state.trigger].trigger.options[props.state.triggerOption].parameters.length > 0) {
    //display trigger and option in state 
    return(
     <div>
        <div onClick={ () => {props.modifyTriggerReveal()}}>
        Trigger: {props.servicesDetail.servicesDetailJSON[props.state.trigger].icon} {props.state.trigger}
        </div>
        <div className={props.state.triggerServicesReveal}>
          <div>
          {props.servicesDetail.servicesDetailJSON[props.state.trigger].trigger.options[props.state.triggerOption].description}
          <span onClick={ () => {props.modifyTriggerOption('')}}>X</span>
          </div>
          {props.servicesDetail.servicesDetailJSON[props.state.trigger].trigger.options[props.state.triggerOption].parameters.map(function(param) {
            return(
              <div>
              {param.description}: <input id='param' type='text' className={param.alias}></input>
              </div>
            )
          })}
          <div onClick={ () => {props.modifyTriggerParams(document.getElementById('param').value, document.getElementById('param').className)}}>
          Save Trigger
          </div>
        </div>
      </div>
    );
  }

}

export default Trigger;

// props.servicesDetail.servicesDetailJSON[props.state.trigger].trigger.options[props.state.triggerOption].parameters.length === 0
