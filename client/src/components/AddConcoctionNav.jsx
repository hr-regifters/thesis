"use strict"
import React from 'react';
import { Col, Row, Grid, Table, Navigation, Nav, NavItem } from 'react-bootstrap';
import Instructions from './Instructions.jsx';
import Trigger from './Trigger.jsx';
import Action from './Action.jsx';
import SaveNewConcoction from './SaveNewConcoction.jsx';
import CancelNewConcoction from './CancelNewConcoction.jsx';
import Back from './Back.jsx';

const AddConcoctionNav = (props) => {
  const triggerFuncs = {
    modifyInstructions: props.funcs.modifyInstructions,
    modifyTrigger: props.funcs.modifyTrigger,
    modifyTriggerOption: props.funcs.modifyTriggerOption,
    modifyTriggerParams: props.funcs.modifyTriggerParams,
    modifyTriggerReveal: props.funcs.modifyTriggerReveal,
  };

  const actionFuncs = {
    modifyInstructions: props.funcs.modifyInstructions,
    modifyAction: props.funcs.modifyAction,
    modifyActionOption: props.funcs.modifyActionOption,
    modifyActionParams: props.funcs.modifyActionParams,
    modifyActionReveal: props.funcs.modifyActionReveal,
  };

  // if there are no trigger related options selected, only render the trigger component for the user to make selections
  if (props.appState.trigger === '' || props.appState.triggerOption === '' || props.appState.triggerParams === '') {
    return (
      <div className="full">
        <nav className="navbar navbar-default navbar-fixed-top"> 
          <div className="container-fluid Mod">
            <h3>Ripple</h3>
            <h3>-</h3>
            <h3 onClick={() => { props.changeViewTo('home') }}>Concoctions</h3>
            <h3 onClick={() => { props.funcs.logout() }}>Logout</h3>
          </div>
        </nav>
        <Instructions text={props.appState.instructions} />
        <Grid id="concViewGrid" className='full'>
          <Row id='center'>
            <Col xs={8} xsOffset={2} id="concoctionMakerCol" >
              <div id="addConcBox">
                <Trigger state={props.appState} funcs={triggerFuncs} />
                <Back undo={props.funcs.undoLast} />
                <CancelNewConcoction changeViewTo={props.funcs.changeViewTo} />
                <SaveNewConcoction state={props.appState} saveConcoction={props.funcs.saveConcoction} />
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    )
    // if there are any action specifications incomplete in the state, render the action component to allow the user to create an action
  } else if (!props.appState.actions.reduce((prev, curr) => {
    let complete = true;
    if (curr.action === '' || curr.actionOption === '' || curr.actionParams === '') {
      complete = false;
    };
    return prev && complete;
    }, true)) {
    return (
      <div className="full">
        <nav className="navbar navbar-default navbar-fixed-top"> 
          <div className="container-fluid Mod">
            <h3>Ripple</h3>
            <h3>-</h3>
            <h3 onClick={() => { props.changeViewTo('home') }}>Concoctions </h3>
            <h3 onClick={() => { props.funcs.logout() }}>Logout</h3>
          </div>
        </nav>
        <Grid id="concViewGrid" className='full'>
          <Row>
            <Instructions text={props.appState.instructions} />
          </Row>
          <Row id='center'>
            <Col xs={8} xsOffset={2} id="concoctionMakerCol"  >
              <div id="addConcBox">
                <Trigger state={props.appState} funcs={triggerFuncs} />
                {props.appState.actions.map((action, index) => {
                  return(
                    <Action key={index} 
                            actionsIndex={index}
                            connectedServices={props.appState.connectedServices}
                            state={props.appState.actions[index]}
                            trigger={props.appState.trigger}
                            funcs={actionFuncs} />
                  );
                })}
                <Back undo={props.funcs.undoLast} />
                <CancelNewConcoction changeViewTo={props.funcs.changeViewTo} />
                <SaveNewConcoction state={props.appState} saveConcoction={props.funcs.saveConcoction} />           
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    );
    // if there is nothing incomplete about the concoction in the app's state, render the options to submit the concoction to the server.
  } else {
    return (
      <div className="full">
        <nav className="navbar navbar-default navbar-fixed-top"> 
          <div className="container-fluid Mod">
            <h3>Ripple</h3>
            <h3>-</h3>
            <h3 onClick={() => { props.changeViewTo('home') }}>Concoctions </h3>
            <h3 onClick={() => { props.funcs.logout() }}>Logout</h3>
          </div>
        </nav>
        <Grid id="concViewGrid" className='full'>
          <Row>
            <Instructions text={props.appState.instructions} />
          </Row>
          <Row  id='center'>
            <Col xs={8} xsOffset={2} id="concoctionMakerCol"  >
              <div id="addConcBox">
                <Trigger state={props.appState} funcs={triggerFuncs} />
                {props.appState.actions.map((action, index) => {
                  return(
                    <Action key={index} 
                            actionsIndex={index}
                            state={props.appState.actions[index]}
                            trigger={props.appState.trigger}
                            connectedServices={props.appState.connectedServices}
                            funcs={actionFuncs} />
                  );
                })}
                <div onClick={ () => {props.funcs.addNewAction()}}>
                  <h1>Add New Action</h1>
                </div>
                <Back undo={props.funcs.undoLast} />
                <SaveNewConcoction state={props.appState} saveConcoction={props.funcs.saveConcoction} />
                <CancelNewConcoction changeViewTo={props.funcs.changeViewTo} />
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
};

export default AddConcoctionNav;
