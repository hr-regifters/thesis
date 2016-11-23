import React from 'react';

import { Col, Row, Grid, Table, Navigation, Nav, NavItem } from 'react-bootstrap';
import Trigger from './Trigger.jsx';
import Action from './Action.jsx';
import SaveNewConcoction from './SaveNewConcoction.jsx';
import CancelNewConcoction from './CancelNewConcoction.jsx';

const AddConcoctionNav = (props) => {

  const triggerFuncs = {
    modifyTrigger: props.funcs.modifyTrigger,
    modifyTriggerOption: props.funcs.modifyTriggerOption,
    modifyTriggerParams: props.funcs.modifyTriggerParams,
    modifyTriggerReveal: props.funcs.modifyTriggerReveal,
  };

  const actionFuncs = {
    modifyAction: props.funcs.modifyAction,
    modifyActionOption: props.funcs.modifyActionOption,
    modifyActionParams: props.funcs.modifyActionParams,
    modifyActionReveal: props.funcs.modifyActionReveal,
  };

  if (props.appState.trigger === '' || props.appState.triggerOption === '' || props.appState.triggerParams === '') {
    return (
      <div className="full">
      <nav className="navbar navbar-default navbar-fixed-top"> 
        <div className="container-fluid Mod">
        <h3 className="pull-right"> My Apps </h3>
        <h3 className="pull-right"> Profile </h3>
        <h1 className ="navbar-left"> Regift3d</h1>
        </div>
      </nav>
      <Grid id="concViewGrid" className='full'>
      <Row className = 'full'>
        <Col xs={8} xsOffset={2} id="concoctionMakerCol"  >
          <div id="addConcBox">
           {// <div>
            //Description: <input id='desc' type='text'></input>
            //</div>
          }
            <Trigger state={props.appState} funcs={triggerFuncs} />

            <CancelNewConcoction changeViewTo={props.funcs.changeViewTo} />
                
            <SaveNewConcoction state={props.appState} saveConcoction={props.funcs.saveConcoction} />
          </div>
        </Col>
      </Row>
      </Grid>
      </div>
    )
  } else if (!props.appState.actions.reduce(function(prev, curr) {
      var complete = true;
      if (curr.action === '' || curr.actionOption === '' || curr.actionParams === '') {
        complete = false;
      };
      return prev && complete;
    }, true)) {
    return (
      <div className="full">
            <nav className="navbar navbar-default navbar-fixed-top"> 
              <div className="container-fluid Mod">
              <h3 className="pull-right"> My Apps </h3>
              <h3 className="pull-right"> Profile </h3>
              <h1 className ="navbar-left"> Regift3d</h1>
              </div>
            </nav>
            <Grid id="concViewGrid" className='full'>
            <Row className = 'full'>
              <Col xs={8} xsOffset={2} id="concoctionMakerCol"  >
                <div id="addConcBox">
        {
          // <div>
        // Description: <input id='desc' type='text'></input>
        // </div>
      }
        <Trigger state={props.appState} funcs={triggerFuncs} />

            <div>
            </div>

            {props.appState.actions.map(function(action, index) {
              return(
                <Action key={index} 
                        actionsIndex={index}
                        connectedServices={props.appState.connectedServices}
                        state={props.appState.actions[index]}
                        funcs={actionFuncs} />
              );
            })}

            <CancelNewConcoction changeViewTo={props.funcs.changeViewTo} />

            <SaveNewConcoction state={props.appState} saveConcoction={props.funcs.saveConcoction} />
          </div>
          </Col>
      </Row>
      </Grid>
      </div>
    ) 
  } else {
    return (
      <div className="full">
            <nav className="navbar navbar-default navbar-fixed-top"> 
              <div className="container-fluid Mod">
              <h3 className="pull-right"> My Apps </h3>
              <h3 className="pull-right"> Profile </h3>
              <h1 className ="navbar-left"> Regift3d</h1>
              </div>
            </nav>
            <Grid id="concViewGrid" className='full'>
            <Row className = 'full'>
              <Col xs={8} xsOffset={2} id="concoctionMakerCol"  >
                <div id="addConcBox">
        {//<div>
        //Description: <input id='desc' type='text'></input>
        //</div>
        }
        <Trigger state={props.appState} funcs={triggerFuncs} />
            
          {props.appState.actions.map(function(action, index) {
            return(
              <Action key={index} 
                      actionsIndex={index}
                      state={props.appState.actions[index]}
                      connectedServices={props.appState.connectedServices}
                      funcs={actionFuncs}
                      funcs={actionFuncs} />
            );
          })}

          <div onClick={ () => {props.addNewAction()}}>
          <h2>Add New Action</h2>
          </div>
          <CancelNewConcoction changeViewTo={props.funcs.changeViewTo} />

          <SaveNewConcoction state={props.appState} saveConcoction={props.funcs.saveConcoction} />
      </div>
      </Col>
      </Row>
      </Grid>
      </div>

    );
  }

};

export default AddConcoctionNav;