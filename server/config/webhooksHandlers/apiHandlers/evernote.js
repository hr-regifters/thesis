"use strict"
const Evernote = require('evernote').Evernote;
const UserCtrl = require('../../../db/controllers/userController.js');
const async = require('async');

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
    create_note: (paramObj) => {
      const saveNote = (note, noteStore) => {
        noteStore.createNote(note, (err, note) => {
          if (err) {
            console.log('Note not saved', err);
          } else {
            console.log('Evernote Note posted');
          }
        });
      };

      let ourNote = new Evernote.Note;
      ourNote.title = paramObj.title;
      let noteContent = '<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE en-note SYSTEM "http://xml.evernote.com/pub/enml.dtd"><en-note>' + paramObj.body;
      paramObj.links.forEach((link) => {
        noteContent += '<br/><br/><a href="' + link + '">' + link + '</a>';
      });
      paramObj.images.forEach((image) => {
        noteContent += '<br/><img src="' + image + '"></img>';
      });
      noteContent += '</en-note>';
      ourNote.content = noteContent;
      ourNote.tagNames = paramObj.tagNames;
      let client = new Evernote.Client({sandbox: false, token: paramObj.actionToken}); //define client with the token from the DB
      let noteStore = client.getNoteStore();
      let parentNotebook = paramObj.actionParams.parentNotebook;
      noteStore.listNotebooks((err, notebooks) => {
        let notebook = notebooks.filter((notebook) => { return parentNotebook.toLowerCase() === notebook.name.toLowerCase()});
        if (notebook.length !== 0) {
          let guid = notebook[0].guid;
          ourNote.notebookGuid = guid;
          saveNote(ourNote, noteStore);
        } else {
          console.log('writing note to default notebook');
          saveNote(ourNote, noteStore);
        }
      });
    },
    delete: (paramObj) => {
      console.log('evernote delete function performed', params.actionParams);
    },
  },
};
