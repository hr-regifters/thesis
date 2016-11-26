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
    post_note: (paramObj) => {
      
      const saveNote = function(note, noteStore) {
        noteStore.createNote(note, function(err, note) {
          if (err) {
            console.log('Note not saved', err);
          } else {
            console.log('Evernote Note posted');
          }
        });
      };

      var ourNote = new Evernote.Note;
      ourNote.title = paramObj.title;
      var noteContent = '<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE en-note SYSTEM "http://xml.evernote.com/pub/enml.dtd"><en-note>' + paramObj.body;
      paramObj.links.forEach(function(link) {
        noteContent += '<br/><br/><a href="' + link + '">' + link + '</a>';
      });
      paramObj.images.forEach(function(image) {
        noteContent += '<br/><img src="' + image + '"></img>';
      });
      noteContent += '</en-note>';
      ourNote.content = noteContent;
      ourNote.tagNames = paramObj.tagNames;
      var client = new Evernote.Client({sandbox: false, token: paramObj.actionParams.evernote}); //define client with the token from the DB
      console.log('line 45');
      client.getNoteStore()
      .then((noteStore) => {
        var parentNotebook = paramObj.actionParams.parentNotebook;
        console.log(parentNotebook);
        if (parentNotebook) {
          noteStore.listNotebooks(function(err, notebooks) {
            // find the guid for the notebook with a name matching 'parentNotebook'
            var notebook = notebooks.filter(function(notebook){ console.log(notebook, typeof notebook, notebook.name, typeof notebook.name); return parentNotebook.toLowerCase() === notebook.name.toLowerCase()});
            if (notebook.length !== 0) {
              var guid = notebook[0].guid;
              ourNote.notebookGuid = guid;
              console.log('writing note to specified notebook');
              saveNote(ourNote, noteStore);
            } else {
              console.log('writing note to default notebook');
              saveNote(ourNote, noteStore);
            }
          });
        } else {
          saveNote(ourNote, noteStore);
        }
      })
      .catch((err) => { console.log(err, 'Error when saving note to evernote') });
    },
    delete: (paramObj) => {
      console.log('evernote delete function performed', params.actionParams);
    },
  },
};
