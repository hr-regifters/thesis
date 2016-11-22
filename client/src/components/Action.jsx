import React from 'react';
import currUrl from './../../../currUrl';
//require('../../dist/main.css');

const Action = (props) => {
  
  if (props.state.action === '') {
  //   //display slack and evernote triggers
    return(
      <div>
        <div id="myModal" className="modal" style={{display: props.modalReveal}}>
          <div className="modal-content">
            <span onClick={() => {props.hideModal()}} className="close">×</span>
            <iframe src={`${currUrl}/api/oauth/${props.serviceToConnect}`} width="600px" height="600px"></iframe>
          </div>
        </div>
        <div className='workWindow2'>
          <div onClick={ () => {props.modifyActionReveal(props.actionsIndex)}}>
          <h1>Action   <i className="fa fa-caret-down"></i></h1>
          </div>
          <div className={props.state.actionServicesReveal}>
            {Object.keys(props.servicesDetail.servicesDetailJSON).map(function(service) {
              return (
                <h3 className='serviceBttn' key={service}>
                  {
                    props.connectedServices[service] ?
                    <a onClick={ () => {props.modifyAction(service, props.actionsIndex)}}>{service}</a>
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
  } else if (props.state.action !== '' && props.state.actionOption === '') {
    //display trigger in state and show options for trigger in state
    return(
      <div className='workWindow2'>
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
      <div className='workWindow2'>
        <div onClick={ () => {props.modifyActionReveal(props.actionsIndex)}}>
          <h1><img className='icon' src={props.servicesDetail.servicesDetailJSON[props.state.action].icon}></img> Action <i className="fa fa-caret-down"></i></h1>
        </div>
        <div className={props.state.actionServicesReveal}>
          <div>
          <h2><i onClick={ () => {props.modifyActionOption('', props.actionsIndex)}} className="fa fa-window-close"></i> {props.servicesDetail.servicesDetailJSON[props.state.action].action.options[props.state.actionOption].description}</h2>
          </div>
          <div>
          <h2 onClick={ () => {props.modifyActionParams('none', 'none', props.actionsIndex)}} className='saveBttn'>Save Action</h2>
          </div>
        </div>
      </div>
    );
  } else if (props.state.action !== '' && props.state.actionOption !== '' && props.servicesDetail.servicesDetailJSON[props.state.action].action.options[props.state.actionOption].parameters.length > 0) {
    //display trigger and option in state 
    return(
     <div className='workWindow2'>
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
              <h2>{param.description}: <input id='param' type='text' className={param.alias}></input></h2>
              </div>
            )
          })}
          <div>
            <h2 onClick={ () => {props.modifyActionParams(document.getElementById('param').value, document.getElementById('param').className, props.actionsIndex)}} className='saveBttn'>Save Action</h2>
          </div>
        </div>
      </div>
    );
  }

};


export default Action;

