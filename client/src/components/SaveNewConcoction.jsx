import React from 'react';
import currUrl from './../../../currUrl';


<<<<<<< HEAD
const SaveNewConcoction = (props) => {
  if (!props.state.actions.reduce(function(prev, curr) {
      var complete = true;
      if (curr.action === '' || curr.actionOption === '' || curr.actionParams === '') {
        complete = false;
      };
      return prev && complete;
    }, true) || props.trigger === '' || props.triggerOption === '' || props.triggerParams === '') {
    return (
      <div className='saveDisabled'>
      Save New Concoction
      </div>
    );
  } else {
||||||| merged common ancestors
export default class SaveNewConcoction extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
=======
export default class SaveNewConcoction extends React.Component {
  constructor(props) {
    super(props);
  }

  saveConcoction() {
    let context = this;
    fetch(`${currUrl}/api/constructor/slack/add`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        trigger: 'dummy data',
        username: 'dummy data',
        actionApi: 'dummy data',
        actionFunction: 'dummy data',
        actionParams: '{"dummy": "data"}' // parent notebook, evernote token, 
      })
    })
    .then(function(res) {
      if (res.status === 201) {
        context.props.changeViewTo('home');
      }
    });
  }

  render() {
>>>>>>> 86085e43dc99c42e32cb718de662b88d60601790
    return (
<<<<<<< HEAD
      <div className='saveEnabled'>
      Save New Concoction
||||||| merged common ancestors
      <div>
     Save
=======
      <div>
        <button className="saveButton" onClick={this.saveConcoction.bind(this)} type="button">Save</button>
>>>>>>> 86085e43dc99c42e32cb718de662b88d60601790
      </div>
    );
  }
};

export default SaveNewConcoction;
