import React from 'react';
//require('../../dist/main.css');

const AddAction = (props) => {
  return (
    <div>
    </div>
  )
  
  // if (props.state.trigger === '') {
  //   //display slack and evernote triggers
  //   return(
  //     <div>
  //       <div onClick={ () => {props.modifyTriggerReveal()}}>
  //       Trigger:
  //       </div>
  //       <div className={props.state.triggerServicesReveal}>
  //         {Object.keys(props.servicesDetail.servicesDetailJSON).map(function(service) {
  //           return (
  //             <div onClick={ () => {props.modifyTrigger(service)}}>
  //             {service}
  //             </div>
  //           );
  //         })}
  //       </div>
  //     </div>
  //   );
  // } else if (props.state.trigger !== '' && props.state.triggerOption === '') {
  //   //display trigger in state and show options for trigger in state
  //   return(
  //     <div>
  //       <div onClick={ () => {props.modifyTriggerReveal()}}>
  //       Trigger:  {props.servicesDetail.servicesDetailJSON[props.state.trigger].icon} {props.state.trigger}
  //       <span onClick={ () => {props.modifyTrigger('')}}>X</span>
  //       </div>
  //       <div className={props.state.triggerServicesReveal}>
  //         {props.servicesDetail.servicesDetailJSON[props.state.trigger].trigger.options.map(function(option, index){
  //           return (
  //             <div onClick={ () => {props.modifyTriggerOption(index)}}>
  //             {option.description}
  //             </div>
  //           );
  //         })}
  //       </div>
  //     </div>
  //   );
  // } else if (props.state.trigger !== '' && props.state.triggerOption !== '' && props.servicesDetail.servicesDetailJSON[props.state.trigger].trigger.options[props.state.triggerOption].parameters.length === 0) {
  //   //display trigger and option in state 
  //   return(
  //     <div>
  //       <div onClick={ () => {props.modifyTriggerReveal()}}>
  //       Trigger: {props.servicesDetail.servicesDetailJSON[props.state.trigger].icon} {props.state.trigger}
  //       </div>
  //       <div className={props.state.triggerServicesReveal}>
  //         <div>
  //         {props.servicesDetail.servicesDetailJSON[props.state.trigger].trigger.options[props.state.triggerOption].description}
  //         <span onClick={ () => {props.modifyTriggerOption('')}}>X</span>
  //         </div>
  //         <div>
  //         Save Trigger
  //         </div>
  //       </div>
  //     </div>
  //   );
  // } else if (props.state.trigger !== '' && props.state.triggerOption !== '' && props.servicesDetail.servicesDetailJSON[props.state.trigger].trigger.options[props.state.triggerOption].parameters.length > 0) {
  //   //display trigger and option in state 
  //   return(
  //    <div>
  //       <div onClick={ () => {props.modifyTriggerReveal()}}>
  //       Trigger: {props.servicesDetail.servicesDetailJSON[props.state.trigger].icon} {props.state.trigger}
  //       </div>
  //       <div className={props.state.triggerServicesReveal}>
  //         <div>
  //         {props.servicesDetail.servicesDetailJSON[props.state.trigger].trigger.options[props.state.triggerOption].description}
  //         <span onClick={ () => {props.modifyTriggerOption('')}}>X</span>
  //         </div>
  //         {props.servicesDetail.servicesDetailJSON[props.state.trigger].trigger.options[props.state.triggerOption].parameters.map(function(param) {
  //           return(
  //             <div>
  //             {param.description}: <input id='param' type='text' className={param.alias}></input>
  //             </div>
  //           )
  //         })}
  //         <div onClick={ () => {props.modifyTriggerParams(document.getElementById('param').value, document.getElementById('param').className)}}>
  //         Save Trigger
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

};


export default AddAction;

// render params and save to state ----
// change structure of trigger button to something prettier ----
// render add action  component
// render trigger and add action components depending on completemess of state
// style services based on services verified boolean
// build and send the concoction bundle to the server
// figure out service authenticating without entire app rerender
