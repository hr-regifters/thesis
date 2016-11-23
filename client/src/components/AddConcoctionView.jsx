import React from 'react';
import currUrl from './../../../currUrl';
import { Col, Row, Grid, Table, Navigation, Nav, NavItem } from 'react-bootstrap';
import AddConcoctionNav from './AddConcoctionNav.jsx';

export default class AddConcoctionView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      
    };
  }

  componentDidMount() {
    //this.fetchConnectedServices();
  }

  fetchConnectedServices() {
    //fetch a users connected services and change the state
    let context = this;
    fetch('???', {
      method: 'GET',
      headers: {},
      body: JSON.stringify({
        username: context.props.appState.user,
        actionApi: actionApi,
        actionFunction: actionFunction,
        actionParams: context.state.actions[0].actionParams, // parent notebook, evernote token,
        description: `If a ${trigger.slice(0, trigger.indexOf('_'))} is ${trigger.slice(trigger.indexOf('_') + 1)} in ${context.state.trigger}, ${actionFunction.slice(0, actionFunction.indexOf('_'))} ${actionFunction.slice(actionFunction.indexOf('_') + 1)} to ${actionApi}`
      }),
    })
    .then(function(res) {
      if (res.status === 201) {
        context.setState({
          connectedServices: res.body.connectedServices,
        });
      }
    });
  }


  

  render() {
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
        <div id="concoctionMakerBox">
          <AddConcoctionNav  state={this.state} 
                             connectedServices={this.props.appState.connectedServices}  
                             modifyTrigger={this.modifyTrigger.bind(this)}
                             modifyTriggerOption={this.modifyTriggerOption.bind(this)}
                             modifyTriggerParams={this.modifyTriggerParams.bind(this)}
                             modifyTriggerReveal={this.modifyTriggerReveal.bind(this)}

                             servicesDetail={this.props.appState.servicesDetail}
                             modifyAction={this.modifyAction.bind(this)}
                             modifyActionOption={this.modifyActionOption.bind(this)}
                             modifyActionParams={this.modifyActionParams.bind(this)}
                             modifyActionReveal={this.modifyActionReveal.bind(this)} 
                             changeViewTo={this.props.changeViewTo} 
                             addNewAction={this.addNewAction.bind(this)}
                             fetchConnectedServices={this.fetchConnectedServices.bind(this)} />
        </div>
        </Col>
      </Row>
      </Grid>
      </div>
    );
  }

}
