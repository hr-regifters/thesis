import React from 'react';
import currUrl from './../../../currUrl';
import servicesDetail from '../servicesDetailJSON.js';

const Action = (props) => {
  if (props.state.action === '') {
    return (
      <div className='workWindow2'>
        <div onClick={ () => {props.funcs.modifyActionReveal(props.actionsIndex);
                              props.funcs.modifyInstructions(4)}}>
          <h1>Action   <i className="fa fa-caret-down"></i></h1>
        </div>
        <div className={props.state.actionServicesReveal}>
          {Object.keys(servicesDetail).map((service) => {
            if (servicesDetail[service].action.options[0] !== 'none' && servicesDetail[props.trigger].trigger.supportedActions.includes(service)) {
              return (
                <h3 className='serviceBttn' key={service}>
                  {
                    props.connectedServices[service] || service === 'twilio' || (service.slice(0, 6) === 'google' && props.connectedServices.hasOwnProperty('google')) ?
                    <a onClick={ () => {props.funcs.modifyAction(service, props.actionsIndex);
                                         props.funcs.modifyInstructions(5)}}>{servicesDetail[service].name}</a>
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
  } else if (props.state.action !== '' && props.state.actionOption === '') {
    return (
      <div className='workWindow2'>
        <div onClick={ () => {props.funcs.modifyActionReveal(props.actionsIndex)}}>
          <h1><img className='icon' src={servicesDetail[props.state.action].icon}></img> Action <i className="fa fa-caret-down"></i></h1>
        </div>
        <div className={props.state.actionServicesReveal}>
          {servicesDetail[props.state.action].action.options.map((option, index) => {
            return (
              <div key={index} onClick={ () => {props.funcs.modifyActionOption(index, props.actionsIndex);
                                                props.funcs.modifyInstructions(6)}}>
                <h2><i className="fa fa-square-o"></i> {option.description}</h2>
              </div>
            );
          })}
        </div>
      </div>
    );
  } else if (props.state.action !== '' && props.state.actionOption !== '' && servicesDetail[props.state.action].action.options[props.state.actionOption].parameters.length === 0) {
    return (
      <div className='workWindow2'>
        <div onClick={ () => {props.funcs.modifyActionReveal(props.actionsIndex)}}>
          <h1><img className='icon' src={servicesDetail[props.state.action].icon}></img> Action <i className="fa fa-caret-down"></i></h1>
        </div>
        <div className={props.state.actionServicesReveal}>
          <div>
            <h2><i className="fa fa-window-close"></i> {servicesDetail[props.state.action].action.options[props.state.actionOption].description}</h2>
          </div>
          <div>
            <h2 onClick={ () => {props.funcs.modifyActionParams('none', 'none', props.actionsIndex);
                                 props.funcs.modifyInstructions(7)}} className='saveBttn'>Save Action</h2>
          </div>
        </div>
      </div>
    );
  } else if (props.state.action !== '' && props.state.actionOption !== '' && servicesDetail[props.state.action].action.options[props.state.actionOption].parameters.length > 0) {
    return (
     <div className='workWindow2'>
        <div onClick={ () => {props.funcs.modifyActionReveal(props.actionsIndex)}}>
          <h1><img className='icon' src={servicesDetail[props.state.action].icon}></img> Action <i className="fa fa-caret-down"></i></h1>
        </div>
        <div className={props.state.actionServicesReveal}>
          <div>
            <h2><i className="fa fa-window-close"></i> {servicesDetail[props.state.action].action.options[props.state.actionOption].description}</h2>
          </div>
          {servicesDetail[props.state.action].action.options[props.state.actionOption].parameters.map((param) => {
            return (
              <div key={param.alias}>
                <h2 className='paramTxt'>{param.description}: <input id={param.alias} type='text' className='param'></input></h2>
              </div>
            )
          })}
          <div>
            <h2 onClick={ () => {props.funcs.modifyActionParams(document.getElementsByClassName('param'), props.actionsIndex);
                                 props.funcs.modifyInstructions(7)}} className='saveBttn'>Save Action</h2>
          </div>
        </div>
      </div>
    );
  }
};

export default Action;
