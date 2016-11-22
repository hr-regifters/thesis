import React from 'react';
import currUrl from './../../../currUrl';
import servicesDetail from '../servicesDetailJSON.js';
//require('../../dist/main.css');

const Trigger = (props) => {
  
  if (props.state.trigger === '') {
    //display slack and evernote triggers
    return(
      <div>
        <div id="myModal" className="modal" style={{display: props.state.modalReveal}}>
          <div className="modal-content">
            <span onClick={() => {props.hideModal()}} className="close">×</span>
            <iframe src={`${currUrl}/api/oauth/${props.state.serviceToConnect}`} width="600px" height="600px"></iframe>
          </div>
        </div>
        <div className='workWindow1'>
          <div onClick={ () => {props.modifyTriggerReveal()}}>
          <div className="inline">
          <h1>Trigger   <i className="fa fa-caret-down"></i></h1>
          </div>
          </div>
          <div className={props.state.triggerServicesReveal}>
            {Object.keys(servicesDetail.servicesDetailJSON).map(function(service) {
              console.log(props.connectedServices);
              return (
                <h3 className='serviceBttn' >
                  {
                    props.connectedServices[service] ?
                    <a onClick={ () => {props.modifyTrigger(service)}}>{service}</a>
                    :
                    <a onClick={() => {props.connectService(service)}}>{service}</a>
                  }
                </h3>
              );
            })}
          </div>
        </div>
      </div>
    );
  } else if (props.state.trigger !== '' && props.state.triggerOption === '') {
    //display trigger in state and show options for trigger in state
    return(
      <div className='workWindow1'>
        <div onClick={ () => {props.modifyTriggerReveal()}}>
        <div className="inline">
        <h1><i className="fa fa-reply" onClick={ () => {props.modifyTrigger('')}}></i>  <img className='icon' src={props.servicesDetail.servicesDetailJSON[props.state.trigger].icon}></img> Trigger <i className="fa fa-caret-down"></i></h1>   

        </div>
        
        </div>
        <div className={props.state.triggerServicesReveal}>
          {servicesDetail.servicesDetailJSON[props.state.trigger].trigger.options.map(function(option, index){
            return (
              <div key={index} onClick={ () => {props.modifyTriggerOption(index)}}>

                <h2><i className="fa fa-square-o"></i> {option.description}</h2>

              </div>
            );
          })}
        </div>
      </div>
    );
  } else if (props.state.trigger !== '' && props.state.triggerOption !== '' && servicesDetail.servicesDetailJSON[props.state.trigger].trigger.options[props.state.triggerOption].parameters.length === 0) {
    //display trigger and option in state 
    return(
      <div className='workWindow1'>
        <div onClick={ () => {props.modifyTriggerReveal()}}>
        <h1><img className='icon' src={servicesDetail.servicesDetailJSON[props.state.trigger].icon}></img>  Trigger   <i className="fa fa-caret-down"></i></h1> 

        </div>
        <div className={props.state.triggerServicesReveal}>
          <div>
          <h2><i onClick={ () => {props.modifyTriggerOption('')}} className="fa fa-window-close"></i> {servicesDetail.servicesDetailJSON[props.state.trigger].trigger.options[props.state.triggerOption].description}</h2>
          </div>
          <div>
          <h2 onClick={ () => {props.modifyTriggerParams('none', 'none')}} className='saveBttn'>Save Trigger</h2>
          </div>
        </div>
      </div>
    );
  } else if (props.state.trigger !== '' && props.state.triggerOption !== '' && servicesDetail.servicesDetailJSON[props.state.trigger].trigger.options[props.state.triggerOption].parameters.length > 0) {
    //display trigger and option in state 
    return(
     <div className='workWindow1'>
        <div onClick={ () => {props.modifyTriggerReveal()}}>
        <h1><img className='icon' src={servicesDetail.servicesDetailJSON[props.state.trigger].icon}></img>   Trigger   <i className="fa fa-caret-down"></i></h1> 
        </div>
        <div className={props.state.triggerServicesReveal}>
          <div>
          <h2><i onClick={ () => {props.modifyTriggerOption('')}} className="fa fa-window-close"></i> {servicesDetail.servicesDetailJSON[props.state.trigger].trigger.options[props.state.triggerOption].description}</h2>

          </div>
          {servicesDetail.servicesDetailJSON[props.state.trigger].trigger.options[props.state.triggerOption].parameters.map(function(param) {
            return(
              <div>
              <h2>{param.description}: <input id='param' type='text' className={param.alias}></input></h2>
              </div>
            )
          })}
          <div>
          <h2 onClick={ () => {props.modifyTriggerParams(document.getElementById('param').value, document.getElementById('param').className)}} className='saveBttn'>Save Trigger</h2>
          </div>
        </div>
      </div>
    );
  }

}

export default Trigger;

// servicesDetail.servicesDetailJSON[props.state.trigger].trigger.options[props.state.triggerOption].parameters.length === 0
