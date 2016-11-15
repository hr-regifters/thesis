
var Evernote = require('evernote').Evernote;

var noteDetails = {
  title: 'Test Title',
  body: 'Test body',
  links: ['https://www.w3schools.com', 'https://www.google.com', 'https://www.amazom.com'],
  images: ['http://www.cats.org.uk/uploads/images/pages/photo_latest14.jpg', 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRbOnw4llUsZEWOjP9kx5lc_8bdmueQEgpp3FHx4g-7l3P6FfxcEg'],
  tagNames: ['cat', 'test'],
};


const createNote = function(oauthAccessToken, noteDetails, parentNotebook) {
// the noteDetails object needs four properties; title (string), body (string), links (array of strings), images (array of strings)

  var saveNote = function(note) {
    noteStore.createNote(note, function(err, note) {
      if (err) {
        console.log('this is wht we can\'t have nice things', err);
      } else {
        console.log('are you feeling it now, Mr.Krabs?')
      }
    });
  };

  var ourNote = new Evernote.Note;
  ourNote.title = noteDetails.title;
  var noteContent = '<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE en-note SYSTEM "http://xml.evernote.com/pub/enml.dtd"><en-note>' + noteDetails.body;
  noteDetails.links.forEach(function(link) {
    noteContent += '<br/><a href="' + link + '">' + link + '</a>';
  });
  noteDetails.images.forEach(function(image) {
    noteContent += '<br/><img src="' + image + '"></img>';
  });
  noteContent += '</en-note>';
  ourNote.content = noteContent;
  ourNote.tagNames = noteDetails.tagNames; // TODO: only add tag if the property is defined/ length > 0


  var client = new Evernote.Client({token: oauthAccessToken}); //define client with the token from the DB
  var noteStore = client.getNoteStore();
  //if parentNotebook is defined
  if (parentNotebook) {
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
};


var token = 'S=s1:U=93168:E=15fbcab8b67:C=15864fa5c18:P=1cd:A=en-devtoken:V=2:H=2a9679079d4ce49b9ccd5a9925706045';
createNote(token, noteDetails, 'Whateves');




///////////////////////////////////////////////
// var Evernote = require('evernote').Evernote;
// //include the Users schema

// var noteDetails = {
//   title: 'Test Title',
//   body: 'Test body',
//   links: ['https://www.w3schools.com', 'https://www.google.com', 'https://www.amazom.com'],
//   images: ['http://www.cats.org.uk/uploads/images/pages/photo_latest14.jpg', 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRbOnw4llUsZEWOjP9kx5lc_8bdmueQEgpp3FHx4g-7l3P6FfxcEg'],
//   tagNames: ['cat', 'test'],
//   };


// const createNote = function(userId, noteDetails, parentNotebook) {
// // the noteDetails object needs four properties; title (string), body (string), links (array of strings), images (array of strings)

//   var saveNote = function(note) {
//     noteStore.createNote(note, function(err, note) {
//       if (err) {
//         console.log('this is wht we can\'t have nice things', err);
//       } else {
//         console.log('are you feeling it now, Mr.Krabs?')
//       }
//     });
//   };

//   var ourNote = new Evernote.Note;
//   ourNote.title = noteDetails.title;
//   var noteContent = '<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE en-note SYSTEM "http://xml.evernote.com/pub/enml.dtd"><en-note>' + noteDetails.body;
//   noteDetails.links.forEach(function(link) {
//     noteContent += '<br/><a href="' + link + '">' + link + '</a>';
//   });
//   noteDetails.images.forEach(function(image) {
//     noteContent += '<br/><img src="' + image + '"></img>';
//   });
//   noteContent += '</en-note>';
//   ourNote.content = noteContent;
//   ourNote.tagNames = noteDetails.tagNames;


//   Users.findOne({_id: userId}, 'evernoteToken', function(err, user) { // lookup evernote token for the user stored in the database
//     var client = new Evernote.Client({token: oauthAccessToken}); //define client with the token from the DB
//     var noteStore = client.getNoteStore();
//     //if parentNotebook is defined
//     if (parentNotebook) {
//       noteStore.listNotebooks(function(err, notebooks) {
//         if (!err) {
//           // find the guid for the notebook with a name matching 'parentNotebook'
//           var guid = notebooks.filter(function(notebook){ return parentNotebook.toLowerCase() === notebook.name.toLowerCase()})[0].guid;
//           ourNote.notebookGuid = guid;
//           saveNote(ourNote);
//         } else {
//           console.log('no notebook with that name...');
//           console.log('writing note to default notebook');
//            saveNote(ourNote);
//         }
//       });
//     } else {
//       saveNote(ourNote);
//     }
//   });
// };

// createNote(1, noteDetails, 'Whateves');
