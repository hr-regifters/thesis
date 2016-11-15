// var Evernote = require('evernote').Evernote;

// var oauthAccessToken = 'S=s1:U=93168:E=15fbcab8b67:C=15864fa5c18:P=1cd:A=en-devtoken:V=2:H=2a9679079d4ce49b9ccd5a9925706045';

// var client = new Evernote.Client({token: oauthAccessToken});

// var noteStore = client.getNoteStore();
// // noteStore.listNotebooks(function(err, notebooks) {
// //   // run this code
// //   console.log(notebooks);
// // });

// var ourNote = new Evernote.Note;
// ourNote.title = 'Grumpy cat';
// ourNote.content = '<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE en-note SYSTEM "http://xml.evernote.com/pub/enml.dtd"><en-note>will the image tag work?<br/><img src="https://files.slack.com/files-pri/T17PETGBH-F31N95SRX/slack_for_ios_upload._null_"></img></en-note>';
// ourNote.notebookGuid = '12c42fd3-9240-43a8-8aa4-95f112231414';

// noteStore.createNote(ourNote, function(err, note) {
//   if (err) {
//     // Something was wrong with the note data
//     // See EDAMErrorCode enumeration for error code explanation
//     // http://dev.evernote.com/documentation/reference/Errors.html#Enum_EDAMErrorCode
//     console.log('this is wht we can\'t have nice things', err);
//   } else {
//     // callback(note);
//     console.log('are you feeling it now, Mr.Krabs?');
//   }
// });

//////////////////////////////////////////////////////////////////

var Evernote = require('evernote').Evernote;

var noteDetails = {
  title: 'Test Title',
  body: 'Test body',
  links: ['https://www.w3schools.com', 'https://www.google.com', 'https://www.amazom.com'],
  images: ['http://www.cats.org.uk/uploads/images/pages/photo_latest14.jpg', 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRbOnw4llUsZEWOjP9kx5lc_8bdmueQEgpp3FHx4g-7l3P6FfxcEg'],
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


  var client = new Evernote.Client({token: oauthAccessToken}); //define client with the token from the DB
  var noteStore = client.getNoteStore();
  //if parentNotebook is defined
  if (parentNotebook) {
    noteStore.listNotebooks(function(err, notebooks) {
      // find the guid for the notebook with a name matching 'parentNotebook'
      var guid = notebooks.filter(function(notebook){ return parentNotebook.toLowerCase() === notebook.name.toLowerCase()})[0].guid;
      ourNote.notebookGuid = guid;
      saveNote(ourNote);
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
// };


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


//   Users.findOne({_id: userId}, 'evernoteToken', function(err, user) { // lookup evernote token for the user stored in the database
//     var client = new Evernote.Client({token: oauthAccessToken}); //define client with the token from the DB
//     var noteStore = client.getNoteStore();
//     //if parentNotebook is defined
//     if (parentNotebook) {
//       noteStore.listNotebooks(function(err, notebooks) {
//         // find the guid for the notebook with a name matching 'parentNotebook'
//         var guid = notebooks.filter(function(notebook){ return parentNotebook.toLowerCase() === notebook.name.toLowerCase()})[0].guid;
//         ourNote.notebookGuid = guid;
//         saveNote(ourNote);
//       });
//     } else {
//       saveNote(ourNote);
//     }
//   });
// };

// createNote(1, noteDetails, 'Whateves');
