"use strict"
import React from 'react';
import { Col, Row, Grid, Table, Navigation, Nav, NavItem } from 'react-bootstrap';
import Instructions from './Instructions.jsx';
import Trigger from './Trigger.jsx';
import Action from './Action.jsx';
import SaveNewConcoction from './SaveNewConcoction.jsx';
import CancelNewConcoction from './CancelNewConcoction.jsx';

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

  if (props.appState.trigger === '' || props.appState.triggerOption === '' || props.appState.triggerParams === '') {
    return (
      <div className="full">
        <nav className="navbar navbar-default navbar-fixed-top"> 
          <div className="container-fluid Mod">
            <h3 className="pull-right"> My Concoctions </h3>
            <div onClick={() => { props.funcs.logout() }}>
              <h3 className="pull-right"> Logout </h3>
            </div>
            <h1 className ="navbar-left"> Regift3d</h1>
          </div>
        </nav>
        <Grid id="concViewGrid" className='full'>
          <Row>
            <Instructions text={props.appState.instructions} />
          </Row>
          <Row className='full'>
            <Col xs={8} xsOffset={2} id="concoctionMakerCol"  >
              <div id="addConcBox">
                <Trigger state={props.appState} funcs={triggerFuncs} />
                <CancelNewConcoction changeViewTo={props.funcs.changeViewTo} />
                <SaveNewConcoction state={props.appState} saveConcoction={props.funcs.saveConcoction} />
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    )
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
            <h3 className="pull-right"> My Concoctions </h3>
            <div onClick={() => { this.props.funcs.logout() }}>
              <h3 className="pull-right"> Logout </h3>
            </div>
            <h1 className ="navbar-left"> Regift3d</h1>
          </div>
        </nav>
        <Grid id="concViewGrid" className='full'>
          <Row>
            <Instructions text={props.appState.instructions} />
          </Row>
          <Row className = 'full'>
            <Col xs={8} xsOffset={2} id="concoctionMakerCol"  >
              <div id="addConcBox">
                <Trigger state={props.appState} funcs={triggerFuncs} />
                {props.appState.actions.map((action, index) => {
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
            <h3 className="pull-right"> My Concoctions </h3>
            <div onClick={() => { this.props.funcs.logout() }}>
              <h3 className="pull-right"> Logout </h3>
            </div>
            <h1 className ="navbar-left"> Regift3d</h1>
          </div>
        </nav>
        <Grid id="concViewGrid" className='full'>
          <Row>
            <Instructions text={props.appState.instructions} />
          </Row>
          <Row className = 'full'>
            <Col xs={8} xsOffset={2} id="concoctionMakerCol"  >
              <div id="addConcBox">
                <Trigger state={props.appState} funcs={triggerFuncs} />
                {props.appState.actions.map((action, index) => {
                  return(
                    <Action key={index} 
                            actionsIndex={index}
                            state={props.appState.actions[index]}
                            connectedServices={props.appState.connectedServices}
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
