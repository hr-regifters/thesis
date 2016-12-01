"use strict"
const request = require('request');

module.exports = {
  trigger: (req, res) => {
    const webhooksHandler = require('./../main');
  },
  actions: {
    create_sheet: (paramObj) => {
      let numActivities = Object.keys(paramObj.data).length;
      let numProperties = paramObj.data[numActivities - 1].length;
      let categories = [];
      let statistics = [];
      let i = numActivities - 1;
      // for (let i = 0; i < paramObj.data.length; i++) {
        for (let prop in paramObj.data[i]) {
          let category = {
            'userEnteredValue': {}
          };

          let statistic = {
            'userEnteredValue': {}
          };

          let categoryValObj = {};
          categoryValObj['stringValue'] = prop;
          category.userEnteredValue = categoryValObj;

          let statType = typeof paramObj.data[i][prop] === 'number' ? 'numberValue' : 'stringValue';
          let statValObj = {};
          if (prop === 'duration') {
            statValObj['stringValue'] = msToHMS(paramObj.data[i][prop]);
            statistic.userEnteredValue = statValObj;
          } else {
            statValObj[statType] = paramObj.data[i][prop];
            statistic.userEnteredValue = statValObj;
          }

          if (typeof paramObj.data[i][prop] !== 'boolean') {
            categories.push(category);
            statistics.push(statistic);
          }
        }
      // }

      let spreadsheet = {
        'properties': {
          'title': paramObj.actionParams.sheet_title,
        },
        'sheets': [
          {
            'properties': {
              'gridProperties': {
                'rowCount': 2,
                'columnCount': numProperties,
              },
            },
            'data': [
              {
                'startRow': 0,
                'startColumn': 0,
                'rowData': {
                  'values': categories
                }
              },
              {
                'startRow': 1,
                'startColumn': 0,
                'rowData': {
                  'values': statistics
                }
              }
            ]
          }
        ],
      }
      let token = paramObj.actionToken;
      let options = {
        uri: 'https://sheets.googleapis.com/v4/spreadsheets',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        json: spreadsheet
      }
      console.log('categories', categories);
      console.log('statistics', statistics);
      request(options, (err, res, body) => {
        if (body.error) {
          console.log('error', body);
        } else {
          console.log('Successfully created spreadsheet');
        }
      });
    },
  },
};

function msToHMS(ms) {
  // 1- Convert to seconds:
  var seconds = ms / 1000;
  // 2- Extract hours:
  var hours = parseInt( seconds / 3600 ); // 3,600 seconds in 1 hour
  seconds = seconds % 3600; // seconds remaining after extracting hours
  // 3- Extract minutes:
  var minutes = parseInt( seconds / 60 ); // 60 seconds in 1 minute
  // 4- Keep only seconds not extracted to minutes:
  seconds = seconds % 60;
  return `${hours}:${minutes}:${seconds}`;
}
