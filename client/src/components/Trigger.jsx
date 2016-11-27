import React from 'react';
import currUrl from './../../../currUrl';
import servicesDetail from '../servicesDetailJSON.js';

const Trigger = (props) => {
  if (props.state.trigger === '') {
    return (
      <div className='workWindow1'>
        <div onClick={ () => {props.funcs.modifyTriggerReveal()}}>
        <div className="inline">
        <h1>Trigger   <i className="fa fa-caret-down"></i></h1>
        </div>
        </div>
        <div className={props.state.triggerServicesReveal}>
          {Object.keys(servicesDetail).map((service) => {
            if (servicesDetail[service].trigger.options[0] !== 'none') {
              return (
                <h3 key={service} className='serviceBttn' >
                  {
                    props.state.connectedServices[service] ?
                      <a onClick={ () => {props.funcs.modifyTrigger(service)}}>{servicesDetail[service].name}</a>
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
  } else if (props.state.trigger !== '' && props.state.triggerOption === '') {
    return (
      <div className='workWindow1'>
        <div onClick={ () => {props.funcs.modifyTriggerReveal()}}>
          <div className="inline">
            <h1><i className="fa fa-reply" onClick={ () => {props.funcs.modifyTrigger('')}}></i>  <img className='icon' src={servicesDetail[props.state.trigger].icon}></img> Trigger <i className="fa fa-caret-down"></i></h1>   
          </div>
        </div>
        <div className={props.state.triggerServicesReveal}>
          {servicesDetail[props.state.trigger].trigger.options.map((option, index) => {
            return (
              <div key={index} onClick={ () => {props.funcs.modifyTriggerOption(index)}}>
                <h2><i className="fa fa-square-o"></i> {option.description}</h2>
              </div>
            );
          })}
        </div>
      </div>
    );
  } else if (props.state.trigger !== '' && props.state.triggerOption !== '' && servicesDetail[props.state.trigger].trigger.options[props.state.triggerOption].parameters.length === 0) {
    return (
      <div className='workWindow1'>
        <div onClick={ () => {props.funcs.modifyTriggerReveal()}}>
          <h1><img className='icon' src={servicesDetail[props.state.trigger].icon}></img>  Trigger   <i className="fa fa-caret-down"></i></h1> 
        </div>
        <div className={props.state.triggerServicesReveal}>
          <div>
            <h2><i onClick={ () => {props.funcs.modifyTriggerOption('')}} className="fa fa-window-close"></i> {servicesDetail[props.state.trigger].trigger.options[props.state.triggerOption].description}</h2>
          </div>
          <div>
            <h2 onClick={ () => {props.funcs.modifyTriggerParams('none', 'none')}} className='saveBttn'>Save Trigger</h2>
          </div>
        </div>
      </div>
    );
  } else if (props.state.trigger !== '' && props.state.triggerOption !== '' && servicesDetail[props.state.trigger].trigger.options[props.state.triggerOption].parameters.length > 0) {
    return(
     <div className='workWindow1'>
        <div onClick={ () => {props.funcs.modifyTriggerReveal()}}>
          <h1><img className='icon' src={servicesDetail[props.state.trigger].icon}></img>   Trigger   <i className="fa fa-caret-down"></i></h1> 
        </div>
        <div className={props.state.triggerServicesReveal}>
          <div>
            <h2><i onClick={ () => {props.funcs.modifyTriggerOption('')}} className="fa fa-window-close"></i> {servicesDetail[props.state.trigger].trigger.options[props.state.triggerOption].description}</h2>
          </div>
            {servicesDetail[props.state.trigger].trigger.options[props.state.triggerOption].parameters.map((param) => {
              return (
                <div key={param.alias}>
                  <h2>{param.description}: <input id='param' type='text' className={param.alias}></input></h2>
                </div>
              )
            })}
          <div>
            <h2 onClick={ () => {props.funcs.modifyTriggerParams(document.getElementById('param').value, document.getElementById('param').className)}} className='saveBttn'>Save Trigger</h2>
          </div>
        </div>
      </div>
    );
  }
}

export default Trigger;
