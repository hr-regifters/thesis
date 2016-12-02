"use strict"
const request = require('request');

module.exports = {
  trigger: (req, res) => {
    const webhooksHandler = require('./../main');
  },
  actions: {
    create_sheet: (paramObj) => {
      let numProperties = paramObj.data[0].length;
      let categories = [];
      let statistics = [];

      // iterate through received data array
      for (let i = 0; i < paramObj.data.length; i++) {
        // iterate through each 'event' to be created into a spreadsheet
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

          // if dealing with time duration, convert from ms/sec to hh:mm:ss
          if (prop === 'duration' || prop === 'moving_time' || prop === 'elapsed_time') {
            if (prop === 'duration') {
              statValObj['stringValue'] = secondsToHMS(paramObj.data[i][prop] / 1000);
            } else {
              statValObj['stringValue'] = secondsToHMS(paramObj.data[i][prop]);
              statistic.userEnteredValue = statValObj;
            }
          } else {
            statValObj[statType] = paramObj.data[i][prop];
            statistic.userEnteredValue = statValObj;
          }

          // if dealing with booleans, don't include in spreadsheet
          if (typeof paramObj.data[i][prop] !== 'boolean') {
            categories.push(category);
            statistics.push(statistic);
          }
        }
      }

      // construct the spreadsheet object
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
      };

      let options = {
        uri: 'https://sheets.googleapis.com/v4/spreadsheets',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${paramObj.actionToken}`
        },
        json: spreadsheet
      };

      // create spreadsheet
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

const secondsToHMS = (seconds) => {
  // 1- Extract hours:
  let hours = parseInt( seconds / 3600 ); // 3,600 seconds in 1 hour
  seconds = seconds % 3600; // seconds remaining after extracting hours
  // 2- Extract minutes:
  let minutes = parseInt( seconds / 60 ); // 60 seconds in 1 minute
  // 3- Keep only seconds not extracted to minutes:
  seconds = seconds % 60;
  return `${hours}:${minutes}:${seconds}`;
};
