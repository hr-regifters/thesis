import React from 'react';


export default class SaveNewConcoction extends React.Component {
  constructor(props) {
    super(props);
  }

  saveConcoction() {
    let context = this;
    fetch('https://regifters48.herokuapp.com/api/constructor/slack/add', {
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
    return (
      <div>
        <button className="saveButton" onClick={this.saveConcoction.bind(this)} type="button">Save</button>
      </div>
    );
  }
}
