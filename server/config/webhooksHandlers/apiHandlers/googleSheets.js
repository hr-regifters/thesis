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
      for (const prop in paramObj.data) {
        let category, statistic = {
          'values': [
            {
              'userEnteredValue': {},
            }
          ]
        };
        categories.values.userEnteredValue['stringValue'] = prop;
        categories.push(category);
        let statValue = typeof paramObj.data[prop] === 'number' ? 'numberValue' : 'stringValue';
        statistic.values.userEnteredValue.statValue = paramObj.data[prop];
        statistics.push(statistic);
      };
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
                'rowData': categories,
              },
              {
                'startRow': 0,
                'startColumn': 1,
                'rowData': statistics,
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
