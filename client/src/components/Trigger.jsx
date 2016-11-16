// import React from 'react';

// const Trigger = (props) => {
  
//   if (props.state.trigger === '') {
//     //display slack and evernote triggers
//     return(
//       <div onClick={ () => {props.modifyTrigger('slack')}}>
//       slack
//       </div>
//       <div onClick={ () => {props.modifyTrigger('evernote')}}>
//       evernote
//       </div>
//     );
//   } else if (props.state.triggerOptions === '') {
//     //display trigger in state and show options for trigger in state
//     return(
//       <div>
//       {{props.state.trigger}}
//       </div>
//       <div>
//       {{props.servicesDetail[props.state.trigger].options[0]}}
//       </div>
//     );
//   } else if (props.state.triggerParams === '') {
//     //display trigger and option in state 
//     return(
//       <div>
//       {{props.state.trigger}}
//       </div>
//       <div>
//       {{props.servicesDetail[props.state.trigger].options[0]}}
//       </div>
//       <div>
//       no parameters
//       </div>
//     );
//   }

//   // render() {
//   //   return (
//   //     <div>
//   //       <div>
//   //       Trigger:
//   //       </div>
//   //       if trigger is ''
//   //       display slack and evernote triggers
//   //       if triggerOption is ''
//   //       display options for trigger in state
//   //       if triggerParams  is ''
//   //       display params 

//   //     </div>
//   //   );
//   // }
// }

// export default Trigger;
