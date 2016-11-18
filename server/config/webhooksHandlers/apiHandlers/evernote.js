const Evernote = require('evernote').Evernote;
const UserCtrl = require('../../../db/controllers/userController.js');
const async = require('async');
// const evernoteCollection = require('./../../../db/models/evernoteModel')

module.exports = {
  trigger: (req, res) => {
    const webhooksHandler = require('./../main');
    if (req.body.type === 'url_verification') {
      res.json({ challenge: req.body.challenge });
    } else {
      res.status(200).send('registered evernote event');
    }
    console.log('shoot actions after evernote trigger');
    // fetch db data for users to get actions
    // extract actions if trigger is right
    // use async.parallel webhooksHandler[api + Action][action](parameters) to shoot the actions
  },
  actions: {
    postNote: (paramObj) => {

      const saveNote = function(note) {
        noteStore.createNote(note, function(err, note) {
          if (err) {
            console.log('this is wht we can\'t have nice things', err);
          } else {
            console.log('are you feeling it now, Mr.Krabs?');
          }
        });
      };

      var ourNote = new Evernote.Note;
      ourNote.title = paramObj.title;
      var noteContent = '<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE en-note SYSTEM "http://xml.evernote.com/pub/enml.dtd"><en-note>' + paramObj.body;
      paramObj.links.forEach(function(link) {
        noteContent += '<br/><a href="' + link + '">' + link + '</a>';
      });
      paramObj.images.forEach(function(image) {
        noteContent += '<br/><img src="' + image + '"></img>';
      });
      noteContent += '</en-note>';
      ourNote.content = noteContent;
      ourNote.tagNames = paramObj.tagNames;

      var evernoteToken = UserCtrl.getUserData('slackId', paramObj.slackUserId).evernoteToken;
     
      var client = new Evernote.Client({token: evernoteToken}); //define client with the token from the DB
      var noteStore = client.getNoteStore();
      //if parentNotebook is defined
      if (paramObj.actionParams.parentNotebook) {
        noteStore.listNotebooks(function(err, notebooks) {
          if (!err) {
            // find the guid for the notebook with a name matching 'parentNotebook'
            var guid = notebooks.filter(function(notebook){ return parentNotebook.toLowerCase() === notebook.name.toLowerCase()})[0].guid;
            ourNote.notebookGuid = guid;
            saveNote(ourNote);
          } else {
            console.log('no notebook with that name...');
            console.log('writing note to default notebook');
            saveNote(ourNote);
          }
        });
      } else {
        saveNote(ourNote);
      }      
    },
    delete: (paramObj) => {
      console.log('evernote delete function performed', params.actionParams);
    },
  },
};
// createNote(1, noteDetails, 'Whateves');
