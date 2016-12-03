"use strict"
const express = require('express');
const userController = require('./userController');
const Promise = require('bluebird');
const pool = (require('../config.js').pool);
const request = require('request');
const async = require('async');
const STRAVA_ID = process.env.STRAVA_ID;
const STRAVA_SECRET = process.env.STRAVA_SECRET;

exports.createConcoction = (req, res) => {
  async.each(req.body, (concoction, callback) => {
    const username = concoction.username;
    let concObj = {
      userid: '',
      triggerapi: concoction.triggerApi,
      triggerevent: concoction.triggerEvent,
      triggerparams: concoction.triggerParams || {},
      triggeruserid: '',
      triggertoken: '',
      actionapi: concoction.actionApi,
      actionevent: concoction.actionEvent,
      actionuserid: '',
      actiontoken: '',
      actionparams: concoction.actionParams || {},
      enable: concoction.enable || true,
      description: concoction.description
    };
    getActionIdandToken(concObj, username, res)
    .then((concObj) => { console.log('got action token', concObj); return getTriggerIdandToken(concObj, username, res);})
    .then((updatedConc) => { console.log('about to write concoction', updatedConc); writeConcoction(updatedConc, res); })
    .catch((error) => { console.log(error); });
  }, (error) => { error ? console.log(error) : console.log('Concoction list saved successfully'); });
}

const getActionIdandToken = (concObj, username, res) => {
  if (concObj['actionapi'] === 'slack') {
    return userController.getUserData('username', username).then((user) => {
      if (user.slackid && user.slacktoken) {
        concObj['userid'] = user.id;
        concObj['actionuserid'] = user.slackid;
        concObj['actiontoken'] = user.slacktoken;
        return concObj;
      } else {
        console.log('cant find user');
      }
    });
  } else if (concObj['actionapi'] === 'evernote') {
    return userController.getUserData('username', username).then((user) => {
      if (user.evernotetoken) {
        concObj['userid'] = user.id;
        concObj['actiontoken'] = user.evernotetoken;
        return concObj;
      } else {
        console.log('cant find user');
      }
    });
  } else if (concObj['actionapi'] === 'twilio') {
    return userController.getUserData('username', username).then((user) => {
      if (user) {
        concObj['userid'] = user.id;
        return concObj;
      } else {
        console.log('cant find user');
      }
    });
  } else if (concObj['actionapi'] === 'googleMail') {
    return userController.getUserData('username', username).then((user) => {
      if (user) {
        concObj['userid'] = user.id;
        concObj['actiontoken'] = user.googletoken;
        return concObj;
      } else {
        console.log('cant find user');
      }
    });
  } else if (concObj['actionapi'] === 'googleSheets') {
    return userController.getUserData('username', username).then((user) => {
      if (user) {
        concObj['userid'] = user.id;
        concObj['actiontoken'] = user.googletoken;
        return concObj;
      } else {
        console.log('cant find user');
      }
    });
  } else {
    console.log('cant find user');
  }
}

const getTriggerIdandToken = (concObj, username, res) => {
  if (concObj['triggerapi'] === 'slack') {
    return userController.getUserData('username', username).then((user) => {
      if (user.slackid) {
        concObj['triggeruserid'] = user.slackid;
        return concObj;
      } else {
        console.log('cant find user');
      }
    });
  } else if (concObj['triggerapi'] === 'fitbit') {
    return userController.getUserData('username', username).then((user) => {
      if (user.fitbitid) {
        concObj['triggeruserid'] = user.fitbitid;
        concObj['triggertoken'] = user.fitbittoken;
        return concObj;
      }
    });
  } else if (concObj['triggerapi'] === 'instagram') {
    console.log('inside getting IG trigger')
    return userController.getUserData('username', username).then((user) => {
      if (user.instagramid) {
        concObj['triggeruserid'] = user.instagramid;
        concObj['triggertoken'] = user.instagramtoken;
        return concObj;
      }
    });
  } else if (concObj['triggerapi'] === 'strava') {
    return userController.getUserData('username', username).then((user) => {
      if (user.stravaid) {
        concObj['triggeruserid'] = user.stravaid;
        concObj['triggertoken'] = user.stravatoken;
        return concObj;
      }
    });
  } 
  else {
    return concObj;
  }
}

const writeConcoction = (concObj, res) => {
  pool.query({
    text: 'INSERT INTO concoctions(userid, triggerapi, triggerevent, triggerparams, triggeruserid, triggertoken, actionapi, actionevent,\
    actionuserid, actiontoken, actionparams, enable, description) \
      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)',
    values: [
      concObj['userid'],concObj['triggerapi'],concObj['triggerevent'],concObj['triggerparams'],concObj['triggeruserid'], concObj['triggertoken'],
      concObj['actionapi'],concObj['actionevent'],concObj['actionuserid'],concObj['actiontoken'],
      concObj['actionparams'],concObj['enable'], concObj['description']
    ]
  }, (err, rows) => {
    if (err) {
      console.log('error when writing concoction', err);
    } else {
      subscribeUser(concObj);
      res.status(201).send();
    }
  });
}

const subscribeUser = (concObj) => {
  if (concObj['triggerapi'] === 'fitbit') {
    let options = {
      uri: 'https://api.fitbit.com/1/user/-/activities/apiSubscriptions/1.json',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${concObj['triggertoken']}`
      }
    }
    request(options, (err, response, body) => {
      console.log(response, 'response');
    });
  } else if (concObj['triggerapi'] === 'strava') {
    let options = {
      client_id: STRAVA_ID,
      client_secret: STRAVA_SECRET,
      object_type: 'activity',
      aspect_type: 'create',
      callback_url: 'https://regifters48.herokuapp.com/api/webhooks/strava',
      verify_token: concObj['triggertoken'],
    }
    request.post({url:'https://api.strava.com/api/v3/push_subscriptions', form: options}, 
      (err, response, body) => {
        console.log(err, 'err');
        console.log(response, 'response');
      }
    );
  } else {
    return;
  }
}

exports.getConcoctions = (api, event, triggeruserid) => {
  if (triggeruserid) {
    return pool.query({
      text: 'SELECT * FROM concoctions WHERE triggerapi= \'' + api + '\' AND \
      triggerevent= \'' + event + '\' AND triggeruserid= \'' + triggeruserid + '\';'
    }, (err,rows) => {
      return err ? err : rows.rows; 
    });
  }
  return pool.query({
    text: 'SELECT * FROM concoctions WHERE triggerapi= \'' + api + '\' AND triggerevent= \'' + event + '\' ;'
  }, (err,rows) => {
    return err ? err : rows.rows; 
  });
}

exports.toggleConcoction = (req, res) => {
  const concId = req.body.concId;
  return pool.query({
    text: 'SELECT enable FROM concoctions WHERE id = \'' + concId + '\';'
  }, (err, rows) => {
    if (err) {
      return err;
    } else {
      const toggle = !rows.rows[0].enable;
      pool.query({
        text: 'UPDATE concoctions \
        SET enable = ' + toggle + ' WHERE id = \'' + concId + '\';' 
      }, (err, rows) => {
        res.status(201).send('concoction successfully toggled');
      });
    }
  });
}

exports.updateConcoctionsToken = (username, api, newToken) => {
  userController.getUserData('username', username).then((user) => {
    pool.query({
      text: 'UPDATE concoctions \
      SET actiontoken = \'' + newToken + '\' WHERE userid = \'' + user.id +'\' AND actionapi = \'' + api + '\';' 
    }, (err, rows) => {
      if (err) {
        return err;
      } else {
        console.log('action token updated', rows);
      }
    });
    pool.query({
      text: 'UPDATE concoctions \
      SET triggertoken = \'' + newToken + '\' WHERE userid = \'' + user.id +'\' AND triggerapi = \'' + api + '\';' 
    }, (err, rows) => {
      if (err) {
        return err;
      } else {
        console.log('trigger token updated', rows);
      }
    });
  }).catch((err) => { console.log(err); });
}

// for testing purposes
exports.queryConcoctions = (req, res) => {
  pool.query({
    text: 'SELECT * FROM concoctions;'
  }, (err, rows) => {
    console.log(err, rows.rows)
    res.status(201).send(rows.rows);
  }); 
}
