import React from 'react';
import currUrl from './../../../currUrl';
import servicesDetail from '../servicesDetailJSON.js';
//require('../../dist/main.css');

const Action = (props) => {
  
  if (props.state.action === '') {
  //   //display slack and evernote triggers
    return(
      <div className='workWindow2'>
        <div onClick={ () => {props.funcs.modifyActionReveal(props.actionsIndex)}}>
          <h1>Action   <i className="fa fa-caret-down"></i></h1>
        </div>
        <div className={props.state.actionServicesReveal}>
          {Object.keys(servicesDetail.servicesDetailJSON).map(function(service) {
            return (
              <h3 className='serviceBttn' key={service}>
                {
                  props.connectedServices[service] ?
                  <a onClick={ () => {props.funcs.modifyAction(service, props.actionsIndex)}}>{service}</a>
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
      <div className='workWindow2'>
        <div onClick={ () => {props.funcs.modifyActionReveal(props.actionsIndex)}}>
          <h1><i className="fa fa-reply" onClick={ () => {props.funcs.modifyAction('', props.actionsIndex)}}></i>  <img className='icon' src={servicesDetail.servicesDetailJSON[props.state.action].icon}></img> Action <i className="fa fa-caret-down"></i></h1>
        </div>
        <div className={props.state.actionServicesReveal}>
          {servicesDetail.servicesDetailJSON[props.state.action].action.options.map(function(option, index){
            return (
              <div key={index} onClick={ () => {props.funcs.modifyActionOption(index, props.actionsIndex)}}>
                <h2><i className="fa fa-square-o"></i> {option.description}</h2>
              </div>
            );
          })}
        </div>
      </div>
    );
  } else if (props.state.action !== '' && props.state.actionOption !== '' && servicesDetail.servicesDetailJSON[props.state.action].action.options[props.state.actionOption].parameters.length === 0) {
    //display trigger and option in state 
    return(
      <div className='workWindow2'>
        <div onClick={ () => {props.funcs.modifyActionReveal(props.actionsIndex)}}>
          <h1><img className='icon' src={servicesDetail.servicesDetailJSON[props.state.action].icon}></img> Action <i className="fa fa-caret-down"></i></h1>
        </div>
        <div className={props.state.actionServicesReveal}>
          <div>
            <h2><i onClick={ () => {props.funcs.modifyActionOption('', props.actionsIndex)}} className="fa fa-window-close"></i> {servicesDetail.servicesDetailJSON[props.state.action].action.options[props.state.actionOption].description}</h2>
          </div>
          <div>
            <h2 onClick={ () => {props.funcs.modifyActionParams('none', 'none', props.actionsIndex)}} className='saveBttn'>Save Action</h2>
          </div>
        </div>
      </div>
    );
  } else if (props.state.action !== '' && props.state.actionOption !== '' && servicesDetail.servicesDetailJSON[props.state.action].action.options[props.state.actionOption].parameters.length > 0) {
    //display trigger and option in state 
    return(
     <div className='workWindow2'>
        <div onClick={ () => {props.funcs.modifyActionReveal(props.actionsIndex)}}>
          <h1><img className='icon' src={servicesDetail.servicesDetailJSON[props.state.action].icon}></img> Action <i className="fa fa-caret-down"></i></h1>
        </div>
        <div className={props.state.actionServicesReveal}>
          <div>
            <h2><i onClick={ () => {props.funcs.modifyActionOption('', props.actionsIndex)}} className="fa fa-window-close"></i> {servicesDetail.servicesDetailJSON[props.state.action].action.options[props.state.actionOption].description}</h2>
          </div>
          {servicesDetail.servicesDetailJSON[props.state.action].action.options[props.state.actionOption].parameters.map(function(param) {
            return(
              <div key={param.alias}>
                <h2>{param.description}: <input id='param' type='text' className={param.alias}></input></h2>
              </div>
            )
          })}
          <div>
            <h2 onClick={ () => {props.funcs.modifyActionParams(document.getElementById('param').value, document.getElementById('param').className, props.actionsIndex)}} className='saveBttn'>Save Action</h2>
          </div>
        </div>
      </div>
    );
  }
};

export default Action;
