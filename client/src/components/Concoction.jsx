import React from 'react';
import { Col, Row, Grid, Table, Navigation, Nav, Button } from 'react-bootstrap';
import servicesDetail from '../servicesDetailJSON.js';
import currUrl from './../../../currUrl';

export default class Concoction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      enableClass: (this.props.concoctionInfo.enable || this.props.concoctionInfo.enable === undefined) ? 'enableBtn' : 'disabledBtn',
    };
    this.enable = this.props.concoctionInfo.enable;
    this.count = 2;
    this.id = (Math.random()*100000).toString();
  }

  transitionToEdit() {
    // css animations
    // change view on app state to concoctionEdit
    // also pass up the id of the concoction to edit
  }

  swapStyle() {
    if (this.count % 2 === 0) {
      this.setState({
        enableClass: this.enable ? 'disabledBtn' : 'enableBtn',
      });
      this.enable = !this.enable;
    }
    this.count++;
  }

  changeEnable() {
    const context = this;
    fetch(`${currUrl}/api/constructor/toggleEnable`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        concId: context.props.concoctionInfo.id,
      })
    })
    .then((res) => {
      if (res.status === 201) {
        console.log('succesful toggle');
        context.swapStyle();
      } else {
        console.log('unsuccesful toggle');
      }
    });
    
  }

  componentDidMount() {
    if (this.enable) {
      document.getElementById(this.id).checked = true;
    }
  }

  render() {
    return (
      <div className="concoction animated fadeIn">
        <div className={this.state.enableClass + ' mainBox'}>
         
          <img className='icon round' src={servicesDetail[this.props.concoctionInfo.triggerapi].icon}></img>
          
          <img className='icon round' src={servicesDetail[this.props.concoctionInfo.actionapi].icon}></img>
        
          <p>{this.props.concoctionInfo.description}</p>
        </div>
        <div className={this.state.enableClass + ' bottomBox'}>
          {
        // <a className={this.state.enableClass} onClick={this.changeEnable.bind(this)}>Enable</a>
          }
          <label onClick={() => this.changeEnable()} className="switch">
            <input id={this.id} type="checkbox" />
            <div className="slider round"></div>
          </label>
        </div>
      </div>
    );
  }
}
