"use strict"
const request = require('request');

module.exports = {
  trigger: (req, res) => {
    const webhooksHandler = require('./../main');
  },
  actions: {
    create_sheet: (paramObj) => {
      let numProperties = Object.keys(paramObj.data).length;
      let categories = [];
      let statistics = [];
      for (let i = 0; i < paramObj.data.length; i++) {
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
          statValObj[statType] = paramObj.data[i][prop];
          statistic.userEnteredValue = statValObj;
          console.log(category, statistic);

          if (typeof paramObj.data[i][prop] !== 'boolean') {
            categories.push(category);
            statistics.push(statistic);
          }
        };
      }

      let spreadsheet = {
        'properties': {
          'title': paramObj.actionParams.sheet_title,
        },
        'sheets': [
          {
            'properties': {
              'gridProperties': {
                'rowCount': numProperties,
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
