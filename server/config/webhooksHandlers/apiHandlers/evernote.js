"use strict"
const Evernote = require('evernote').Evernote;

module.exports = {
  trigger: (req, res) => {
    const webhooksHandler = require('./../main');
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
      let noteContent = `<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE en-note SYSTEM "http://xml.evernote.com/pub/enml.dtd"><en-note>${paramObj.body}`;
      paramObj.links.forEach((link) => {
        noteContent += `<br/><br/><a href="${link}">${link}</a>`;
      });
      paramObj.images.forEach((image) => {
        noteContent += `<br/><br/><img src="${image}"></img>`;
      });
      noteContent += '</en-note>';
      ourNote.content = noteContent;
      ourNote.tagNames = paramObj.tagNames;
      let client = new Evernote.Client({sandbox: false, token: paramObj.actionToken});
      let noteStore = client.getNoteStore();
      let parentNotebook = paramObj.actionParams.parentNotebook;
      noteStore.listNotebooks((err, notebooks) => {
        let notebook = notebooks.filter((notebook) => parentNotebook.toLowerCase() === notebook.name.toLowerCase());
        if (notebook.length !== 0) {
          let guid = notebook[0].guid;
          ourNote.notebookGuid = guid;
          console.log('writing note to notebook:', notebook);
          saveNote(ourNote, noteStore);
        } else {
          console.log('writing note to default notebook');
          saveNote(ourNote, noteStore);
        }
      });
    }
  },
};
