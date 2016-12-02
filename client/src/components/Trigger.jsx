import React from 'react';
import currUrl from './../../../currUrl';
import servicesDetail from '../servicesDetailJSON.js';

const Trigger = (props) => {
  // if the trigger property has not been selected, render the services to select
  if (props.state.trigger === '') {
    return (
      <div className='workWindow1'>
        <div onClick={ () => {props.funcs.modifyTriggerReveal();
                              props.funcs.modifyInstructions(0)}}>
        <div className='inline'>
        <h1>Trigger   <i className='fa fa-caret-down'></i></h1>
        </div>
        </div>
        <div className={props.state.triggerServicesReveal}>
          {Object.keys(servicesDetail).map((service) => {
            if (servicesDetail[service].trigger.options[0] !== 'none') {
              return (
                <h3 key={service} className='serviceBttn' >
                  {
                    props.state.connectedServices[service] ?
                      <a onClick={ () => {props.funcs.modifyTrigger(service);
                      props.funcs.modifyInstructions(1)}}>{servicesDetail[service].name}</a>
                    :
                    service.slice(0, 6) === 'google' ?
                      <a href={`${currUrl}/api/oauth/google`}>{servicesDetail[service].name}</a>
                      :
                      <a href={`${currUrl}/api/oauth/${service}`}>{servicesDetail[service].name}</a>
                  }
                </h3>
              );
            }
          })}
        </div>
      </div>
    );
    // if the triggers's option has not been selected, render the trigger options
  } else if (props.state.trigger !== '' && props.state.triggerOption === '') {
    return (
      <div className='workWindow1'>
        <div onClick={ () => {props.funcs.modifyTriggerReveal()}}>
          <div className='inline'>
            <h1> <img className='icon' src={servicesDetail[props.state.trigger].icon}></img> Trigger <i className='fa fa-caret-down'></i></h1>   
          </div>
        </div>
        <div className={props.state.triggerServicesReveal}>
          {servicesDetail[props.state.trigger].trigger.options.map((option, index) => {
            return (
              <div key={index} onClick={ () => {props.funcs.modifyTriggerOption(index);
                props.funcs.modifyInstructions(2)}}>
                <h2><i className='fa fa-square-o'></i> {option.description}</h2>
              </div>
            );
          })}
        </div>
      </div>
    );
    // if the there are no paramerters to select, render the save button
  } else if (props.state.trigger !== '' && props.state.triggerOption !== '' && servicesDetail[props.state.trigger].trigger.options[props.state.triggerOption].parameters.length === 0) {
    return (
      <div className='workWindow1'>
        <div onClick={ () => {props.funcs.modifyTriggerReveal()}}>
          <h1><img className='icon' src={servicesDetail[props.state.trigger].icon}></img>  Trigger   <i className='fa fa-caret-down'></i></h1> 
        </div>
        <div className={props.state.triggerServicesReveal}>
          <div>
            <h2><i className='fa fa-window-close'></i> {servicesDetail[props.state.trigger].trigger.options[props.state.triggerOption].description}</h2>
          </div>
          <div>
            <h2 onClick={ () => {props.funcs.modifyTriggerParams('none', 'none');
                                 props.funcs.modifyInstructions(3)}} className='saveBttn'>Next Step</h2>
          </div>
        </div>
      </div>
    );
    // if the there are paramerters to select, render the along with the save button
  } else if (props.state.trigger !== '' && props.state.triggerOption !== '' && servicesDetail[props.state.trigger].trigger.options[props.state.triggerOption].parameters.length > 0) {
    return (
     <div className='workWindow1'>
        <div onClick={ () => {props.funcs.modifyTriggerReveal()}}>
          <h1><img className='icon' src={servicesDetail[props.state.trigger].icon}></img>   Trigger   <i className='fa fa-caret-down'></i></h1> 
        </div>
        <div className={props.state.triggerServicesReveal}>
          <div>
            <h2><i className='fa fa-window-close'></i> {servicesDetail[props.state.trigger].trigger.options[props.state.triggerOption].description}</h2>
          </div>
            {servicesDetail[props.state.trigger].trigger.options[props.state.triggerOption].parameters.map((param) => {
              return (
                <div key={param.alias}>
                  <h2 className='paramTxt'>{param.description}: <input id={param.alias} type='text' className='param'></input></h2>
                </div>
              );
            })}
          <div>
            <h2 onClick={ () => {props.funcs.modifyTriggerParams(document.getElementsByClassName('param'));
                                 props.funcs.modifyInstructions(3)}} className='saveBttn'>Next Step</h2>
          </div>
        </div>
      </div>
    );
  }
};

export default Trigger;
